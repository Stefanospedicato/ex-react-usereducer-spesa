import React from "react";
import { useReducer, useState } from "react";

const products = [
  { name: "Mela", price: 0.5 },
  { name: "Pane", price: 1.2 },
  { name: "Latte", price: 1.0 },
  { name: "Pasta", price: 0.7 },
];

const App = () => {
  const [addedProducts, setAddedProducts] = useState([]);

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

  const addToCart = (product) => {
    product = { ...product, quantity: 1 };
    const productExists = addedProducts.find(
      (item) => item.name === product.name
    );
    if (!productExists) {
      setAddedProducts([...addedProducts, { ...product, quantity: 1 }]);
    }
  };
  return (
    <>
      <h1>Lista della Spesa:</h1>
      {products.map((product) => (
        <div key={product.name}>
          <span>{product.name} :</span>
          <span> {product.price} euro </span>
          <button onClick={() => addToCart(product)}>
            Aggiungi al carrello
          </button>
        </div>
      ))}
      {addedProducts.length > 0 && (
        <>
          <h1>Carrello:</h1>
          {addedProducts.map((product) => (
            <div key={product.name}>
              <span>{product.name} : </span>
              <span>{product.price} euro -</span>
              <span>x{product.quantity} </span>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default App;
