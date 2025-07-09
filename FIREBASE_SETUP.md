# Firebase Setup Guide for AIDispatch

## 🔥 Firebase Configuration Required

To use this application with Firebase authentication and database, you need to configure your Firebase project settings.

### Step 1: Get Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your existing Firebase project
3. Click the gear icon ⚙️ → **Project Settings**
4. Scroll down to **"Your apps"** section
5. Click **"Add app"** → **Web app** (</>)
6. Register your app with a nickname (e.g., "AIDispatch Web")
7. Copy the configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### Step 2: Update Firebase Configuration

1. Open `src/firebase.js`
2. Replace the placeholder values with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_ACTUAL_AUTH_DOMAIN",
  projectId: "YOUR_ACTUAL_PROJECT_ID",
  storageBucket: "YOUR_ACTUAL_STORAGE_BUCKET",
  messagingSenderId: "YOUR_ACTUAL_MESSAGING_SENDER_ID",
  appId: "YOUR_ACTUAL_APP_ID"
};
```

### Step 3: Enable Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** authentication
3. Optionally enable other providers (Google, Facebook, etc.)

### Step 4: Set Up Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select a location for your database
5. Create the following security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Step 5: Install Dependencies

Run the following command to install Firebase:

```bash
npm install
```

### Step 6: Test the Application

1. Start the development server:
```bash
npm run dev
```

2. Navigate to `http://localhost:5173`
3. You should be redirected to the login page
4. Create a new account or sign in with existing credentials

## 🔐 Authentication Features

- **User Registration**: Email/password signup
- **User Login**: Email/password authentication
- **Protected Routes**: All pages require authentication
- **User Data Storage**: User profiles stored in Firestore
- **Session Management**: Automatic login state persistence
- **Logout Functionality**: Secure sign-out with redirect

## 📊 Database Structure

The application uses Firestore with the following structure:

```
users/
  {userId}/
    firstName: string
    lastName: string
    email: string
    createdAt: timestamp
    setupCompleted: boolean
```

## 🚀 Available Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔧 Environment Variables (Optional)

For production, you can use environment variables. Create a `.env` file:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Then update `src/firebase.js` to use environment variables:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## 🛡️ Security Notes

- Firebase handles authentication securely
- User data is protected by Firestore security rules
- Passwords are hashed and managed by Firebase Auth
- Session tokens are automatically managed

## 🐛 Troubleshooting

1. **"Firebase not initialized"**: Check your configuration values
2. **"Permission denied"**: Verify Firestore security rules
3. **"User not found"**: Ensure authentication is enabled in Firebase Console
4. **"Network error"**: Check your internet connection and Firebase project status

## 📱 Features Added

✅ **Complete Firebase Integration**
✅ **User Authentication (Login/Signup)**
✅ **Protected Routes**
✅ **User Dashboard**
✅ **Session Management**
✅ **Logout Functionality**
✅ **Responsive Design**
✅ **Error Handling**
✅ **Loading States**
✅ **User Data Storage**

Your AIDispatch application is now fully integrated with Firebase! 🎉 