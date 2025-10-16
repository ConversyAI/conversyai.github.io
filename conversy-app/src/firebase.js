import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, increment, doc, setDoc, getDoc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

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
const auth = getAuth(app);
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

// Get stats (LinkedIn followers, unique visitors, page views, waitlist count)
export const getStats = async () => {
  try {
    const statsDoc = await getDoc(doc(db, COLLECTIONS.STATS, 'main'));
    if (statsDoc.exists()) {
      return statsDoc.data();
    }
    return {
      linkedinFollowers: 0,
      uniqueVisitors: 0,
      totalPageViews: 0,
      waitlistCount: 0
    };
  } catch (error) {
    console.error('Error getting stats:', error);
    return {
      linkedinFollowers: 0,
      uniqueVisitors: 0,
      totalPageViews: 0,
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

// ==================== ADMIN FUNCTIONS ====================

// Authentication
export const loginAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, error: error.message };
  }
};

export const logoutAdmin = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Error logging out:', error);
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Update all stats
export const updateStats = async (stats) => {
  try {
    const statsRef = doc(db, COLLECTIONS.STATS, 'main');
    await setDoc(statsRef, {
      ...stats,
      lastUpdated: serverTimestamp()
    }, { merge: true });
    return { success: true };
  } catch (error) {
    console.error('Error updating stats:', error);
    return { success: false, error: error.message };
  }
};

// Get all waitlist entries
export const getAllWaitlist = async () => {
  try {
    const q = query(collection(db, COLLECTIONS.WAITLIST), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const waitlist = [];
    querySnapshot.forEach((doc) => {
      waitlist.push({ id: doc.id, ...doc.data() });
    });
    return waitlist;
  } catch (error) {
    console.error('Error getting waitlist:', error);
    return [];
  }
};

// Add testimonial/interview
export const addInterview = async (interview) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.INTERVIEWS), {
      ...interview,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding interview:', error);
    return { success: false, error: error.message };
  }
};

// Update testimonial/interview
export const updateInterview = async (id, interview) => {
  try {
    const interviewRef = doc(db, COLLECTIONS.INTERVIEWS, id);
    await updateDoc(interviewRef, {
      ...interview,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating interview:', error);
    return { success: false, error: error.message };
  }
};

// Delete testimonial/interview
export const deleteInterview = async (id) => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.INTERVIEWS, id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting interview:', error);
    return { success: false, error: error.message };
  }
};

export { db, auth, analytics };
