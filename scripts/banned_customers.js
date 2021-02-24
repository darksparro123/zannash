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
const table = document.querySelector("#banned-customers-table");


db.collection("banned_users")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            renderBannedUsers(doc);
        });
    })
    .catch(function(error) {});

function renderBannedUsers(doc) {
    let tr = document.createElement("tr");
    let customerId = document.createElement("td");
    let enableButton = document.createElement("button");

    customerId.textContent = doc.data()["customer_id"];
    enableButton.textContent = "Enable User";
    enableButton.setAttribute("class", "btn indigo");

    tr.setAttribute("id", doc.id);

    enableButton.onclick = function() {
        const enableUser = firebase.functions().httpsCallable("enableUser");
        enableUser(doc.data()["customer_id"]).then(() => {
            db.collection("banned_users")
                .doc(doc.data()["customer_id"])
                .delete()
            db.collection("Customer").doc(doc.data()["customer_id"]).update({
                "banned":false
            }).then(()=>{
                location.reload();
            });
                });
    };

    tr.appendChild(customerId);
    tr.appendChild(enableButton);
    table.appendChild(tr);
}

// const customerDetailsList = document.querySelector("#customer-details-list");
// const customerDetailsListsearch = document.querySelector("#customer-details-list-search");

// db.collection("Customer")
//     .get()
//     .then(function (querySnapshot) {
//         var status="normal";
//         querySnapshot.forEach(function (doc) {
//             getCustomerCollection(doc.id,status);
//         });
//     })
//     .catch(function (error) { });

// // get customer details collection
// function getCustomerCollection(docId,status) {
//     console.log("called");
//     db.collection("Customer")
//         .doc(docId)
//         .collection("Customer's Details")
//         .get()
//         .then((snapshot) => {
//             snapshot.docs.forEach((doc) => {
//                 // console.log(doc.data()["Custumer's Name"]);
//                 // console.log(doc.data()["Custumer's Address"]);
//                 // console.log(doc.data()["Custumer's Mobile Number"]);
//                 // console.log(doc.id);
//                 renderItems(doc,status);
//             });
//         });
// }

// function renderItems(doc,status) {
//     let tableRow = document.createElement("tr");
//     let cName = document.createElement("td");
//     let cAddress = document.createElement("td");
//     let cMobile = document.createElement("td");
//     let cEmail = document.createElement("td");
//     let cOrders = document.createElement("td");
//     let ordersButton = document.createElement("button");

//     let cnamelabel = document.createElement("label");
//     let cnamediv = document.createElement("div");

//     let cadresslabel = document.createElement("label");
//     let cadressdiv = document.createElement("div");

//     let cmobilelabel = document.createElement("label");
//     let cmobilediv = document.createElement("div");

//     let cemaillabel = document.createElement("label");
//     let cemaildiv = document.createElement("div");

//     let corderslabel = document.createElement("label");

//     cnamelabel.textContent = "Customer's Name";
//     cName.appendChild(cnamelabel);

//     cadresslabel.textContent = "Customer's Adress";
//     cAddress.appendChild(cadresslabel);

//     cmobilelabel.textContent = "Customer's Mobile";
//     cMobile.appendChild(cmobilelabel);

//     cemaillabel.textContent = "Customer's Email";
//     cEmail.appendChild(cemaillabel);

//     corderslabel.textContent = "Customer's Orders";
//     cOrders.appendChild(corderslabel);



//     ordersButton.textContent = "orders";
//     cOrders.appendChild(ordersButton);

//     cnamediv.textContent = doc.data()["Custumer's Name"];
//     cName.appendChild(cnamediv);
//     cadressdiv.textContent = doc.data()["Custumer's Address"];
//     cAddress.appendChild(cadressdiv);
//     cmobilediv.textContent = doc.data()["Custumer's Mobile Number"];
//     cMobile.appendChild(cmobilediv);
//     cemaildiv.textContent = doc.data()["Custumer's Email"];
//     cEmail.append(cemaildiv);

//     tableRow.setAttribute("doc-id", doc.id);
//     ordersButton.setAttribute("id", "orders");
//     ordersButton.setAttribute("class", "btn");


//     tableRow.appendChild(cName);
//     tableRow.appendChild(cAddress);
//     tableRow.appendChild(cMobile);
//     tableRow.appendChild(cEmail);
//     tableRow.appendChild(cOrders);


//     if(status=="normal"){
//         customerDetailsList.appendChild(tableRow);

//     }else{
//         customerDetailsListsearch.appendChild(tableRow);
//     }
    
//     document.getElementById("orders").onclick = function () {
//         getCustomersOrders();
//     };
// }

// function getCustomersOrders() {
//     db.collection("orders")
//         .get()
//         .then((snapshot) => {
//             snapshot.docs.forEach((doc) => {
//                 db.collection("order_status")
//                     .get()
//                     .then((snap) => {
//                         snap.docs.forEach((document) => {
//                             console.log("docs id is " + document.id);
//                             var n = document.id.localeCompare(doc.data()["order_status_id"]);
//                             if (n == 0) {
//                                 console.log(doc.data());
//                             }
//                         });
//                     });
//             });
//         });
// }

// function renderOrders(orderStatusId) { }

// function myFunction() {
//     document.getElementById("myDropdown").classList.toggle("show");
// }


// async function searchUser() {
//     let searchval=document.getElementById("search-name").value;
//     console.log(searchval);
//     document.getElementById("customer-details-list").style.display="none";
//     document.getElementById("customer-details-list-search").style.visibility="visible";

//     await db.collection("Customer").get().then(function (querySnapshot) {
//         querySnapshot.forEach(async function (doc) {
//             console.log(doc.id);
//             await db.collection("Customer").doc(doc.id).collection("Customer's Details").where("Custumer's Name", "==", searchval).get().then((snapshot) => {
//                 console.log(snapshot.docs);
//                 if (snapshot.docs.length != 0) {
//                     console.log("got your name");
//                     var status="search";
//                     snapshot.forEach((data) => {
//                         getCustomerCollection(data.data()["Custumer's Email"],status);
//                         console.log(data.data()["Custumer's Email"]);
//                     });
//                 } 
//             });

//         });
//     }).catch((error) => {
//         console.log(error);
//     });

// }

// //searchUser("sasith");