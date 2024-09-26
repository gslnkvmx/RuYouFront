const express = require("express");

const app = express();
const port = 8383;

app.use(express.static(__dirname));
app.use(express.json());

app.listen(port);

app.get("/home", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.post("/persInfo", (req, res) => {
  insert_query =
    "INSERT INTO contact_requests(name, email, phone, date) VALUES(?, ?, ?, ?)";
  var utc = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
  values = [req.body.name, req.body.email, req.body.phone, utc];
  console.log(values, utc);
});
