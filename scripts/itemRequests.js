const itemRequestsTable = document.querySelector("#item-requests-table");
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

db.collection("shops")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            getShopListedItems(doc);
        });
    })
    .catch(function(error) {
        console.log("Get shop id s failed  " + error);
    });

function getShopListedItems(shoDoc) {
    db.collection("shops")
        .doc(shoDoc.id)
        .collection("Listed Items")
        .where("admin_permission", "==", false)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                db.collection("shops")
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(snap) {
                            renderListedItems(doc, snap);
                        });
                    })
                    .catch(function(error) {});
            });
        })
        .catch(function(error) {
            console.log("get listed items failed " + error);
        });
}

function renderListedItems(doc, snap) {
    let itemRow = document.createElement("tr");

    let itemName = document.createElement("td");
    let itemId = document.createElement("td");
    let shopName = document.createElement("td");
    let shopId = document.createElement("td");
    let itemImage = document.createElement("td");
    let listedItemPrice = document.createElement("td");
    let addCommision = document.createElement("td");
    let giverPermission = document.createElement("button");
    let f = document.createElement("form");
    let inp = document.createElement("input");

    f.setAttribute("id", "give-permission-" + doc.id);
    inp.setAttribute("type", "text");
    inp.setAttribute("id", doc.id);
    f.appendChild(inp);

    //addCommision.setAttribute("id", doc.id);
    addCommision.appendChild(f);
    giverPermission.setAttribute("class", "btn");
    //giverPermission.setAttribute("id", doc.id);
    giverPermission.textContent = "Give Permission";
    giverPermission.onclick = function() {
        myFun(doc);
        console.log(doc.id);
    };

    let img = document.createElement("img");
    img.setAttribute("src", doc.data()["image url"]);
    img.setAttribute("width", "50");
    img.setAttribute("height", "50");
    itemImage.appendChild(img);

    itemName.textContent = doc.data()["item Name"];
    listedItemPrice.textContent = doc.data()["realPrice"];
    itemId.textContent = doc.id;
    shopName.textContent = snap.data()["Shop Name"];
    shopId.textContent = snap.id;

    itemRow.appendChild(shopName);
    itemRow.appendChild(shopId);
    itemRow.appendChild(itemName);
    itemRow.appendChild(itemId);
    itemRow.appendChild(itemImage);
    itemRow.appendChild(listedItemPrice);
    itemRow.appendChild(addCommision);
    itemRow.appendChild(giverPermission);

    // itemRow.setAttribute("id", doc.id);

    itemRequestsTable.appendChild(itemRow);
}

function myFun(doc) {
    var form = document.querySelector("#give-permission-" + doc.id);
    console.log(form[doc.id].value);

    db.collection("shops")
        .doc("darksparrow856@gmail.com")
        .collection("Listed Items")
        .doc(doc.id)
        .update({ itemPrice: form[doc.id].value, admin_permission: true })
        .then(function() {
            console.log("updated succesfully");
        })
        .catch(function(error) {});
}