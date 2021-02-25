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
window.onload = function () {
    var url = document.location.href,
        params = url.split("?")[1].split("&");
    //console.log(params);
    var shopId =
        params[0].split("=")[1].split("%")[0] +
        "@" +
        params[0].split("=")[1].split("%")[1].substr(2);
    console.log(shopId);
    db.collection("shops")
        .doc(shopId)
        .get()
        .then((snapshot) => {
            console.log(snapshot.data());
            getShopDetails(snapshot.id);
            getShopOwnersDetails(snapshot.id);
            getShopBankDetails(snapshot.id);

        });
};

const customerDetailsList = document.querySelector("#customer-details-list");
const requestShopsDivId = document.querySelector("#shops-list");
const divShopDetails = document.querySelector("#shop-details");
const divOwnerDetails = document.querySelector("#owner-details");
const divBankDetails = document.querySelector("#bank-details");



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
                console.log(doc.data());
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
                console.log(doc.data());
                renderBankDetails(doc,shopId);
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
   
    shopName.textContent = "Shop Name:  "+doc.data()["Shop Name"];
    shopAddress.textContent = "Shop Adress:  "+doc.data()["Address"];
    email.textContent = "Shop Email:  "+doc.data()["Email"];
    registerNumber.textContent = "Shop Registration Number:  "+doc.data()["Shop Register Number"];

    registrationCertificate.setAttribute(
        "src",
        doc.data()["Shop Registration Certificate"]
    );
    
    li.classList.add("details");
    li.appendChild(shopName);
    li.appendChild(shopAddress);
    li.appendChild(email);
    li.appendChild(registerNumber);
    li.appendChild(registrationCertificate);
    
    divShopDetails.appendChild(li);
    
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

    ownerName.textContent = "Owners Name:  "+doc.data()["Owner Name"];
    ownerAddress.textContent = "Owners Adress:  "+doc.data()["Owners Address"];
    email.textContent = "Owners Email:  "+doc.data()["Owners Email"];
    nicNumber.textContent = "Owners NIC Number:  "+doc.data()["Owners Nic Number"];
    mobileNumber.textContent = "Owners Mobile Number:  "+doc.data()["Owners Mobile"];
    homeMobileNumber.textContent = "Owners Home Number:  "+doc.data()["Owners Mobile Home"];

    nicImage1.setAttribute("src", doc.data()["Owners Nic Image 1 url"]);
    nicImage2.setAttribute("src", doc.data()["Owners Nic Image 2 url"]);
    li.classList.add("details");
    li.appendChild(ownerName);
    li.appendChild(ownerAddress);
    li.appendChild(nicNumber);
    li.appendChild(mobileNumber);
    li.appendChild(homeMobileNumber);
    li.appendChild(nicImage1);
    li.appendChild(nicImage2);

    divOwnerDetails.appendChild(li);
}

function renderBankDetails(doc,email) {
    let li = document.createElement("div");
    let bankName = document.createElement("span");
    let bankBranch = document.createElement("span");
    let bankAccountName = document.createElement("span");
    let bankAccountNumber = document.createElement("span");
    let bankBranchCode = document.createElement("span");
    let updateButton = document.createElement("button");
    let dicline=document.createElement('button');

    updateButton.textContent = "Give Permission";
    dicline.textContent = "Dicline";
    bankName.textContent = "Bank Name:  "+doc.data()["Bank Name"];
    bankBranch.textContent = "Bank Branch Name:  "+doc.data()["Bank Branch"];
    bankAccountName.textContent = "Bank Account Name:  "+doc.data()["Bank Account Name"];
    bankAccountNumber.textContent = "Bank Account Number:  "+doc.data()["Bank Account  Number"];
    bankBranchCode.textContent = "Bank Branch Code:  "+doc.data()["Bank Branch Code"];

    

    updateButton.setAttribute("id", "update-button");
    dicline.setAttribute("id", "dicline-button");
    li.classList.add("details");
    li.appendChild(bankAccountName);
    li.appendChild(bankAccountNumber);
    li.appendChild(bankName);
    li.appendChild(bankBranch);
    li.appendChild(bankBranchCode);
    
    li.appendChild(updateButton);
    li.appendChild(dicline);
    divBankDetails.appendChild(li);
    document.getElementById("update-button").onclick = function () {
        givePermissionsForShops(email);
    };

    document.getElementById("dicline-button").onclick = function () {
        diclinePermissionsForShops(email);
    };
}

// give permition

function givePermissionsForShops(shopId) {
    console.log(shopId);
    db.collection("shops")
        .doc(shopId)
        .update({
            "admin permission": true,
        })
        .then(function (doc) {
            console.log("update succussfully");
            alert("permision Granted");
            window.location.href="/pages/shop/shopRequests.html";
        })
        .catch(function (error) {
            console.log("failed" + error);
        });
}

function diclinePermissionsForShops(shopId) {
    console.log(shopId);
    db.collection("shops")
        .doc(shopId)
        .update({
            "admin permission": false,
        })
        .then(function (doc) {
            console.log("update succussfully");
            alert("permision Dicliend");
            window.location.href="/pages/shop/shopRequests.html";
        })
        .catch(function (error) {
            console.log("failed" + error);
        });
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}