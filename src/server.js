const express = require("express");
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("database.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
});

const app = express();
const port = 8383;

app.use(express.static(__dirname));
app.use(express.json());

app.listen(port);

async function create_table() {
  await db.run(`CREATE TABLE IF NOT EXISTS contact_requests(
      name text,
      email text, 
      phone text,
      date text
  )`);
}

create_table();

app.get("/home", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.post("/persInfo", (req, res) => {
  insert_query =
    "INSERT INTO contact_requests(name, email, phone, date) VALUES(?, ?, ?, ?)";
  var utc = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
  values = [req.body.name, req.body.email, req.body.phone, utc];
  console.log(values, utc);
  db.run(insert_query, values);
});
