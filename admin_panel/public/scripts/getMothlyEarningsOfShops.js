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
const table = document.querySelector("#data-table");

db.collection("shop_earnings")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(snap) {
            console.log(snap.data());

            db.collection("shops")
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        if (doc.id == snap.data()["shop_id"]) {
                            renderEarnings(snap, doc);
                        }
                    });
                })
                .catch(function(error) {
                    console.log(error);
                });
        });
    })
    .catch(function(error) {
        console.log(error);
    });

function renderEarnings(snap, doc) {
    let tr = document.createElement("tr");
    let shopName = document.createElement("td");
    let month = document.createElement("td");
    let proffit = document.createElement("td");
    shopName.textContent = doc.data()["Shop Name"];
    month.textContent = snap.id;
    proffit.textContent = snap.data()["monthly_proffit"];
    tr.setAttribute("id", snap.id + "-" + snap.data()["shop_id"]);
    tr.appendChild(shopName);
    tr.appendChild(month);
    tr.appendChild(proffit);
    table.appendChild(tr);
}