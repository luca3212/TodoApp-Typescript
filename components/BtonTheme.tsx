import React, { useState, useEffect } from "react";
import Moon from "./icon/Moon";
import Sun from "./icon/Sun";
import styles from "@/styles/btonTheme.module.scss";

export default function BtonTheme() {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={styles.containBton}>
      <button onClick={toggleTheme}>
        {theme === "light" ? <Moon /> : <Sun />}
      </button>
    </div>
  );
}
