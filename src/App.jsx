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
    } else {
      setAddedProducts(
        addedProducts.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    }
  };

  const removeFromCart = (product) => {
    setAddedProducts(
      addedProducts.filter((item) => item.name !== product.name)
    );
  };

  const somma = addedProducts.reduce((acc, item) => {
    return (acc + item.price * item.quantity).toFixed(2);
  }, 0);

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
            <div>
              <div key={product.name}>
                <span>{product.name} : </span>
                <span>{product.price} euro -</span>
                <span>x{product.quantity} </span>
                <button onClick={() => removeFromCart(product)}>
                  Rimuovi Prodotto
                </button>
              </div>
              <div>
                <h3>Il totale da pagare è:</h3>
                {somma} euro
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default App;
