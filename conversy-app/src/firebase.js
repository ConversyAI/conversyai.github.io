import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, increment, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// TODO: Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Collections
export const COLLECTIONS = {
  WAITLIST: 'waitlist',
  INTERVIEWS: 'interviews',
  STATS: 'stats',
  VISITORS: 'visitors'
};

// Add to waitlist
export const addToWaitlist = async (email, name) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.WAITLIST), {
      email,
      name,
      timestamp: new Date(),
      status: 'pending'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return { success: false, error: error.message };
  }
};

// Get user interviews
export const getInterviews = async (limitCount = 10) => {
  try {
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
    console.error('Error getting interviews:', error);
    return [];
  }
};

// Get stats (LinkedIn followers, page views, waitlist count)
export const getStats = async () => {
  try {
    const statsDoc = await getDoc(doc(db, COLLECTIONS.STATS, 'main'));
    if (statsDoc.exists()) {
      return statsDoc.data();
    }
    return {
      linkedinFollowers: 0,
      pageViews: 0,
      waitlistCount: 0
    };
  } catch (error) {
    console.error('Error getting stats:', error);
    return {
      linkedinFollowers: 0,
      pageViews: 0,
      waitlistCount: 0
    };
  }
};

// Track page visit
export const trackPageVisit = async () => {
  try {
    const statsRef = doc(db, COLLECTIONS.STATS, 'main');
    const statsDoc = await getDoc(statsRef);

    if (statsDoc.exists()) {
      await setDoc(statsRef, {
        ...statsDoc.data(),
        pageViews: increment(1),
        lastVisit: new Date()
      }, { merge: true });
    } else {
      await setDoc(statsRef, {
        pageViews: 1,
        linkedinFollowers: 0,
        waitlistCount: 0,
        lastVisit: new Date()
      });
    }
  } catch (error) {
    console.error('Error tracking visit:', error);
  }
};

// Update LinkedIn followers count (admin function)
export const updateLinkedInCount = async (count) => {
  try {
    const statsRef = doc(db, COLLECTIONS.STATS, 'main');
    await setDoc(statsRef, {
      linkedinFollowers: count,
      lastUpdated: new Date()
    }, { merge: true });
    return { success: true };
  } catch (error) {
    console.error('Error updating LinkedIn count:', error);
    return { success: false, error: error.message };
  }
};

export { db, analytics };
