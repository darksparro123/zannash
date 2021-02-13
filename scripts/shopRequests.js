const requestShopsDivId = document.querySelector("#shops-list");
const divShopDetails = document.querySelector("#shop-details");
const divOwnerDetails = document.querySelector("#owner-details");
const divBankDetails = document.querySelector("#bank-details");

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

const customerDetailsList = document.querySelector("#customer-details-list");

// data storing variables
db.collection("shops")
    .where("admin permission", "==", false)
    .get()
    .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            console.log(doc.data());
            getShopDetails(doc.id);
            getShopOwnersDetails(doc.id);
            getShopBankDetails(doc.id);
        });
    });

function getShopDetails(shopId) {
    db.collection("shops")
        .doc(shopId)
        .collection("Shop Details")
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                renderShopDetails(doc);
            });
        });
}

// get shop owner details
function getShopOwnersDetails(shopId) {
    db.collection("shops")
        .doc(shopId)
        .collection("Owner Details")
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                renderShopOwnerDetails(doc);
            });
        });
}

function getShopBankDetails(shopId) {
    db.collection("shops")
        .doc(shopId)
        .collection("Bank Details")
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                renderBankDetails(doc);
            });
        });
}

// render shop details
function renderShopDetails(doc) {
    let li = document.createElement("div");
    let shopName = document.createElement("span");
    let shopAddress = document.createElement("span");
    let email = document.createElement("span");
    let registerNumber = document.createElement("span");
    let registrationCertificate = document.createElement("img");
    let updateButton = document.createElement("button");

    updateButton.setAttribute("id", "update-button");
    shopName.textContent = doc.data()["Shop Name"];
    shopAddress.textContent = doc.data()["Address"];
    email.textContent = doc.data()["Email"];
    registerNumber.textContent = doc.data()["Shop Register Number"];

    registrationCertificate.setAttribute(
        "src",
        doc.data()["Shop Registration Certificate"]
    );
    updateButton.textContent = "Give Permission";

    li.appendChild(shopName);
    li.appendChild(shopAddress);
    li.appendChild(email);
    li.appendChild(registerNumber);
    li.appendChild(registrationCertificate);
    li.appendChild(updateButton);
    divShopDetails.appendChild(li);
    document.getElementById("update-button").onclick = function() {
        givePermissionsForShops(doc.data()["Email"]);
    };
}

function renderShopOwnerDetails(doc) {
    console.log("called");
    let li = document.createElement("div");
    let ownerName = document.createElement("span");
    let ownerAddress = document.createElement("span");
    let email = document.createElement("span");
    let nicNumber = document.createElement("span");
    let mobileNumber = document.createElement("span");
    let homeMobileNumber = document.createElement("span");
    let nicImage1 = document.createElement("img");
    let nicImage2 = document.createElement("img");

    ownerName.textContent = doc.data()["Owner Name"];
    ownerAddress.textContent = doc.data()["Owners Address"];
    email.textContent = doc.data()["Owners Email"];
    nicNumber.textContent = doc.data()["Owners Nic Number"];
    mobileNumber.textContent = doc.data()["Owners Mobile"];
    homeMobileNumber.textContent = doc.data()["Owners Mobile Home"];

    nicImage1.setAttribute("src", doc.data()["Owners Nic Image 1 url"]);
    nicImage2.setAttribute("src", doc.data()["Owners Nic Image 2 url"]);

    li.appendChild(ownerName);
    li.appendChild(ownerAddress);
    li.appendChild(nicNumber);
    li.appendChild(mobileNumber);
    li.appendChild(homeMobileNumber);
    li.appendChild(nicImage1);
    li.appendChild(nicImage2);

    divOwnerDetails.appendChild(li);
}

function renderBankDetails(doc) {
    let li = document.createElement("div");
    let bankName = document.createElement("span");
    let bankBranch = document.createElement("span");
    let bankAccountName = document.createElement("span");
    let bankAccountNumber = document.createElement("span");
    let bankBranchCode = document.createElement("span");

    bankName.textContent = doc.data()["Bank Name"];
    bankBranch.textContent = doc.data()["Bank Branch"];
    bankAccountName.textContent = doc.data()["Bank Account Name"];
    bankAccountNumber.textContent = doc.data()["Bank Account  Number"];
    bankBranchCode.textContent = doc.data()["Bank Branch Code"];

    li.appendChild(bankAccountName);
    li.appendChild(bankAccountNumber);
    li.appendChild(bankName);
    li.appendChild(bankBranch);
    li.appendChild(bankBranchCode);

    divBankDetails.appendChild(li);
}

// give permition

function givePermissionsForShops(shopId) {
    console.log(shopId);
    db.collection("shops")
        .doc(shopId)
        .update({
            "admin permission": true,
        })
        .then(function(doc) {
            console.log("update succussfully");
            location.reload();
        })
        .catch(function(error) {
            console.log("failed" + error);
        });
}