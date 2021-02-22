const table = document.querySelector("#shop-data");

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

function getShopsFromFirestore() {
    // data storing variables
    db.collection("shops")
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                //sconsole.log(doc.data());
                getShopDetails(doc.id);
                //getShopOwnersDetails(doc.id);
                // getShopBankDetails(doc.id);
            });
        });
}
getShopsFromFirestore();

function getShopDetails(shopId) {
    db.collection("shops")
        .doc(shopId)
        .collection("Shop Details")
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                renderShops(doc);
            });
        });
}

function renderShops(doc) {
    let tr = document.createElement("tr");
    let shopName = document.createElement("td");
    let shopAddress = document.createElement("td");
    let catogary = document.createElement("td");
    let buttontd=document.createElement("td");
    let btn = document.createElement("button");

    shopName.textContent = doc.data()["Shop Name"];
    shopAddress.textContent = doc.data()["Address"];
    catogary.textContent = doc.data()["Shop Catogary"];
    btn.textContent = "View Earnings";

    btn.setAttribute("class", "btn");
    btn.onclick = function() {
        url = "shopEarnings.html?name=" + encodeURIComponent(doc.data()["Email"]);
        document.location.href = url;
    };
    tr.setAttribute("id", doc.id);
    buttontd.appendChild(btn);
    tr.append(shopName);
    tr.append(shopAddress);
    tr.append(catogary);
    tr.appendChild(buttontd);
    tr.className = "txt";
    table.appendChild(tr);
}
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}