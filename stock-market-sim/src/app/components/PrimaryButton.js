"use client";
import styles from "@/app/styles/components/buttons.module.css";

export default function PrimaryButton({ color, children, onClick }) {
  return (
    <button
      className={`${styles["primary-button"]}`}
      onClick={onClick}
      style={{ backgroundColor: color || "gray" }}
    >
      {children}
    </button>
  );
}
