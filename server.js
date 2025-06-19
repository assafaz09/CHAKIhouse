const express = require("express");
const app = express();
const port = process.env.PORT || 56000;
const path = require("path");
const db = require("mongoose");

db.connect(
  "mongodb+srv://assafaz09:passforsv@cluster0.abyvdvl.mongodb.net/chaki"
)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "website",)));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname,"website") });
});

const userSchema = new db.Schema({
  name: String,
  email: String,
  message: String,
});

const User = db.model("User", userSchema);

app.post("/register", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      console.log(`User saved: ${user.name}`);
      res
        .status(201)
        .sendFile("pics.html", { root: path.join(__dirname, "website") });
    })

    .catch((err) => res.status(400).send("Error saving user: " + err.message));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
