import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "../styles/Main.css";
import CustomButton from "./CustomButton";
import AuthModal from "./AuthModal";
import RegisterCodeModal from "./RegisterCodeModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import cars2 from "../../public/car14.png";
import yokoEn from "../../public/title_yoko.svg";
import yokoKg from "../../public/title_yoko_kg.svg";
import step1img from "../../public/qwerty1.png";
import step2img from "../../public/qwerty2.png";
import step3img from "../../public/qwerty3.png";
import { useTranslation } from "react-i18next";

// Steps data
const steps = [
  {
    img: step1img,
    label: "Купи подгузники или трусики Yokobaby в промо упаковке со стикером",
  },
  {
    img: step2img,
    label: "Найди скрэтч карту с уникальным кодом внутри упаковки и сотри защитный слой",
  },
  {
    img: step3img,
    label: "Зарегистрируй промо-код на сайте yokobaby-promo.kg",
  },
];

// StepsPromo component
const StepsPromo = () => (
  <section
    style={{
      background: "linear-gradient(90deg, rgba(36,0,80,0.7) 0%, rgba(123,67,151,0.7) 100%)",
      borderRadius: 32,
      padding: "48px 0",
      margin: "32px 0",
      boxShadow: "0 8px 40px 0 rgba(99,102,241,0.18)",
      backdropFilter: "blur(8px)",
    }}
  >
    <style>{`
      .steps-container {
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        gap: 32px;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 16px;
        position: relative;
      }
      .step-block {
        background: rgba(255,255,255,0.08);
        border-radius: 24px;
        box-shadow: 0 4px 24px rgba(99,102,241,0.10);
        padding: 32px 18px 18px 18px;
        text-align: center;
        width: 260px;
        min-width: 180px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .step-num {
        position: absolute;
        top: -28px;
        left: 50%;
        transform: translateX(-50%);
        background: #e573c7;
        color: #fff;
        font-size: 2rem;
        font-weight: 700;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 12px rgba(229,115,199,0.18);
        border: 4px solid #fff;
        z-index: 2;
      }
      .step-img {
        width: 120px;
        height: 120px;
        object-fit: contain;
        margin-bottom: 18px;
        margin-top: 18px;
        border-radius: 16px;
        background: #fff;
        box-shadow: 0 2px 8px rgba(99,102,241,0.06);
      }
      .step-label {
        color: #fff;
        font-size: 1.07rem;
        font-weight: 500;
        margin-top: 10px;
        text-shadow: 0 1px 8px rgba(99,102,241,0.10);
      }
      .arrow {
        position: absolute;
        top: 50%;
        left: 100%;
        transform: translateY(-50%);
        width: 60px;
        height: 30px;
        z-index: 1;
        display: none;
      }
      .arrow svg {
        width: 100%;
        height: 100%;
      }
      .step-block:not(:last-child) .arrow {
        display: block;
      }
      @media (max-width: 900px) {
        .steps-container { flex-direction: column; align-items: center; gap: 56px; }
        .step-block { width: 90%; min-width: 0; }
        .arrow { display: none !important; }
        .step-num { top: -32px; }
      }
    `}</style>
    <div className="steps-container">
      {steps.map((step, idx) => (
        <div className="step-block" key={idx}>
          <div className="step-num">{idx + 1}</div>
          <img src={step.img} alt="" className="step-img" />
          <div className="step-label">{step.label}</div>
          {idx < steps.length - 1 && (
            <div className="arrow">
              <svg viewBox="0 0 60 30" fill="none">
                <path d="M5 15 Q30 0 55 15 Q30 30 5 15" stroke="#e573c7" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" />
                <defs>
                  <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#e573c7" />
                  </marker>
                </defs>
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  </section>
);

// Main component
const Main = ({ openAuthModal }) => {
  const { t, i18n } = useTranslation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRegisterCodeModalOpen, setIsRegisterCodeModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const [yokoLogo, setYokoLogo] = useState(yokoEn);

  useEffect(() => {
    const savedPhone = Cookies.get("userPhone");
    if (savedPhone) setUserPhone(savedPhone);
    setYokoLogo(i18n.language === "ky" ? yokoKg : yokoEn);
  }, [i18n.language]);

  const closeAuthModal = () => setIsAuthModalOpen(false);

  const handleAuthSuccess = (phone) => {
    setTimeout(() => {
      setUserPhone(phone);
      Cookies.set("userPhone", phone, { expires: 7 });
      setIsAuthModalOpen(false);
      location.reload();
      setIsRegisterCodeModalOpen(true);
    }, 3000);
  };

  const closeRegisterCodeModal = () => setIsRegisterCodeModalOpen(false);
  const openForgotPasswordModal = () => setIsForgotPasswordModalOpen(true);
  const closeForgotPasswordModal = () => setIsForgotPasswordModalOpen(false);

  const handleButtonClick = () => {
    const savedPhone = Cookies.get("userPhone");
    if (savedPhone) {
      setIsRegisterCodeModalOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <div className="container1">
      <div className="block_wrap">
        <div className="block_text">
          <div className="img_title_logo">
            <img className="img_title" src={yokoLogo} alt="" />
          </div>
          <span
            className="block_p1"
            dangerouslySetInnerHTML={{ __html: t("xz1") }}
          ></span>
          <span className="block_2_title">{t("xz2")}</span>
          <span className="block_2_p">{t("xz3")}</span>
          <CustomButton
            bgColor="#c162ad"
            textColor="#ffffff"
            text={t("xz16")}
            disabled={false}
            onClick={openAuthModal}
          />
        </div>
        <div className="block_1_img" style={{ zIndex: 9 }}>
          <img src={cars2} alt="" />
        </div>
      </div>

      {/* Блок с шагами */}
      <StepsPromo />

      {/* Модальные окна */}
      <AuthModal
        show={isAuthModalOpen}
        handleClose={closeAuthModal}
        onAuthSuccess={handleAuthSuccess}
        openForgotPasswordModal={openForgotPasswordModal}
      />
      <RegisterCodeModal
        show={isRegisterCodeModalOpen}
        handleClose={closeRegisterCodeModal}
        telephone={userPhone}
      />
      <ForgotPasswordModal
        show={isForgotPasswordModalOpen}
        handleClose={closeForgotPasswordModal}
      />
    </div>
  );
};

export default Main;