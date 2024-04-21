import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpKr_kqzRgWElwSUGsntkjWOIf3bx48e8",
  authDomain: "trello-teste.firebaseapp.com",
  projectId: "trello-teste",
  storageBucket: "trello-teste.appspot.com",
  messagingSenderId: "831475253236",
  appId: "1:831475253236:web:f1b769b693e5b1588c03a1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken; 
    const user = result.user; 

  
    localStorage.setItem('userToken', token);

    
    localStorage.setItem('userName', user.displayName);
    localStorage.setItem('userEmail', user.email);

  
    console.log(`Usuário logado: ${user.displayName}`);

 
    window.location.href = '/dashboard';

  } catch (error) {
    console.error(error);
  }
};


export { signInWithGoogle };
