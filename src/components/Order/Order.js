import React from 'react';
import classes from './Order.css';

const Order = props => {
  const ingredients = [];
  for (let ingrName in props.ingredients) {
    ingredients.push({
      name: ingrName,
      amount: props.ingredients[ingrName]
    });
  }

  const ingOutpu = ingredients.map(ing => (
    <span
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '3px'
      }}
      key={ing.name}
    >
      {ing.name} ({ing.amount})
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingOutpu}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
