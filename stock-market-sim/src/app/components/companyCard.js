import style from "../styles/components/companyCard.module.css";
import Image from "next/image";

export default function CompanyCard({ company }) {
  return (
    <button className={style.card + "flexCenter"}>
      <Image
        src={company.logo}
        alt={company.name}
        className={style.logo}
        width={64}
        height={64}
      />
      <div className="flexColumn">
        <h2 className={style.companySymbol}>{company.symbol}</h2>

        <h1 className={style.companyName}>{company.name}</h1>
      </div>
      <div className={`flexCenter flexColumn ${style.priceContainer}`}>
        <h2 className={style.stockPrice}>{company.price}</h2>
        <div className={`flexRow flexCenter`}>
          <Image
            src="/svg/icons/profitIcon.svg"
            alt="Change Icon"
            className={style.changeIcon}
            width={16}
            height={16}
          />
          <p className={style.stockChange}>{company.change}</p>
        </div>
      </div>
    </button>
  );
}
