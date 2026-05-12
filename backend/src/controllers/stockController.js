import db from "../config/db.js"

let checkInventory = (req, res) => {
db.query("SELECT * FROM InventoryStock", (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  })
}

let  AddInventoryRecord = (req,res) => {
    let { MedicineID, QuantityInHand, ExpiryDate } = req.body
    db.query("INSERT INTO InventoryStock (MedicineID, QuantityInHand, ExpiryDate) VALUES (?,?,?)", [MedicineID, QuantityInHand, ExpiryDate],(err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({message: "Add new record"});
  } )
}

export {AddInventoryRecord,checkInventory }