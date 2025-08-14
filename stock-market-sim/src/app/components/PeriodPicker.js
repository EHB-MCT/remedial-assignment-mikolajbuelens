"use client";

import SecondaryBtn from "./SecondaryBtn";
import styles from "@/app/styles/components/buttons.module.css";

export default function PeriodPicker({ onPeriodChange, selectedPeriod }) {
  const periods = ["1D", "1W", "1M", "1Y"];

  return (
    <div className={styles["secondary-button-group"]}>
      {periods.map((period) => (
        <SecondaryBtn
          key={period}
          onClick={() => onPeriodChange(period)}
          selected={selectedPeriod === period}
        >
          {period}
        </SecondaryBtn>
      ))}
    </div>
  );
}
