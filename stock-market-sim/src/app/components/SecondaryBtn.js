"use client";
import styles from "@/app/styles/components/buttons.module.css";

export default function SecondaryButton({ children, onClick, selected }) {
  return (
    <button
      className={`${styles["secondary-button"]} ${
        selected ? styles.selected : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
