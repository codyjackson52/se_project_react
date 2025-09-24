import { useContext } from "react";
import "./Sidebar.css";
import avatar from "../../assets/avatar.png";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img
          src={currentUser?.avatar || avatar}
          alt="User avatar"
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser?.name || "User"}</p>
      </div>

      <div className="sidebar__actions">
        <button className="sidebar__button" onClick={onEditProfile}>
          Edit Profile
        </button>
        <button className="sidebar__button" onClick={onSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
