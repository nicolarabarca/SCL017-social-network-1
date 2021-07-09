import { firebaseConfig } from './lib/firebConfig.js';
import { signUpFunction } from './lib/signUp.js';
import { signInFunction } from './lib/signIn.js';

firebase.initializeApp(firebaseConfig);
signUpFunction();
signInFunction();
