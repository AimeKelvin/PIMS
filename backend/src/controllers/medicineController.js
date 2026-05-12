import db from "../config/db.js";

export const getMedicines = (req, res) => {
  const q = "SELECT * FROM Medicine";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addMedicine = (req, res) => {
    let { CategoryID, TradeName, GenericName, UnitPrice } = req.body
  const q = "INSERT INTO Medicine (CategoryID, TradeName, GenericName, UnitPrice) VALUES (?,?,?,?)";
  db.query(q, [CategoryID, TradeName, GenericName, UnitPrice],(err) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json({
      message: "Medicine added successfully"
    });
  });
};

