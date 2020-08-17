import firebase from "firebase";

let app = undefined;
if (!firebase.apps.length) {
  app = firebase.initializeApp(require("../firebase.json"));
} else {
  app = firebase.app();
}

export default firebase;
