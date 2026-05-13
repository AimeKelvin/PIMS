import db from "../config/db.js";

let getSales = (req, res) => {
  const q = "SELECT * FROM Sales";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

let addSale = (req, res) => {
  const { MedicineID, QuantitySold, TotalAmount, SaleDate } = req.body;

  const q =
    "INSERT INTO Sales (MedicineID, QuantitySold, TotalAmount, SaleDate) VALUES (?,?,?,?)";

  db.query(
    q,
    [MedicineID, QuantitySold, TotalAmount, SaleDate],
    (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(201).json({
        message: "Sale added successfully",
      });
    }
  );
};

export { getSales, addSale };