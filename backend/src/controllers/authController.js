import db from "../config/db.js";

export const register = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required"
    });
  }

  db.query(
    "INSERT INTO User (Username, Password) VALUES (?, ?)",
    [username, password],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Registration failed",
          error: err
        });
      }

      req.session.user = {
        id: result.insertId,
        username
      };

      res.json({
        message: "Registered successfully",
        user: req.session.user
      });
    }
  );
};

export const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required"
    });
  }

  db.query(
    "SELECT * FROM User WHERE Username = ?",
    [username],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Login failed",
          error: err
        });
      }

      if (result.length === 0) {
        return res.status(401).json({
          message: "User not found"
        });
      }

      const user = result[0];

      if (user.Password !== password) {
        return res.status(401).json({
          message: "Wrong password"
        });
      }

      req.session.user = {
        id: user.UserId,
        username: user.Username
      };

      res.json({
        message: "Login successful",
        user: req.session.user
      });
    }
  );
};

export const me = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({
      message: "Not logged in"
    });
  }

  res.json({
    user: req.session.user
  });
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");

    res.json({
      message: "Logged out"
    });
  });
};