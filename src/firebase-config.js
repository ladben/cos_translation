import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

import dotenv from './dotenv.js';

const firebaseConfig = {
  ...dotenv
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);