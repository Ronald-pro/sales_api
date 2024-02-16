
const express = require('express');
const app = express();
const bodyParser = require("body-parser");

const customers = require("./routes/customer");
const users = require("./routes/user");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// app.get('/', (req, res) => {
//   res.send('Hello, Sales we are here!');
// });
app.use("/api/customer", customers);
app.use("/api/user", users);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`Listening on Port: ${PORT}`)
);
