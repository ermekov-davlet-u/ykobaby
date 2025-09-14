import { useTranslation } from "react-i18next";
import product from "../../public/allProd.png";
import product2 from "../../public/50god.png";
import product3 from "../../public/zx3.png";
import product4 from "../../public/money.png";
import product5 from "../../public/whitePhotoroom (6).png";
import product6 from "../../public/whitePhotoroom.png";
import product7 from "../../public/phone.png";
import product8 from "../../public/lg tv.png";
import product9 from "../../public/dyson.png";

const products = [
  { img: product, textKey: "xz31" },
  { img: product2, textKey: "xz32" },
  { img: product3, textKey: "xz33" },
  { img: product4, textKey: "xz34" },
  { img: product5, textKey: "xz35" },
  { img: product6, textKey: "xzx36" },
  { img: product7, textKey: "xz35" },
  { img: product8, textKey: "xz35" },
  { img: product9, textKey: "xz35" },
];

const ProductShowcaseGrid = () => {
  const { t } = useTranslation();

  return (
    <section
      style={{
        background: "rgba(255,255,255,0.18)",
        backdropFilter: "blur(12px)",
        borderRadius: "32px",
        boxShadow: "0 8px 40px 0 rgba(99,102,241,0.18)",
        border: "1.5px solid rgba(99,102,241,0.10)",
        margin: "32px 0",
        padding: "48px 0 32px 0",
      }}
    >
      <style>{`
        .psg-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
        }
        .psg-title {
          font-size: 1.4rem;
          display: block;
          font-weight: 800;
          color: #ffffffff;
          // margin-bottom: 36px;
          padding: 28px 0;
          text-align: center;
          letter-spacing: 0.01em;
          text-shadow: 0 2px 16px rgba(99,102,241,0.10);
        }
        .psg-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 36px;
        }
        .psg-card {
          background: rgba(255,255,255,0.85);
          border-radius: 22px;
          box-shadow: 0 4px 24px rgba(99,102,241,0.10);
          padding: 26px 18px 22px 18px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 1.5px solid rgba(99,102,241,0.08);
          backdrop-filter: blur(2px);
          transition: box-shadow 0.3s, transform 0.3s;
          cursor: pointer;
        }
        .psg-card:hover {
          box-shadow: 0 8px 32px rgba(99,102,241,0.18);
          transform: scale(1.06) rotate(-1deg);
          background: rgba(255,255,255,0.97);
        }
        .psg-card-img {
          width: 100%;
          max-width: 140px;
          height: 120px;
          object-fit: contain;
          border-radius: 16px;
          margin-bottom: 18px;
          background: linear-gradient(120deg,#f1f5f9 60%,#e0e7ff 100%);
          box-shadow: 0 2px 8px rgba(99,102,241,0.06);
        }
        .psg-card-text {
          color: #3730a3;
          font-size: 1.13rem;
          font-weight: 600;
          margin-top: 10px;
          text-shadow: 0 1px 8px rgba(99,102,241,0.06);
        }
        @media (max-width: 1100px) {
          .psg-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 800px) {
          .psg-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 500px) {
          .psg-title { font-size: 1.3rem; margin-bottom: 18px; }
          .psg-grid { grid-template-columns: 1fr; gap: 18px; }
          .psg-card { padding: 10px 4px 10px 4px; }
          .psg-card-img { max-width: 90px; height: 70px; }
        }
      `}</style>
      <div className="psg-container">
        {/* <div className="psg-title">{t("xz10")}</div> */}
        <span
          className="psg-title"
          dangerouslySetInnerHTML={{ __html: t("xz10") }}
        ></span>
        <div className="psg-grid">
          {products.map((prod, idx) => (
            <div className="psg-card" key={idx}>
              <img src={prod.img} alt="" className="psg-card-img" />
              <div className="psg-card-text">{t(prod.textKey)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseGrid;