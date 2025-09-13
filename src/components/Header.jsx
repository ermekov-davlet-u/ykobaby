import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/Header.css";
import baby from "../../public/logo.png";
import FAQModal from "./FAQModal";
import WinnersModal from "./WinnersModal";
import Cookies from "js-cookie";

function Header({ onLogout, openAuthModal }) {
  // Добавляем пропс onLogout
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);
  const [isWinnersModalOpen, setIsWinnersModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Состояние для dropdown

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openFAQModal = () => {
    setIsFAQModalOpen(true);
  };

  const closeFAQModal = () => {
    setIsFAQModalOpen(false);
  };
  const openWinnersModal = () => {
    setIsWinnersModalOpen(true);
  };
  const closeWinnersModal = () => {
    setIsWinnersModalOpen(false);
  };

  const getUserNameFromCookie = () => {
    const encodedName = Cookies.get("userName");
    return encodedName ? decodeURIComponent(encodedName) : "";
  };
  const userName = getUserNameFromCookie();

  const rulesLink =
    currentLanguage === "ky" ? "/pravila_kg.pdf" : "/pravila.pdf";

  const fontSize = currentLanguage === "ru" ? "1.2rem" : "1rem"; // Добавляем условие для шрифта

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    Cookies.remove("userName");
    Cookies.remove("userPhone");
    onLogout(); // Вызов функции обратного вызова
  };

  return (
    <div className="header_wrap">
      <div className="header">
        <div className="logo">
          <div>
            <a href="/">
              <img src={baby} alt="" />
            </a>
          </div>
        </div>
        <div className={`links ${isMenuOpen ? "active" : ""}`}>
          <a className="link" href="/#1" style={{ fontSize }}>
            {t("xz19")}
          </a>
          <a className="link" href="/#2" style={{ fontSize }}>
            {t("xz20")}
          </a>
          <a className="link" onClick={openWinnersModal} href="/#3" style={{ fontSize }}>
            {t("xz21")}
          </a>
          <a className="link" href="/#4" style={{ fontSize }}>
            {t("xz22")}
          </a>
          <span className="link" onClick={openFAQModal} style={{ fontSize }}>
            {t("xz23")}
          </span>
          <a
            className="link"
            href={rulesLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize }}
          >
            {t("xz24")}
          </a>
          <span
            onClick={() => changeLanguage("ky")}
            className={`link ${currentLanguage === "ky" ? "active" : ""}`}
            style={{ fontSize }}
          >
            KG
          </span>
          <span
            onClick={() => changeLanguage("ru")}
            className={`link ${currentLanguage === "ru" ? "active" : ""}`}
            style={{ fontSize }}
          >
            RU
          </span>
          {!userName && (
            <span
              className="link"
              onClick={openAuthModal}
              style={{ color: "white", cursor: "pointer", fontSize }}
            >
              {t("xz81")}
            </span>
          )}
          {userName && (
            <div className="dropdown">
              <span
                style={{
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize,
                }}
                onClick={handleDropdownToggle}
              >
                {userName}{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-caret-down-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </span>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <a className="link" href="/cabinet" style={{ fontSize }}>
                    {t("xz37")}
                  </a>
                  <a
                    className="link"
                    style={{ color: "white", cursor: "pointer", fontSize }}
                    onClick={handleLogout}
                  >
                    Выход
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        <div
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
      <div className="line">
        <a href="tel:08001118080" className="line_text">
          {t("xz18")}
        </a>
      </div>
      <FAQModal open={isFAQModalOpen} handleClose={closeFAQModal} />
      <WinnersModal open={isWinnersModalOpen} handleClose={closeWinnersModal} />
    </div>
  );
}

export default Header;
