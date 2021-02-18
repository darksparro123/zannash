const table = document.createElement("#earnings-table");

function renderEarnngs1(shopId) {
    db.collection("order_status")
        .where("shop_id", "==", shopId)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if (doc.data()["recieved_order"] == true) {
                    renderEarnngs(doc, shopId);
                }
            });
        })
        .catch(function(error) {
            console.log("get shop earnings failed " + error);
        });
}

function renderEarnngs(doc, shopId) {
    let tr = document.createElement("tr");
    tr.setAttribute("id", doc.id);
    //console.log(doc.data());
    let orderId = document.createElement("td");
    let listedPrice = document.createElement("td");
    let realPrice = document.createElement("td");
    let proffit = document.createElement("td");

    orderId.textContent = doc.data()["orderid"];

    db.collection("shops")
        .doc(shopId)
        .collection("Listed Items")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(snap) {
                if (snap.id == doc.data()["item_id"]) {
                    realPrice.textContent = doc.data()["realPrice"];
                    listedPrice.textContent = doc.data()["itemPrice"];

                    proffit.textContent =
                        parseFloat(doc.data()["realPrice"]) -
                        parseFloat(doc.data()["itemPrice"]).toString();
                    tr.appendChild(orderId);
                    tr.appendChild(listedPrice);
                    tr.appendChild(realPrice);
                    tr.appendChild(proffit);
                }
            });
            table.appendChild(tr);
        })
        .catch(function(error) {
            console.log(error);
        });
}