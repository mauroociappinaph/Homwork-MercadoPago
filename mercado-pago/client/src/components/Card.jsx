import { useState } from "react";
import axios from "axios";

export default function Card(product) {
  const [quantity, setQuantity] = useState(1);

  const quantityIncrement = () =>
    product.stock > quantity ? setQuantity(quantity + 1) : null;

  const quantityDecrement = () =>
    quantity > 1 ? setQuantity(quantity - 1) : null;

  const checkout = () => {
    axios
      .post("http://localhost:3001/payment/create-order", {
        ...product,
        quantity,
      })
      .then((response) => {
        window.location.href = response.data.body.init_point;
      })
      .catch((error) => console.log({ error: error.message }));
  };

  return (
    <div
      style={{
        backgroundColor: "yellow",
        width: "400px",
        padding: "15px",
        margin: "15px",
        borderRadius: "8px",
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <h3 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
        {product.name}
      </h3>
      <h3 style={{ fontSize: "1.1rem", color: "#4caf50" }}>
        Precio: {product.price}
      </h3>
      <h4 style={{ fontSize: "1rem" }}>Condición: {product.condition}</h4>
      <h4 style={{ fontSize: "1rem" }}>Stock: {product.stock}</h4>
      <p style={{ fontSize: "0.9rem" }}>Descripción: {product.description}</p>
      <h4>Cantidad: {quantity}</h4>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={quantityDecrement}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: "1rem",
            marginRight: "10px",
          }}
        >
          -
        </button>
        <button
          onClick={quantityIncrement}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            fontSize: "1rem",
            marginRight: "10px",
          }}
        >
          +
        </button>
      </div>
      <button
        onClick={checkout}
        style={{
          backgroundColor: "#ffc107",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          padding: "8px 12px",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Comprar
      </button>
    </div>
  );
}
