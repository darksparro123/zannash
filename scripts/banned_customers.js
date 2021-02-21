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
const functions = firebase.functions();
const table = document.querySelector("#banned-customers-table");
db.collection("banned_users")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            renderBannedUsers(doc);
        });
    })
    .catch(function(error) {});

function renderBannedUsers(doc) {
    let tr = document.createElement("tr");
    let customerId = document.createElement("td");
    let enableButton = document.createElement("button");

    customerId.textContent = doc.data()["customer_id"];
    enableButton.textContent = "Enable User";
    enableButton.setAttribute("class", "btn indigo");

    tr.setAttribute("id", doc.id);

    enableButton.onclick = function() {
        const enableUser = firebase.functions().httpsCallable("enableUser");
        enableUser(doc.data()["customer_id"]).then(() => {
            db.collection("banned_users")
                .doc(doc.data()["customer_id"])
                .delete()
                .then(() => {
                    location.reload();
                });
        });
    };

    tr.appendChild(customerId);
    tr.appendChild(enableButton);
    table.appendChild(tr);
}