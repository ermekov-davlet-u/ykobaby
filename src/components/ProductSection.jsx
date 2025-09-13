import "../styles/ProductSection.css";
import product from "../../public/allProd.png";
import product2 from "../../public/50god.png";
import sakura from "../../public/Sakura-1.png";
import product3 from "../../public/zx3.png";
import product4 from "../../public/money.png";
import product5 from "../../public/whitePhotoroom (6).png";
import product6 from "../../public/whitePhotoroom.png";
import product7 from "../../public/phone.png";
import product8 from "../../public/lg tv.png";
import product9 from "../../public/dyson.png";

import { useTranslation } from "react-i18next";

const ProductSection = () => {
  const { t } = useTranslation();

  return (
    <>
      <div id="2" className="wrap_block_4">
        {/* <div className="sakura11">
          <img src={sakura} alt="" />
        </div> */}
        <span
          className="wrap_block_4_title"
          dangerouslySetInnerHTML={{ __html: t("xz10") }}
        ></span>
        <div className="wrap_block_4_wrap">
          <div className="wrap_block_wrap">
            <div className="wrap_block_img">
              <img src={product} alt="" />
            </div>
            <div className="wrap_border"></div>

            <span className="wrap_block_p">
              {/* <b className="wrap_block_b">{t("xz26")}</b> <br /> */}
              {t("xz31")}
            </span>
          </div>
          <div className="wrap_block_wrap">
            <div className="wrap_block_img">
              <img src={product2} alt="" />
            </div>
            <div className="wrap_border"></div>
            <span className="wrap_block_p">
              {/* <b className="wrap_block_b">{t("xz27")}</b> <br /> */}
              {t("xz32")}
            </span>
          </div>
          <div className="wrap_block_wrap">
            <div className="wrap_block_img">
              <img src={product3} alt="" />
            </div>
            <div className="wrap_border"></div>
            <span className="wrap_block_p">
              {/* <b className="wrap_block_b">{t("xz28")}</b> <br /> */}
              {t("xz33")}
            </span>
          </div>
          <div className="wrap_block_wrap">
            <div className="wrap_block_img">
              <img className="block_img" src={product4} alt="" />
            </div>
            <div className="wrap_border"></div>
            <span className="wrap_block_p">
              {/* <b className="wrap_block_b">{t("xz29")}</b> <br /> */}
              {t("xz34")}
            </span>
          </div>
          <div className="wrap_block_wrap">
            <div className="wrap_block_img">
              <img className="imgDD" src={product5} alt="" />
            </div>
            <div className="wrap_border"></div>
            <span className="wrap_block_p">
              {/* <b className="wrap_block_b">{t("xz30")}</b> <br /> */}
              {t("xz35")}
            </span>
          </div>
          <div className="wrap_block_wrap">
            <div className="wrap_block_img">
              <img className="imgDD" src={product6} alt="" />
            </div>
            <div className="wrap_border"></div>
            <span className="wrap_block_p">
              {/* <b className="wrap_block_b">{t("xz30")}</b> <br /> */}
              {t("xzx36")}
            </span>
          </div>
          <div className="wrap_block_wrap">
            <div className="wrap_block_img">
              <img className="imgDD" src={product7} alt="" />
            </div>
            <div className="wrap_border"></div>
            <span className="wrap_block_p">
              {/* <b className="wrap_block_b">{t("xz30")}</b> <br /> */}
              {t("xz35")}
            </span>
          </div>
          <div className="wrap_block_wrap">
            <div className="wrap_block_img">
              <img className="imgDD" src={product8} alt="" />
            </div>
            <div className="wrap_border"></div>
            <span className="wrap_block_p">
              {/* <b className="wrap_block_b">{t("xz30")}</b> <br /> */}
              {t("xz35")}
            </span>
          </div>
          <div className="wrap_block_wrap">
            <div className="wrap_block_img">
              <img className="imgDD" src={product9} alt="" />
            </div>
            <div className="wrap_border"></div>
            <span className="wrap_block_p">
              {/* <b className="wrap_block_b">{t("xz30")}</b> <br /> */}
              {t("xz35")}
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#0f1551",
              color: "white",
              fontWeight: 700,
              fontSize: "2rem",
            }}
          >
            <div class="shine" style={{ padding: 14 }}>
              5 Автомобилей
            </div>
            <div style={{ fontSize: "36px", padding: 24 }}>KIA MORNING</div>
          </div>
          <div style={{ maxWidth: "50%" }}>
            <img src="/public/car14.png" alt="" style={{ maxWidth: "100%" }} />
          </div>
        </div>
        <div className="wrap_block_warning_block">
          {/* Используем dangerouslySetInnerHTML для корректного отображения HTML в переводе */}
          <span
            className="wrap_block_warning"
            dangerouslySetInnerHTML={{ __html: t("xz11") }}
          ></span>
        </div>
      </div>
    </>
  );
};

export default ProductSection;
