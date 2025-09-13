import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div
        style={{
          maxWidth: "100%",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "16px",
          background: "#5b40b1",
          minHeight: "150px",
        }}
      >
        <span
          style={{
            textAlign: "center",
            maxWidth: "1100px",
            padding: "30px",
          }}
        >
          {t("xz15")}
        </span>
      </div>
      {/* <div
        style={{
          maxWidth: "100%",
          minHeight: "45px",
          background: "#A393EB",
        }}
      ></div> */}
    </div>
  );
};

export default Footer;
