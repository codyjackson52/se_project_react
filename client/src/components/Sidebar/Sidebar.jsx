import "./Sidebar.css";
import avatar from "../../assets/avatar.png";
import { useContext } from "react";
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
        <p className="sidebar__username">{currentUser?.name || "Username"}</p>
      </div>
      <button className="sidebar__edit-button" onClick={onEditProfile}>
        Edit Profile
      </button>
      <button className="sidebar__signout-button" onClick={onSignOut}>
        Sign out
      </button>
    </div>
  );
}

export default SideBar;
