const table = document.querySelector("#earnings-table");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
window.onload = function() {
    var url = document.location.href,
        params = url.split("?")[1].split("&");
    //console.log(params);
    var shopId =
        params[0].split("=")[1].split("%")[0] +
        "@" +
        params[0].split("=")[1].split("%")[1].substr(2);
    renderEarnngs1(shopId);
};

function renderEarnngs1(shopId) {
    console.log(shopId);
    db.collection("order_status")
        .where("shop_id", "==", shopId)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if (doc.data()["recieved_order"] == true) {
                    renderEarnngs(doc, shopId);
                }
            });
        })
        .catch(function(error) {
            console.log("get shop earnings failed " + error);
        });
}

function renderEarnngs(doc, shopId) {
    //console.log(shopId);
    let tr = document.createElement("tr");
    tr.setAttribute("id", doc.id);
    //console.log(doc.data());
    let orderId = document.createElement("td");
    let listedPrice = document.createElement("td");
    let realPrice = document.createElement("td");
    let proffit = document.createElement("td");

    console.log(doc.data()["order_id"]);
    orderId.textContent = doc.data()["order_id"];

    db.collection("shops")
        .doc(shopId)
        .collection("Listed Items")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(snap) {
                if (snap.id == doc.data()["item_id"]) {
                    console.log(snap.data());
                    realPrice.textContent = snap.data()["realPrice"];
                    listedPrice.textContent = snap.data()["itemPrice"];
                    proffit.textContent =
                        parseFloat(snap.data()["realPrice"]) -
                        parseFloat(snap.data()["itemPrice"]).toString();
                    tr.appendChild(orderId);
                    tr.appendChild(listedPrice);
                    tr.appendChild(realPrice);
                    table.appendChild(tr);
                    tr.appendChild(proffit);
                }
            });
        })
        .catch(function(error) {
            console.log(error);
        });
}