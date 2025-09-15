import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ clothingItems, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // Only show items uploaded by the current user
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <section className="clothes-section">
      {userItems.length === 0 ? (
        <p className="clothes-section__empty">
          You haven’t added any items yet.
        </p>
      ) : (
        <ul className="clothes-section__items">
          {userItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default ClothesSection;
