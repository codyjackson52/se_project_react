import "./Sidebar.css";
import avatar from "../../assets/avatar.png";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__user">
        <img
          src={currentUser?.avatar || avatar}
          alt="User avatar"
          className="sidebar__avatar"
        />
        <p className="sidebar__username">{currentUser?.name || "Username"}</p>
      </div>

      <button className="sidebar__link" onClick={onEditProfile}>
        Change profile data
      </button>
      <button className="sidebar__link" onClick={onSignOut}>
        Log out
      </button>
    </aside>
  );
}

export default SideBar;
