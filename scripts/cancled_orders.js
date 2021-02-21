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

const table = document.querySelector("#cancled-orders-table");

db.collection("cancled_orders")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            renderCancledOrders(doc);
        });
    })
    .catch(function(error) {
        console.log(error);
    });

function renderCancledOrders(doc) {
    let tr = document.createElement("tr");
    let customerId = document.createElement("td");
    let shopId = document.createElement("td");
    let orderId = document.createElement("td");
    let bannedButton = document.createElement("button");

    tr.setAttribute("id", doc.id);
    bannedButton.textContent = "Suspend User";

    bannedButton.onclick = function() {
        console.log(doc.data()["customer_id"]);

        const bannedUser = firebase.functions().httpsCallable("disableUser");
        bannedUser(doc.data()["customer_id"]).then((response) => {
            db.collection("banned_users")
                .doc(doc.data()["customer_id"])
                .set({ customer_id: doc.data()["customer_id"] });
            db.collection("cancled_orders")
                .where("customer_id", "==", doc.data()["customer_id"])
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        db.collection("cancled_orders").doc(doc.id).delete();
                        location.reload();
                    });
                })
                .catch(function(error) {});
        });
    };

    bannedButton.setAttribute("class", "btn indigo");
    customerId.textContent = doc.data()["customer_id"];
    shopId.textContent = doc.data()["shop_id"];
    orderId.textContent = doc.data()["order_id"];

    tr.appendChild(orderId);
    tr.appendChild(customerId);
    tr.appendChild(shopId);
    tr.appendChild(bannedButton);
    table.appendChild(tr);
}