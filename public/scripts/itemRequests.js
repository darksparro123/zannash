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


async function getall(){
    loadspinner();

    await db.collection("shops")
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.id);
            getShopListedItems(doc);
        });
    })
    .catch(function (error) {
        console.log("Get shop id s failed  " + error);
    });

    stopspinner();

}

getall();


async function getShopListedItems(shoDoc) {
    await db.collection("shops")
        .doc(shoDoc.id)
        .collection("Listed Items")
        .where("admin_permission", "==", false)
        .get()
        .then(function (querySnapshot) {
            //console.log(querySnapshot.docs.length);
            if (querySnapshot.docs.length != 0) {
                querySnapshot.forEach(function (doc) {
                    console.log(shoDoc.data());
                    console.log(doc.data());
                    renderListedItems(doc, shoDoc);
                });

            }

        })
        .catch(function (error) {
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
    let diclinePermission = document.createElement("button");

    let f = document.createElement("form");
    let inp = document.createElement("input");

    let shnamelabel = document.createElement("label");
    let shdiv = document.createElement("div");

    let shidlabel = document.createElement("label");
    let shiddiv = document.createElement("div");

    let itemnamelabel = document.createElement("label");
    let itemnamediv = document.createElement("div");

    let itemidlabel = document.createElement("label");
    let itemiddiv = document.createElement("div");

    let listedpricelabel = document.createElement("label");
    let listedpricediv = document.createElement("div");

    f.setAttribute("id", "give-permission-" + doc.id);
    inp.setAttribute("type", "text");
    inp.setAttribute("id", doc.id);
    inp.setAttribute("placeholder", "Add Commision");
    f.appendChild(inp);

    //addCommision.setAttribute("id", doc.id);
    addCommision.appendChild(f);
    giverPermission.setAttribute("class", "btn");
    diclinePermission.setAttribute("class", "btn dicline");
    //giverPermission.setAttribute("id", doc.id);
    giverPermission.textContent = "Give Permission";
    diclinePermission.textContent = "Decline Permission";

    giverPermission.onclick = function () {
        myFun(doc, snap, "accepted");
        console.log(doc.id);
    };

    diclinePermission.onclick = function () {
        myFun(doc, snap, "diclined");
        console.log(doc.id);
    };

    let img = document.createElement("img");
    img.setAttribute("src", doc.data()["image url"]);
    img.setAttribute("width", "50");
    img.setAttribute("height", "50");
    itemImage.appendChild(img);

    shnamelabel.textContent = "Shop Name: ";
    shopName.appendChild(shnamelabel);

    shidlabel.textContent = "Shop Id: ";
    shopId.appendChild(shidlabel);

    itemnamelabel.textContent = "Item Name: ";
    itemName.appendChild(itemnamelabel);

    itemidlabel.textContent = "Item Id: ";
    itemId.appendChild(itemidlabel);

    listedpricelabel.textContent = "Listed Price: ";
    listedItemPrice.appendChild(listedpricelabel);



    itemnamediv.textContent = doc.data()["item Name"];
    itemName.appendChild(itemnamediv);

    listedpricediv.textContent = doc.data()["realPrice"];
    listedItemPrice.appendChild(listedpricediv);

    itemiddiv.textContent = doc.id;
    itemId.appendChild(itemiddiv);

    shdiv.textContent = snap.data()["Shop Name"];
    shopName.appendChild(shdiv);

    shiddiv.textContent = snap.id;
    shopId.appendChild(shiddiv);

    addCommision.appendChild(giverPermission);
    addCommision.appendChild(diclinePermission);

    itemRow.appendChild(shopName);
    itemRow.appendChild(shopId);
    itemRow.appendChild(itemName);
    itemRow.appendChild(itemId);
    itemRow.appendChild(itemImage);
    itemRow.appendChild(listedItemPrice);
    itemRow.appendChild(addCommision);
    //itemRow.appendChild(giverPermission);

    // itemRow.setAttribute("id", doc.id);

    itemRequestsTable.appendChild(itemRow);
}

async function myFun(doc, snap, status) {
    if (status == "accepted") {
        var form = document.querySelector("#give-permission-" + doc.id);
        console.log(form[doc.id].value);
        await db.collection("shops")
            .doc(snap.id)
            .collection("Listed Items")
            .doc(doc.id)
            .update({ itemPrice: form[doc.id].value, admin_permission: true })
            .then(function () {
                console.log("updated succesfully");
                alert("permission Granded");
                document.location.reload(true);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    else {
        await db.collection("shops")
            .doc(snap.id)
            .collection("Listed Items")
            .doc(doc.id)
            .update({ admin_permission: false })
            .then(function () {
                console.log("updated succesfully");
                alert("permission Diclined");
                document.location.reload(true);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

}


function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}