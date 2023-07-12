const express = require("express");
const createOrder = require("../controllers/createOrder");
const paymentRouter = express.Router();

const webhook = require("../controllers/webhook");
const success = require("../controllers/success");

// Crear orden de pago
paymentRouter.post("/create-order", createOrder);

// Pago exitoso
paymentRouter.get("/success", success);
// Pago rechazado
paymentRouter.get("/failure", (req, res) => {
	return res.status(200).send("GET /failure");
});
// Pago pendiente
paymentRouter.get("/pending", (req, res) => {
	return res.status(200).send("GET /pending");
});

// Escuchar eventos previo a la resolución
paymentRouter.post("/webhook", webhook);

module.exports = paymentRouter;