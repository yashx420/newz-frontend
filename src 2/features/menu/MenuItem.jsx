import { formatCurrency } from "../../utils/helpers";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients = [], soldOut, imageUrl } = pizza;

  return (
    <li key={id} className="menu-item">
      <img src={imageUrl} alt={name || "Pizza image"} className="pizza-img" />
      <div className="pizza-details">
        <p className="pizza-name">{name}</p>
        <p className="pizza-ingredients">
          {ingredients.length > 0
            ? ingredients.join(", ")
            : "No ingredients listed"}
        </p>
        <div className="pizza-price">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="sold-out">Sold out</p>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
