var firebaseConfig = {
    apiKey: "AIzaSyCypuPyiyWM3q2SXBuZnA0UixRkxz54z-Q",
    authDomain: "delivoblackgenpvtltd.firebaseapp.com",
    databaseURL: "https://delivoblackgenpvtltd-default-rtdb.firebaseio.com",
    projectId: "delivoblackgenpvtltd",
    storageBucket: "delivoblackgenpvtltd.appspot.com",
    messagingSenderId: "776352742517",
    appId: "1:776352742517:web:d089b32ad13f6e6ad18c3c",
    measurementId: "G-QER3M9EHP7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();
const db = firebase.firestore();


function getRiderData() {
    db
        .collection("Riders").where("admin permission", "==", false)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.docs.forEach(function(doc) {
                console.log(doc.id);
                getRiderdetails(doc.id)
            });
        })
        .catch(function(error) {
            console.log("get data failed" + error);
        })
}

getRiderData();

function giveRiderPermission(riderId) {
    db.collection("Riders").doc(riderId)

    .update({
            "admin permission": true
        })
        .then(function(doc) {
            console.log("update succussfully");
        })
        .catch(function(error) {
            console.log("update failed" + error);
        })
}

function getRiderdetails(docId) {
    console.log("called");
    db
        .collection("Riders").doc(docId).collection("Riders's Details")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.data())
            });
        })
        .catch(function(error) {

        })
}