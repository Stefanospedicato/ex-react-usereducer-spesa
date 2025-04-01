import React from "react";
import { useReducer } from "react";

const products = [
  { name: "Mela", price: 0.5 },
  { name: "Pane", price: 1.2 },
  { name: "Latte", price: 1.0 },
  { name: "Pasta", price: 0.7 },
];

function cartReducer(addedProducts, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const productExists = addedProducts.find(
        (item) => item.name === action.payload.name
      );
      if (!productExists) {
        return [...addedProducts, { ...action.payload, quantity: 1 }];
      } else {
        return addedProducts.map((item) =>
          item.name === action.payload.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

    case "REMOVE_ITEM":
      return addedProducts.filter((item) => item.name !== action.payload);
    default:
      return addedProducts;
  }
}

const App = () => {
  const [addedProducts, dispatchCart] = useReducer(cartReducer, []);

  const somma = addedProducts
    .reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0)
    .toFixed(2);

  return (
    <>
      <h1>Lista della Spesa:</h1>
      {products.map((product) => (
        <div key={product.name}>
          <span>{product.name} :</span>
          <span> {product.price} euro </span>
          <button
            onClick={() => dispatchCart({ type: "ADD_ITEM", payload: product })}
          >
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
              <button
                onClick={() =>
                  dispatchCart({ type: "REMOVE_ITEM", payload: product.name })
                }
              >
                Rimuovi Prodotto
              </button>
            </div>
          ))}
          <div>
            <h3>Il totale da pagare è:</h3>
            {somma} euro
          </div>
        </>
      )}
    </>
  );
};

export default App;
