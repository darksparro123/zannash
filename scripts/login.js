var firebaseConfig = {
    apiKey: "AIzaSyCypuPyiyWM3q2SXBuZnA0UixRkxz54z-Q",
    authDomain: "delivoblackgenpvtltd.firebaseapp.com",
    databaseURL: "https://delivoblackgenpvtltd-default-rtdb.firebaseio.com",
    projectId: "delivoblackgenpvtltd",
    storageBucket: "delivoblackgenpvtltd.appspot.com",
    messagingSenderId: "776352742517",
    appId: "1:776352742517:web:d089b32ad13f6e6ad18c3c",
    measurementId: "G-QER3M9EHP7",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();
const db = firebase.firestore();

const form = document.querySelector("#sign-up-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form["email"].value;
    const password = form["password"].value;

    console.log(email + " " + password);
    // console.log(email + password);
    if (email != "" && password != "") {
        //loadspinner();
        auth
            .signInWithEmailAndPassword(email, password)
            .then((e) => {
                console.log(e);
                // stopspinner();
                //location.replace("adminaprove.html");
            })
            .catch((e) => {
                console.log(e);
            });
    }
});