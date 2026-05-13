import db from "../config/db.js";

export const getCategories = (req, res) => {
  const q = "SELECT * FROM Category";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getCategoryById = (req, res) => {
  const { id } = req.params;

  const q = "SELECT * FROM Category WHERE CategoryID = ?";

  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json(data[0]);
  });
};

export const addCategory = (req, res) => {
  const { CategoryName, StorageInstructions, AverageTaxRate } = req.body;

  const q =
    "INSERT INTO Category (CategoryName, StorageInstructions, AverageTaxRate) VALUES (?,?,?)";

  db.query(
    q,
    [CategoryName, StorageInstructions, AverageTaxRate],
    (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(201).json({
        message: "Category added successfully",
      });
    }
  );
};

export const updateCategory = (req, res) => {
  const { id } = req.params;
  const { CategoryName, StorageInstructions, AverageTaxRate } = req.body;

  const q =
    "UPDATE Category SET CategoryName = ?, StorageInstructions = ?, AverageTaxRate = ? WHERE CategoryID = ?";

  db.query(
    q,
    [CategoryName, StorageInstructions, AverageTaxRate, id],
    (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.affectedRows === 0) {
        return res.status(404).json({ message: "Category not found" });
      }

      return res.status(200).json({
        message: "Category updated successfully",
      });
    }
  );
};

export const deleteCategory = (req, res) => {
  const { id } = req.params;

  const q = "DELETE FROM Category WHERE CategoryID = ?";

  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({
      message: "Category deleted successfully",
    });
  });
};