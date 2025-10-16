import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { doc, setDoc, getDoc, increment, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

// Storage keys
const STORAGE_KEYS = {
  VISITOR_ID: 'conversy_visitor_id',
  FIRST_VISIT: 'conversy_first_visit',
  LAST_VISIT: 'conversy_last_visit',
  VISIT_COUNT: 'conversy_visit_count',
};

/**
 * Get or generate unique visitor ID using browser fingerprinting
 */
export const getVisitorId = async () => {
  try {
    // Check if we already have a visitor ID in localStorage
    let visitorId = localStorage.getItem(STORAGE_KEYS.VISITOR_ID);

    if (!visitorId) {
      // Generate fingerprint for unique identification
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      visitorId = result.visitorId;

      // Store in localStorage for faster future access
      localStorage.setItem(STORAGE_KEYS.VISITOR_ID, visitorId);
    }

    return visitorId;
  } catch (error) {
    console.error('Error getting visitor ID:', error);
    // Fallback to random ID if fingerprinting fails
    const fallbackId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(STORAGE_KEYS.VISITOR_ID, fallbackId);
    return fallbackId;
  }
};

/**
 * Check if this is the user's first visit
 */
export const isFirstVisit = () => {
  return !localStorage.getItem(STORAGE_KEYS.FIRST_VISIT);
};

/**
 * Check if this is a new session (hasn't visited in last 30 minutes)
 */
export const isNewSession = () => {
  const lastVisit = localStorage.getItem(STORAGE_KEYS.LAST_VISIT);
  if (!lastVisit) return true;

  const lastVisitTime = parseInt(lastVisit, 10);
  const now = Date.now();
  const thirtyMinutes = 30 * 60 * 1000;

  return (now - lastVisitTime) > thirtyMinutes;
};

/**
 * Track unique visitor and page view
 */
export const trackVisitor = async () => {
  try {
    const visitorId = await getVisitorId();
    const now = Date.now();
    const isFirst = isFirstVisit();
    const isNewSess = isNewSession();

    // Update local storage
    if (isFirst) {
      localStorage.setItem(STORAGE_KEYS.FIRST_VISIT, now.toString());
    }
    localStorage.setItem(STORAGE_KEYS.LAST_VISIT, now.toString());

    const visitCount = parseInt(localStorage.getItem(STORAGE_KEYS.VISIT_COUNT) || '0', 10) + 1;
    localStorage.setItem(STORAGE_KEYS.VISIT_COUNT, visitCount.toString());

    // Update Firebase stats
    const statsRef = doc(db, 'stats', 'main');
    const statsDoc = await getDoc(statsRef);

    if (statsDoc.exists()) {
      const updates = {
        totalPageViews: increment(1),
        lastUpdated: serverTimestamp(),
      };

      // Only increment unique visitors on first visit
      if (isFirst) {
        updates.uniqueVisitors = increment(1);
      }

      await setDoc(statsRef, updates, { merge: true });
    } else {
      // Create initial stats document
      await setDoc(statsRef, {
        uniqueVisitors: 1,
        totalPageViews: 1,
        linkedinFollowers: 0,
        waitlistCount: 0,
        lastUpdated: serverTimestamp(),
      });
    }

    // Track individual visitor data (optional, for detailed analytics)
    if (isFirst || isNewSess) {
      const visitorRef = doc(db, 'visitors', visitorId);
      const visitorDoc = await getDoc(visitorRef);

      if (visitorDoc.exists()) {
        // Update existing visitor
        await setDoc(visitorRef, {
          lastVisit: serverTimestamp(),
          visitCount: increment(1),
          sessions: increment(isNewSess ? 1 : 0),
        }, { merge: true });
      } else {
        // New visitor
        await setDoc(visitorRef, {
          firstVisit: serverTimestamp(),
          lastVisit: serverTimestamp(),
          visitCount: 1,
          sessions: 1,
          visitorId: visitorId,
          userAgent: navigator.userAgent,
          language: navigator.language,
          platform: navigator.platform,
          screenResolution: `${window.screen.width}x${window.screen.height}`,
        });
      }
    }

    return {
      visitorId,
      isFirstVisit: isFirst,
      isNewSession: isNewSess,
      visitCount,
    };
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return null;
  }
};

/**
 * Get visitor stats from localStorage (for display)
 */
export const getLocalVisitorStats = () => {
  return {
    visitorId: localStorage.getItem(STORAGE_KEYS.VISITOR_ID),
    firstVisit: localStorage.getItem(STORAGE_KEYS.FIRST_VISIT),
    lastVisit: localStorage.getItem(STORAGE_KEYS.LAST_VISIT),
    visitCount: parseInt(localStorage.getItem(STORAGE_KEYS.VISIT_COUNT) || '0', 10),
    isReturningVisitor: !isFirstVisit(),
  };
};

/**
 * Clear visitor data (for testing purposes)
 */
export const clearVisitorData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
  console.log('Visitor data cleared');
};
