import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  doc, 
  setDoc, 
  getDoc, 
  deleteDoc, 
  updateDoc, 
  serverTimestamp,
  increment 
} from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvuQ65lS-2nm_VtKBHGDU-KpaqKlgW7vg",
  authDomain: "conversy-static-page.firebaseapp.com",
  projectId: "conversy-static-page",
  storageBucket: "conversy-static-page.firebasestorage.app",
  messagingSenderId: "947213411833",
  appId: "1:947213411833:web:b607569d2b3afec4014928",
  measurementId: "G-8W57VX25HH"
};

// Initialize Firebase
let app, db, auth, analytics;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
} catch (error) {
  console.log('Firebase initialization failed:', error.message);
}

// Collections
export const COLLECTIONS = {
  WAITLIST: 'waitlist',
  INTERVIEWS: 'interviews',
  STATS: 'stats',
  VISITORS: 'visitors'
};

// ===== Waitlist Functions =====

export const addToWaitlist = async (email, name) => {
  try {
    if (!db) throw new Error('Firebase not initialized');
    
    const docRef = await addDoc(collection(db, COLLECTIONS.WAITLIST), {
      email,
      name,
      timestamp: serverTimestamp(),
      status: 'pending'
    });
    
    // Update waitlist count
    const statsRef = doc(db, COLLECTIONS.STATS, 'main');
    await setDoc(statsRef, {
      waitlistCount: increment(1),
      lastUpdated: serverTimestamp()
    }, { merge: true });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.log('Error adding to waitlist:', error.message);
    return { success: false, error: error.message };
  }
};

export const getAllWaitlist = async () => {
  try {
    if (!db) throw new Error('Firebase not initialized');
    
    const q = query(
      collection(db, COLLECTIONS.WAITLIST), 
      orderBy('timestamp', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const waitlist = [];
    
    querySnapshot.forEach((doc) => {
      waitlist.push({ id: doc.id, ...doc.data() });
    });
    
    return waitlist;
  } catch (error) {
    console.log('Error getting waitlist:', error.message);
    return [];
  }
};

// ===== Testimonials/Interviews Functions =====

export const getInterviews = async (limitCount = 10) => {
  try {
    if (!db) throw new Error('Firebase not initialized');
    
    const q = query(
      collection(db, COLLECTIONS.INTERVIEWS),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    const interviews = [];
    
    querySnapshot.forEach((doc) => {
      interviews.push({ id: doc.id, ...doc.data() });
    });
    
    return interviews;
  } catch (error) {
    console.log('Error getting interviews:', error.message);
    return [];
  }
};

export const addInterview = async (interview) => {
  try {
    if (!db) throw new Error('Firebase not initialized');
    
    const docRef = await addDoc(collection(db, COLLECTIONS.INTERVIEWS), {
      ...interview,
      createdAt: serverTimestamp()
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.log('Error adding interview:', error.message);
    return { success: false, error: error.message };
  }
};

export const updateInterview = async (id, interview) => {
  try {
    if (!db) throw new Error('Firebase not initialized');
    
    const interviewRef = doc(db, COLLECTIONS.INTERVIEWS, id);
    await updateDoc(interviewRef, {
      ...interview,
      updatedAt: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.log('Error updating interview:', error.message);
    return { success: false, error: error.message };
  }
};

export const deleteInterview = async (id) => {
  try {
    if (!db) throw new Error('Firebase not initialized');
    
    await deleteDoc(doc(db, COLLECTIONS.INTERVIEWS, id));
    return { success: true };
  } catch (error) {
    console.log('Error deleting interview:', error.message);
    return { success: false, error: error.message };
  }
};

// ===== Stats Functions =====

export const getStats = async () => {
  try {
    if (!db) throw new Error('Firebase not initialized');
    
    const statsDoc = await getDoc(doc(db, COLLECTIONS.STATS, 'main'));
    
    if (statsDoc.exists()) {
      return statsDoc.data();
    }
    
    // Return default values if document doesn't exist
    return {
      linkedinFollowers: 1250,
      uniqueVisitors: 0,
      totalPageViews: 0,
      waitlistCount: 387
    };
  } catch (error) {
    console.log('Error getting stats:', error.message);
    // Return default values on error
    return {
      linkedinFollowers: 1250,
      uniqueVisitors: 0,
      totalPageViews: 0,
      waitlistCount: 387
    };
  }
};

export const updateStats = async (stats) => {
  try {
    if (!db) throw new Error('Firebase not initialized');
    
    const statsRef = doc(db, COLLECTIONS.STATS, 'main');
    await setDoc(statsRef, {
      ...stats,
      lastUpdated: serverTimestamp()
    }, { merge: true });
    
    return { success: true };
  } catch (error) {
    console.log('Error updating stats:', error.message);
    return { success: false, error: error.message };
  }
};

// ===== Visitor Tracking Functions =====

export const trackPageVisit = async (visitorId, isFirstVisit, isNewSession) => {
  try {
    if (!db) throw new Error('Firebase not initialized');
    
    // Update main stats
    const statsRef = doc(db, COLLECTIONS.STATS, 'main');
    const statsDoc = await getDoc(statsRef);

    if (statsDoc.exists()) {
      const updates = {
        totalPageViews: increment(1),
        lastUpdated: serverTimestamp(),
      };

      // Only increment unique visitors on first visit
      if (isFirstVisit) {
        updates.uniqueVisitors = increment(1);
      }

      await setDoc(statsRef, updates, { merge: true });
    } else {
      // Create initial stats document
      await setDoc(statsRef, {
        uniqueVisitors: 1,
        totalPageViews: 1,
        linkedinFollowers: 1250,
        waitlistCount: 387,
        lastUpdated: serverTimestamp(),
      });
    }

    // Track individual visitor (optional)
    if (isFirstVisit || isNewSession) {
      const visitorRef = doc(db, COLLECTIONS.VISITORS, visitorId);
      const visitorDoc = await getDoc(visitorRef);

      if (visitorDoc.exists()) {
        await setDoc(visitorRef, {
          lastVisit: serverTimestamp(),
          visitCount: increment(1),
          sessions: increment(isNewSession ? 1 : 0),
        }, { merge: true });
      } else {
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

    return { success: true };
  } catch (error) {
    console.log('Error tracking page visit:', error.message);
    return { success: false, error: error.message };
  }
};

// ===== Authentication Functions =====

export const loginAdmin = async (email, password) => {
  try {
    if (!auth) throw new Error('Firebase Auth not initialized');
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.log('Error logging in:', error.message);
    return { success: false, error: error.message };
  }
};

export const logoutAdmin = async () => {
  try {
    if (!auth) throw new Error('Firebase Auth not initialized');
    
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.log('Error logging out:', error.message);
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = () => {
  return auth ? auth.currentUser : null;
};

export const onAuthChange = (callback) => {
  if (!auth) {
    console.log('Firebase Auth not initialized');
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};

// Export Firebase instances
export { db, auth, analytics };
