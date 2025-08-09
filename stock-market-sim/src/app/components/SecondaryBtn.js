"use client";
import styles from "@/app/styles/components/buttons.module.css";

export default function SecondaryButton({ children, onClick }) {
  return (
    <button className={styles["secondary-button"]} onClick={onClick}>
      {children}
    </button>
  );
}
