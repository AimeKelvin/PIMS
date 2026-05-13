import db from "../config/db.js";

let getBills = (req, res) => {
  const q = `
    SELECT 
      Sales.SaleNumber,
      Medicine.TradeName,
      Sales.QuantitySold,
      Sales.TotalAmount AS SubTotal,
      Category.AverageTaxRate,
      (Sales.TotalAmount * Category.AverageTaxRate / 100) AS TaxAmount,
      (Sales.TotalAmount + (Sales.TotalAmount * Category.AverageTaxRate / 100)) AS TotalAmount,
      Sales.SaleDate
    FROM Sales
    JOIN Medicine
    ON Sales.MedicineID = Medicine.MedicineID
    JOIN Category
    ON Medicine.CategoryID = Category.CategoryID
    ORDER BY Sales.SaleNumber DESC
  `;

  db.query(q, (err, data) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Failed to load bills",
      });
    }

    return res.status(200).json(data);
  });
};

export { getBills };