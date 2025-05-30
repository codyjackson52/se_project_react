import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <li className="card">
      <p className="card__name">{item.name}</p>
      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={() => onCardClick(item)}
      />
    </li>
  );
}

export default ItemCard;
