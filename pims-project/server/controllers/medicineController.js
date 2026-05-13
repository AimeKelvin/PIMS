import db from "../config/db.js";

export const getMedicines = (req, res) => {
  const q = "SELECT * FROM Medicine";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const getMedicineById = (req, res) => {
  const { id } = req.params;

  const q = "SELECT * FROM Medicine WHERE MedicineID = ?";

  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    return res.status(200).json(data[0]);
  });
};

export const addMedicine = (req, res) => {
  const { CategoryID, TradeName, GenericName, UnitPrice } = req.body;

  const q =
    "INSERT INTO Medicine (CategoryID, TradeName, GenericName, UnitPrice) VALUES (?,?,?,?)";

  db.query(
    q,
    [CategoryID, TradeName, GenericName, UnitPrice],
    (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(201).json({
        message: "Medicine added successfully",
      });
    }
  );
};

export const updateMedicine = (req, res) => {
  const { id } = req.params;

  const { CategoryID, TradeName, GenericName, UnitPrice } = req.body;

  const q =
    "UPDATE Medicine SET CategoryID = ?, TradeName = ?, GenericName = ?, UnitPrice = ? WHERE MedicineID = ?";

  db.query(
    q,
    [CategoryID, TradeName, GenericName, UnitPrice, id],
    (err, data) => {
      if (err) return res.status(500).json(err);

      if (data.affectedRows === 0) {
        return res.status(404).json({
          message: "Medicine not found",
        });
      }

      return res.status(200).json({
        message: "Medicine updated successfully",
      });
    }
  );
};

export const deleteMedicine = (req, res) => {
  const { id } = req.params;

  const q = "DELETE FROM Medicine WHERE MedicineID = ?";

  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.affectedRows === 0) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    return res.status(200).json({
      message: "Medicine deleted successfully",
    });
  });
};