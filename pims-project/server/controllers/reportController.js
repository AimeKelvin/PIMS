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

let getReportByDateRange = (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({
      message: "Start date and end date are required",
    });
  }

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
    WHERE DATE(Sales.SaleDate) BETWEEN ? AND ?
    GROUP BY 
      Medicine.MedicineID,
      Medicine.TradeName,
      InventoryStock.QuantityInHand
    ORDER BY Medicine.TradeName ASC
  `;

  db.query(q, [startDate, endDate], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Failed to generate report by date range",
      });
    }

    return res.status(200).json(data);
  });
};

export { getDailyReport, getReportByDateRange };