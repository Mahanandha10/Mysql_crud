const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root12345",
  database: "crud",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + connection.threadId);
});

// Routes
app.get("/", (req, res) => {
  connection.query("SELECT * FROM users", (error, results) => {
    if (error) {
      res.json({ error });
    } else {
      res.json(results);
    }
  });
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM users WHERE id = ?",
    [id],
    (error, results) => {
      if (error) {
        res.json({ error });
      } else {
        res.json(results[0]);
      }
    }
  );
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  connection.query("DELETE FROM users WHERE id = ?", [id], (error, results) => {
    if (error) {
      res.json({ error });
    } else {
      res.json({ message: "User deleted successfully" });
    }
  });
});

app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, age } = req.body;
  connection.query(
    "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?",
    [name, email, age, id],
    (error, results) => {
      if (error) {
        res.json({ error });
      } else {
        res.json({ message: "User updated successfully" });
      }
    }
  );
});

app.post("/createUser", (req, res) => {
  const { name, email, age } = req.body;
  connection.query(
    "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
    [name, email, age],
    (error, results) => {
      if (error) {
        res.json({ error });
      } else {
        res.json({ message: "User created successfully" });
      }
    }
  );
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
