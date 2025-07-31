import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  clothingItems,
  onCardClick,
  onAddClick,
  onEditProfile,
  onSignOut,
}) {
  return (
    <div className="profile">
      <SideBar onEditProfile={onEditProfile} onSignOut={onSignOut} />
      <div className="profile__main">
        <div className="profile__header">
          <h2 className="profile__title">Your items</h2>
          <button className="profile__add-button" onClick={onAddClick}>
            + Add new
          </button>
        </div>
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
        />
      </div>
    </div>
  );
}

export default Profile;
