import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, isLoggedIn, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const handleLikeClick = () => {
    onCardLike(item);
  };

  return (
    <li className="card">
      <p className="card__name">{item.name}</p>

      <img
        src={item.link}
        alt={item.name}
        className="card__image"
        onClick={() => onCardClick(item)}
      />

      {isLoggedIn && (
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
      )}
    </li>
  );
}

export default ItemCard;
