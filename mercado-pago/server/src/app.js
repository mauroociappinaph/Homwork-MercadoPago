const express = require("express");
const app = express();
const morgan = require("morgan");
const paymentRouter = require("./routes/payment");

app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	next();
});

app.use("/payment", paymentRouter);

app.get("/", (req, res) => {
    res.status(200).send("Server listening...");
});

module.exports = app;