// src/utils/firebaseUtils.js
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

// Firebase configuration (use your own Firebase credentials)
const firebaseConfig = {
  apiKey: "AIzaSyATOoA7YoC4pCqwz6rEd0bKJ5JN3-3ww0o",
  authDomain: "disaster-portal-31224.firebaseapp.com",
  projectId: "disaster-portal-31224",
  storageBucket: "disaster-portal-31224.firebasestorage.app",
  messagingSenderId: "39945263868",
  appId: "1:39945263868:web:42415b4c9dcf230ffb5579"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Function to handle image upload to Firebase Storage
export const uploadImageToFirebase = async (file) => {
  try {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (error) => {
          reject(error);
        },
        () => {
          // Get the download URL after successful upload
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL); // Return the download URL
            })
            .catch((error) => reject(error));
        }
      );
    });
  } catch (error) {
    console.error("Error uploading image to Firebase: ", error);
    throw error;
  }
};
