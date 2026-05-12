import db from "../config/db.js"

let getAllSales = (req, res) => {
  db.query("SELECT * FROM Sales", (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

let addSale = (req, res) => {
  let { MedicineID, QuantitySold, TotalAmount, SaleDate } = req.body;

  db.query(
    "INSERT INTO Sales (MedicineID, QuantitySold, TotalAmount, SaleDate) VALUES (?,?,?,?)",
    [MedicineID, QuantitySold, TotalAmount, SaleDate],
    (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json({
        message: "Sale added successfully"
      });
    }
  );
};



export { getAllSales, addSale };