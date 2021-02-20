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
    .catch(function(error) {});

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
        var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
        var authData = ref.getAuth();

        if (authData) {
            console.log("Authenticated user with uid:", authData.uid);
        }
        const bannedUser = firebase.functions().httpsCallable("disableUser");
        bannedUser("hello world").then((response) => {
            console.log(response);
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