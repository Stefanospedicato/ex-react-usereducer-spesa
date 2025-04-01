import React from "react";
import { useReducer } from "react";

const products = [
  { name: "Mela", price: 0.5 },
  { name: "Pane", price: 1.2 },
  { name: "Latte", price: 1.0 },
  { name: "Pasta", price: 0.7 },
];

const App = () => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD":
        return [...state, action.payload];
      case "REMOVE":
        return state.filter((item) => item.name !== action.payload.name);
      default:
        return state;
    }
  }, []);

  return (
    <>
      <h1>Lista della Spesa:</h1>
      {products.map((product) => (
        <div key={product.name}>
          <span>{product.name} :</span>
          <span> {product.price} euro</span>
        </div>
      ))}
    </>
  );
};

export default App;
