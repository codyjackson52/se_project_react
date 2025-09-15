import { useContext } from "react";
import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // Determine if the current user has liked this item
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  // Apply special CSS if liked
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;

  // Handle clicking the like button (without triggering modal)
  const handleLike = (e) => {
    e.stopPropagation(); // ✅ prevent modal from opening when liking
    onCardLike(item);
  };

  return (
    <li className="card" onClick={() => onCardClick(item)}>
      {/* Item image */}
      <img src={item.imageUrl} alt={item.name} className="card__image" />

      {/* Item title below image */}
      <h3 className="card__title">{item.name}</h3>

      {/* Like button (overlay top-right) */}
      {currentUser && (
        <button
          className={itemLikeButtonClassName}
          onClick={handleLike}
          type="button"
          aria-label={isLiked ? "Unlike item" : "Like item"}
        />
      )}
    </li>
  );
}

export default ItemCard;
