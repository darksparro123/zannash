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

const table = document.querySelector("#monthly-shop-earnings");
var list = [];
var shopData = {};

db.collection("order_status")
    .where("recieved_order", "==", true)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.docs.forEach(function(doc) {
            if (doc.data()["ordertime"] != null) {
                var date = doc.data()["ordertime"].toDate();
                var d = new Date(date);
                shopData["date"] = d.getMonth() + 1 + "/" + d.getFullYear();
                shopData["shop_id"] = doc.data()["shop_id"];

                var shopId = doc.data()["shop_id"];
                var itemId = doc.data()["item_id"];

                db.collection("shops")
                    .doc(shopId)
                    .collection("Listed Items")
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.docs.forEach(function(doc) {
                            if (doc.id == itemId) {
                                if (doc.data()["realPrice"] != null) {
                                    var realPrice = parseFloat(doc.data()["realPrice"]);
                                    var listedPrice = parseFloat(doc.data()["itemPrice"]);
                                    var proffit = listedPrice - realPrice;
                                }
                            }
                        });
                    })
                    .catch(function(error) {
                        return error;
                    });

                list.push(shopData);
                console.log(list);
            }
        });
    })
    .catch(function(error) {
        console.log(error);
    });

function getPrices(shopId, itemId) {
    db.collection("shops")
        .doc(shopId)
        .collection("Listed Items")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.docs.forEach(function(doc) {
                if (doc.id == itemId) {
                    if (doc.data()["realPrice"] != null) {
                        var realPrice = parseFloat(doc.data()["realPrice"]);
                        var listedPrice = parseFloat(doc.data()["itemPrice"]);
                        var proffit = listedPrice - realPrice;
                        //console.log(proffit);
                    }
                    return proffit;
                }
            });
        })
        .catch(function(error) {
            return error;
        });
}