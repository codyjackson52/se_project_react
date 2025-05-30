import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ clothingItems, onCardClick }) {
  return (
    <div className="clothes-section__items">
      {clothingItems.map((item) => (
        <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
      ))}
    </div>
  );
}

export default ClothesSection;
