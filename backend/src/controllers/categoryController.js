import db from "../config/db.js";

export const getCategories = (req, res) => {
  const q = "SELECT * FROM Category";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addCategory = (req, res) => {
    let { CategoryName, StorageInstructions, AverageTaxRate } = req.body
  const q = "INSERT INTO Category (CategoryName, StorageInstructions, AverageTaxRate) VALUES (?,?,?)";
  db.query(q, [CategoryName, StorageInstructions, AverageTaxRate],(err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json({
      message: "Category added successfully"
    });
  });
};

