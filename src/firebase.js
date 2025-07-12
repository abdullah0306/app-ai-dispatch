// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVVX-qsJh2o6p7SUvZEgPIS_qgf0QHyEc",
  authDomain: "service-pro-61cgte.firebaseapp.com",
  projectId: "service-pro-61cgte",
  storageBucket: "service-pro-61cgte.firebasestorage.app",
  messagingSenderId: "425093344032",
  appId: "1:425093344032:web:2c2d261ba54e8e4bca4545"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// User schema function
export const createUserRecordData = ({
  email = '',
  display_name = '',
  photo_url = '',
  uid = '',
  created_time = null,
  phone_number = '',
  address = '',
  strip_payment_id = '',
  subscriptionExpireDate = null,
  assistants = [],
  role = '',
  status = '',
  permission = [],
  company = null, // Firestore document reference
  subscribed = false,
  stripe_subscription_status = '',
  stripe_subscription_id = '',
  profile_completed = false,
  credits = 0.0,
}) => ({
  email,
  display_name,
  photo_url,
  uid,
  created_time,
  phone_number,
  address,
  strip_payment_id,
  subscriptionExpireDate,
  assistants,
  role,
  status,
  permission,
  company,
  subscribed,
  stripe_subscription_status,
  stripe_subscription_id,
  profile_completed,
  credits,
});

// Company schema function
export const createCompanyRecordData = ({
  name = '',
  industry = '',
  companyLink = '',
  schedule = [],
  timeZone = '',
  service = [],
  promptType = '',
  aiHandleInbound = false,
  emailOutbound = false,
  smsNotification = false,
  outboundCallHandling = false,
  offerFreeEstimation = false,
  fallBackNumber = '',
  leaveMessagePermission = false,
  createJobPermission = false,
  reshedulePermission = false,
  cancelPermission = false,
  addNotePermission = false,
  priceRestriction = false,
  legalRestriction = false,
  MedicalRestriction = false,
  personalQuestion = false,
  additionalRestrictionTopics = '',
  assistantname = '',
  userId = null, // Firestore document reference
  companyPhoneNumbers = [],
  smtp = {},
  phoneNumberMap = [],
  credits = 0.0,
  minutes = 0.0,
  companyMinutesRate = 0.0,
  serviceAreas = [],
  isTwentyFourBySeven = false,
  additionalInsturctions = '',
}) => ({
  name,
  industry,
  companyLink,
  schedule,
  timeZone,
  service,
  promptType,
  aiHandleInbound,
  emailOutbound,
  smsNotification,
  outboundCallHandling,
  offerFreeEstimation,
  fallBackNumber,
  leaveMessagePermission,
  createJobPermission,
  reshedulePermission,
  cancelPermission,
  addNotePermission,
  priceRestriction,
  legalRestriction,
  MedicalRestriction,
  personalQuestion,
  additionalRestrictionTopics,
  assistantname,
  userId,
  companyPhoneNumbers,
  smtp,
  phoneNumberMap,
  credits,
  minutes,
  companyMinutesRate,
  serviceAreas,
  isTwentyFourBySeven,
  additionalInsturctions,
});

// Update addUserToFirestore to use the schema
export const addUserToFirestore = async (user) => {
  if (!user) return;
  const userData = createUserRecordData({
    email: user.email || '',
    display_name: user.displayName || '',
    photo_url: user.photoURL || '',
    uid: user.uid || '',
    created_time: new Date(),
    // Add other fields as needed, empty for now
  });
  console.log('Adding user to Firestore:', userData);
  await setDoc(doc(db, 'user', user.uid || ''), userData, { merge: true });
};

// Update addCompanyToFirestore to use the schema
export const addCompanyToFirestore = async (companyId, companyData) => {
  if (!companyId || !companyData) return;
  const companyRecord = createCompanyRecordData({
    ...companyData
    // Fill in all fields, empty if not present
  });
  await setDoc(doc(db, 'Company', companyId), companyRecord, { merge: true });
};

// Authentication functions
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await addUserToFirestore(user);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await addUserToFirestore(user);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// User data functions
export const saveUserData = async (userId, userData) => {
  try {
    await setDoc(doc(db, 'users', userId), userData);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getUserData = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() };
    } else {
      return { success: false, error: 'User data not found' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Auth state listener
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export default app; 