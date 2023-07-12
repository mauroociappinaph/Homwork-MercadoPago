const mercadopago = require("mercadopago");
require("dotenv").config({ path: "./.env" });
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

mercadopago.configure({
	access_token: ACCESS_TOKEN,
});

const createOrder = (req, res) => {
	const {
		id, title, description, image, stock, condition, price, quantity
	} = req.body;
	let preference = {
	items: [
		{
			id: id,
			title: title,
			quantity: quantity,
			unit_price: price,
			currency_id: "ARS",
			picture_url: image,
			description: description,
		},
	],
	back_urls: {
		success: "http://localhost:3001/payment/success",
		failure: "http://localhost:3001/payment/failure",
		pending: "http://localhost:3001/payment/pending",
	},
    notification_url: "https://6736-190-190-85-204.ngrok-free.app/payment/webhook"
};

mercadopago.preferences
	.create(preference)
	.then((response) => res.status(200).json(response))
	.catch((error) => res.status(400).json({ error: error.message }));
};

module.exports = createOrder;