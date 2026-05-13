import db from "../config/db.js";

let getDailyReport = (req, res) => {
  const selectedDate = req.query.date;

  const q = `
    SELECT 
      Medicine.TradeName,
      SUM(Sales.QuantitySold) AS QuantitySold,
      InventoryStock.QuantityInHand AS RemainingStock

    FROM Sales

    JOIN Medicine
    ON Sales.MedicineID = Medicine.MedicineID

    JOIN InventoryStock
    ON Medicine.MedicineID = InventoryStock.MedicineID

    WHERE DATE(Sales.SaleDate) = ?

    GROUP BY 
      Medicine.MedicineID,
      Medicine.TradeName,
      InventoryStock.QuantityInHand

    ORDER BY Medicine.TradeName ASC
  `;

  db.query(q, [selectedDate], (err, data) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Failed to generate daily report",
      });
    }

    return res.status(200).json(data);
  });
};

export { getDailyReport };