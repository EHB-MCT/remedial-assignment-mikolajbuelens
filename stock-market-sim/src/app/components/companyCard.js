"use client";

import style from "../styles/components/companyCard.module.css";
import Image from "next/image";

export default function CompanyCard({ company, setSelectedCompany }) {
  return (
    <button
      className={`${style.card} ${company.selected ? style.selected : ""}`}
      onClick={() => setSelectedCompany(company)}
    >
      <Image
        src={"/img/stocks/" + company.logo}
        alt={company.name}
        className={style.logo}
        width={34}
        height={34}
      />
      <div className="flexColumn">
        <h2 className={style.companySymbol}>{company.symbol}</h2>

        <h1 className={style.companyName}>{company.name}</h1>
      </div>
      <div className={`flexCenter flexColumn ${style.priceContainer}`}>
        <div className="flexRow flexCenter">
          <h2 className={style.stockPrice}>{company.price} </h2>{" "}
          <small className={style.stockCurrency}>USD</small>
        </div>
      </div>
    </button>
  );
}
