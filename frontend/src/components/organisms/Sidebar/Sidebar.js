import React from "react";
import User_Sidebar from "./User_Sidebar";
import Admin_Sidebar from "./Admin_Sidebar";

function Sidebar({ isAdmin }) {
  if (isAdmin) {
    return <Admin_Sidebar />;
  } else {
    return <User_Sidebar />;
  }
}

export default Sidebar;
