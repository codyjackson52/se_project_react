import "./ItemCard.css";
import { useState } from "react";

function ItemCard({ item, onCardClick }) {
  // local like state (just for front-end toggling)
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked); // toggle state
  };

  return (
    <li className="card">
      {/* Item name */}
      <p className="card__name">{item.name}</p>

      {/* Item image */}
      <img
        src={item.link} // ✅ use link, not imageUrl
        alt={item.name}
        className="card__image"
        onClick={() => onCardClick(item)}
      />

      {/* Like button */}
      <button
        className="card__like-button"
        onClick={handleLikeClick}
        aria-label="like"
      >
        <img
          src={isLiked ? "/heart-filled.svg" : "/heart.svg"}
          alt={isLiked ? "liked" : "not liked"}
          className="card__like-icon"
        />
      </button>
    </li>
  );
}

export default ItemCard;
