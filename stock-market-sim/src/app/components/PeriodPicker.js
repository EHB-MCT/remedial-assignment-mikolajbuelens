"use client";

import SecondaryBtn from "./SecondaryBtn";
import styles from "@/app/styles/components/buttons.module.css";

export default function PeriodPicker({ onPeriodChange }) {
  const periods = ["1D", "1W", "1M", "3M", "6M", "1Y", "5Y"];

  return (
    <div className={styles["secondary-button-group"]}>
      {periods.map((period) => (
        <SecondaryBtn key={period} onClick={() => onPeriodChange(period)}>
          {period}
        </SecondaryBtn>
      ))}
    </div>
  );
}
