import "./Sidebar.css";

import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img src={avatar} alt="User avatar" className="sidebar__avatar" />
        <p className="sidebar__username">Terrence Tegenge</p>
      </div>
    </div>
  );
}

export default SideBar;
