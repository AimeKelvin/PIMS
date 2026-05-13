import db from "../config/db.js";

let getAllInventory = (req, res) => {
  db.query("SELECT * FROM InventoryStock", (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

let addInventory = (req, res) => {
  let { MedicineID, QuantityInHand, ExpiryDate } = req.body;

  db.query(
    "INSERT INTO InventoryStock (MedicineID, QuantityInHand, ExpiryDate) VALUES (?,?,?)",
    [MedicineID, QuantityInHand, ExpiryDate],
    (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json({
        message: "Inventory added successfully"
      });
    }
  );
};

export { getAllInventory, addInventory };