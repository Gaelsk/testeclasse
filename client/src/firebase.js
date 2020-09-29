import * as firebase from "firebase"
import firebaseConfig from "./config/firebase"

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage();
export default storage;