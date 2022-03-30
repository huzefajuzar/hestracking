import React, {useContext, useState, useEffect} from "react"
import { auth} from '../firebase'
import db from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut,sendPasswordResetEmail,updateEmail, updatePassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"; 


const AuthContext=React.createContext()
export function useAuth() {
    return useContext(AuthContext)
  }

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    function signup(email, password, name,office) {
        createUserWithEmailAndPassword(auth,email, password)
        .then(cred=>{
          setDoc(doc(db,"users",cred.user.uid),({name: name, office:office, id: cred.user.uid,email:email}))
        })
        
      }
      
      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setLoading(false)
            console.log(user.uid)
          setCurrentUser(user)
          
        })
    
        return unsubscribe
      }, [])
      
    function userid(){
      return currentUser.uid
    }
      
    function login(email, password) {
        return signInWithEmailAndPassword(auth,email, password)
      }
      function resetPassword(email) {
        return sendPasswordResetEmail(auth,email)
      }
    function userdata(){

    }
      function logout() {
        return signOut(auth)
      }
      function updateuserEmail(email) {
        return updateEmail(currentUser,email)
      }
    
      function updateuserPassword(password) {
        return updatePassword(currentUser,password)
      }
    const value={currentUser,signup, login,logout, resetPassword,updateuserEmail,updateuserPassword,userdata,userid}
    
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
