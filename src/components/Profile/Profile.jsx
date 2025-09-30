import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  clothingItems,
  onCardClick,
  onAddClick,
  onEditProfile,
  onSignOut,
  onCardLike, // ✅ pass through
  isLoggedIn, // ✅ pass through
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
          onCardLike={onCardLike} // ✅ like support
          isLoggedIn={isLoggedIn} // ✅ like visibility
        />
      </div>
    </div>
  );
}

export default Profile;
