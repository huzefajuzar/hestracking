
import "firebase/auth"
import {getAuth} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import {getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyDAMAkMVOAQ88osgXFBOBqndYXBEiSHwBY",
  authDomain: "hes-ticketing.firebaseapp.com",
  projectId: "hes-ticketing",
  storageBucket: "hes-ticketing.appspot.com",
  messagingSenderId: "827101244898",
  appId: "1:827101244898:web:f8afe84d9b1fa89b965dbb"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export default getFirestore()
