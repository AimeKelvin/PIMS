import db from "../config/db.js";

let getSales = (req, res) => {
  const q = `
    SELECT 
      Sales.*,
      Medicine.TradeName
    FROM Sales
    JOIN Medicine
    ON Sales.MedicineID = Medicine.MedicineID
  `;

  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    return res.status(200).json(data);
  });
};

let addSale = (req, res) => {
  const { MedicineID, QuantitySold, SaleDate } = req.body;

  const medicineQuery = `
    SELECT 
      UnitPrice
    FROM Medicine 
    WHERE MedicineID = ?
  `;

  db.query(medicineQuery, [MedicineID], (err, medicineData) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    if (medicineData.length === 0) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    let UnitPrice = medicineData[0].UnitPrice;

    let TotalAmount = UnitPrice * QuantitySold;

    const stockQuery = `
      SELECT QuantityInHand
      FROM InventoryStock
      WHERE MedicineID = ?
    `;

    db.query(stockQuery, [MedicineID], (err, stockData) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      if (stockData.length === 0) {
        return res.status(404).json({
          message: "Medicine stock not found",
        });
      }

      let CurrentStock = stockData[0].QuantityInHand;

      if (QuantitySold > CurrentStock) {
        return res.status(400).json({
          message: "Not enough stock available",
        });
      }

      const saleQuery = `
        INSERT INTO Sales 
        (MedicineID, QuantitySold, TotalAmount, SaleDate)
        VALUES (?,?,?,?)
      `;

      db.query(
        saleQuery,
        [MedicineID, QuantitySold, TotalAmount, SaleDate],
        (err, data) => {
          if (err) {
            console.log(err);
            return res.status(500).json(err);
          }

          const updateStockQuery = `
            UPDATE InventoryStock
            SET QuantityInHand = QuantityInHand - ?
            WHERE MedicineID = ?
          `;

          db.query(
            updateStockQuery,
            [QuantitySold, MedicineID],
            (err, result) => {
              if (err) {
                console.log(err);
                return res.status(500).json(err);
              }

              return res.status(201).json({
                message: "Sale added successfully",
              });
            }
          );
        }
      );
    });
  });
};

export { getSales, addSale };