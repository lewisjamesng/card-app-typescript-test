import { faBolt, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useThemeContext } from "../styles/ThemeProvider";
import { darkModeStyles } from "../styles/themes";

export default function NavBar() {
  const { darkMode, toggleDarkMode } = useThemeContext();
  const styles = darkModeStyles(darkMode);

  return (
    <nav className={`flex justify-between items-center p-4 transition ${styles.bgColor}`}>
      <div className="flex-grow flex justify-center">
        <NavLink className={`m-3 p-4 text-xl rounded-md font-medium text-white ${styles.buttonEditBgColor}`} to={"/"}>
          All Entries
        </NavLink>
        <NavLink
          className={`m-3 p-4 text-xl rounded-md font-medium text-white ${styles.buttonEditBgColor}`}
          to={"/create"}
        >
          New Entry
        </NavLink>
      </div>
      <button
        className={`m-3 py-4 px-5 text-xl rounded-md font-medium text-white w-16 h-16 ${styles.buttonEditBgColor}`}
        onClick={toggleDarkMode}
      >
        <FontAwesomeIcon
          style={{ transform: darkMode ? "rotate(360deg)" : "rotate(0deg)", transition: "transform 0.5s ease-in-out" }}
          icon={darkMode ? faBolt : faMoon}
        />
      </button>
    </nav>
  );
}
