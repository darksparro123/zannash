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

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
       location.replace("/public/pages/home.html");
    } else {
        // User is signed out.
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form["email"].value;
    const password = form["password"].value;

    if (email != "" && password != "") {
        loadspinner();
        db.collection("admins")
            .get()
            .then(function(querySnapshot) {
                querySnapshot.docs.forEach(function(doc) {
                    if (doc.data()["admin_name"] == email) {
                        auth
                            .signInWithEmailAndPassword(email, password)
                            .then((e) => {
                                console.log("sign in succusfully" + e);
                                stopspinner();
                                location.replace("/public/pages/home.html");
                            })
                            .catch((e) => {
                                console.log(e["code"]);
                                if (e["code"] == "auth/user-not-found") {
                                    firebase
                                        .auth()
                                        .createUserWithEmailAndPassword(email, password)
                                        .then(function(response) {
                                            console.log("sign up succussfully " + response);
                                            stopspinner();
                                            location.replace("/public/pages/home.html");
                                        })
                                        .catch(function(error) {
                                            console.log("sign up faled " + error);

                                            alert("Authentication failed.Are you really an admin ?");
                                        });
                                } else {
                                    stopspinner();
                                    alert("Authentication failed.Are you really an admin ?");
                                }
                            });
                    } else {
                        console.log("not admin");
                    }
                });
            })
            .catch(function(error) {
                console.log("get admin data failed " + error);
            });
    }else{
        alert("Please Fill All Feilds");
    }
});