import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";

function ClothesSection({
  clothingItems,
  onCardClick,
  onCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  // ✅ Only show items owned by the logged-in user on the profile page
  const myItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="clothes-section__items">
      {myItems.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          isLoggedIn={isLoggedIn} // ✅ show like button if logged-in
        />
      ))}
    </div>
  );
}

export default ClothesSection;
