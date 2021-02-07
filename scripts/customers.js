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
db.settings({
    timestampsInSnapshots: true,
});
const customerDetailsList = document.querySelector("#customer-details-list");

db.collection("Customer")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            getCustomerCollection(doc.id);
        });
    })
    .catch(function(error) {});

// get customer details collection
function getCustomerCollection(docId) {
    console.log("called");
    db.collection("Customer")
        .doc(docId)
        .collection("Customer's Details")
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                console.log(doc.data()["Custumer's Name"]);
                console.log(doc.data()["Custumer's Address"]);
                console.log(doc.data()["Custumer's Mobile Number"]);
                console.log(doc.id);
                renderItems(doc);
            });
        });
}

function renderItems(doc) {
    let tableRow = document.createElement("tr");
    let cName = document.createElement("td");
    let cAddress = document.createElement("td");
    let cMobile = document.createElement("td");
    let cEmail = document.createElement("td");
    let ordersButton = document.createElement("button");

    ordersButton.textContent = "orders";
    cName.textContent = doc.data()["Custumer's Name"];
    cAddress.textContent = doc.data()["Custumer's Address"];
    cMobile.textContent = doc.data()["Custumer's Mobile Number"];
    cEmail.textContent = doc.data()["Custumer's Email"];

    tableRow.setAttribute("doc-id", doc.id);

    tableRow.appendChild(cName);
    tableRow.appendChild(cAddress);
    tableRow.appendChild(cMobile);
    tableRow.appendChild(cEmail);
    tableRow.appendChild(ordersButton);

    ordersButton.setAttribute("id", "orders");

    customerDetailsList.appendChild(tableRow);
    document.getElementById("orders").onclick = function() {
        getCustomersOrders();
    };
}

function getCustomersOrders() {
    db.collection("orders")
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                db.collection("order_status")
                    .get()
                    .then((snap) => {
                        snap.docs.forEach((document) => {
                            console.log("docs id is " + document.id);
                            var n = document.id.localeCompare(doc.data()["order_status_id"]);
                            if (n == 0) {
                                console.log(doc.data());
                            }
                        });
                    });
            });
        });
}

function renderOrders(orderStatusId) {}