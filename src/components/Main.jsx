import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "../styles/Main.css";
import CustomButton from "./CustomButton";
import AuthModal from "./AuthModal";
import RegisterCodeModal from "./RegisterCodeModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import cars2 from "../../public/car14.png";
import phone from "../../public/zzzzzzz.png";
import img1 from "../../public/qwerty1.png";
import img2 from "../../public/qwerty2.png";
import img3 from "../../public/qrcode.png";
import img4 from "../../public/qwerty3.png";
import arrow from "../../public/arr1.png";
import arrow2 from "../../public/arrow2.svg";
import sakura from "../../public/Sakura-1.png";
import sakura5 from "../../public/Sakura-1.png";
import sakura2 from "../../public/Sakura-3.png";
import yokoEn from "../../public/title_yoko.svg"; // Английская версия
import yokoKg from "../../public/title_yoko_kg.svg"; // Кыргызская версия
import { useTranslation } from "react-i18next";

const Main = ({ openAuthModal }) => {
  const { t, i18n } = useTranslation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRegisterCodeModalOpen, setIsRegisterCodeModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [userPhone, setUserPhone] = useState("");

  // Состояние для логотипа в зависимости от языка
  const [yokoLogo, setYokoLogo] = useState(yokoEn);

  useEffect(() => {
    // Проверяем наличие номера телефона в куках при загрузке компонента
    const savedPhone = Cookies.get("userPhone");
    if (savedPhone) {
      setUserPhone(savedPhone);
    }

    // Обновление логотипа при смене языка
    setYokoLogo(i18n.language === "ky" ? yokoKg : yokoEn);
  }, [i18n.language]);

  // const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const handleAuthSuccess = (phone) => {
    setTimeout(() => {
      setUserPhone(phone);
      Cookies.set("userPhone", phone, { expires: 7 }); // Сохраняем телефон в куки
      setIsAuthModalOpen(false);
      location.reload();
      setIsRegisterCodeModalOpen(true); // Открываем окно регистрации кода после успешной авторизации
    }, 3000);
  };

  const closeRegisterCodeModal = () => setIsRegisterCodeModalOpen(false);
  const openForgotPasswordModal = () => setIsForgotPasswordModalOpen(true);
  const closeForgotPasswordModal = () => setIsForgotPasswordModalOpen(false);

  // Измененный обработчик нажатия на кнопку
  const handleButtonClick = () => {
    const savedPhone = Cookies.get("userPhone");
    if (savedPhone) {
      setIsRegisterCodeModalOpen(true);
    } else {
      // Иначе открываем окно авторизации
      setIsAuthModalOpen(true);
    }

    // setIsAuthModalOpen(true);
  };

  return (
    <div className="container1">
      <div className="block_wrap">
        {/* <div className="sakura">
          <img src={sakura} alt="" />
        </div>
        <div className="sakura11">
          <img src={sakura} alt="" />
        </div>
        <div className="sakura2">
          <img src={sakura2} alt="" />
        </div> */}

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
        <div
          className="block_1_img"
          style={{
            // width: "50vw",
            zIndex: 9,
          }}
        >
          <img src={cars2} alt="" />
        </div>
      </div>

      {/* <div className="block_2_cont">
        <div className="block_2">
          <span className="block_2_title">{t("xz2")}</span>
          <span className="block_2_p">{t("xz3")}</span>
        </div>
      </div> */}
      {/* <center className="h1 hh">{t("xz25")}</center> */}
      <div className="shiner">
        <div id="1" className="block_3">
          <span className="block_3_text">{t("xz4")}</span>
          <div className="block_3_xz">
            <span>{t("xz5")}</span>
          </div>
        </div>

        <div className="container2">
          <div className="step1">
            <div>
              <img
                style={{ width: "100%", height: "100%" }}
                src={img1}
                alt="Step 1"
              />
            </div>
            {/* <span>
            <span
              dangerouslySetInnerHTML={{
                __html: t("xz6"),
              }}
            />
          </span> */}
            <div>
              Купи подгузники или трусики Yokobaby в промо упаковке со стикером
            </div>
          </div>

          <div className="div">
            <img style={{ width: "100%", height: "100%" }} src={arrow} alt="" />
          </div>
          <div className="step2">
            <div>
              <img
                style={{ width: "100%", height: "100%" }}
                src={img2}
                alt="Step 2"
              />
            </div>
            {/* <span
            dangerouslySetInnerHTML={{
              __html: t("xz7"),
            }}
          /> */}
            <div>
              Найди скрэтч карту с уникальным кодом внутри упаковки и сотри
              защитный слой
            </div>
          </div>

          {/*
         <div className="arr_wrap">
          <img style={{ width: "100%", height: "100%" }} src={arrow2} alt="" />
        </div>
        <div className="step3">
          <div>
            <img
              style={{ width: "100%", height: "100%" }}
              src={img3}
              alt="QR Code"
            />
          </div>
          <span
            style={{ width: "175px" }}
            dangerouslySetInnerHTML={{
              __html: t("xz8"),
            }}
          />
        </div> 
        */}

          <div className="div2">
            <img style={{ width: "100%", height: "100%" }} src={arrow} alt="" />
          </div>
          <div className="step4">
            <div>
              <img
                style={{ width: "100%", height: "100%" }}
                src={img4}
                alt="Step 4"
              />
            </div>
            {/* <span
            style={{ padding: "20px" }}
            dangerouslySetInnerHTML={{ __html: t("xz9") }}
          ></span> */}
            <span>Зарегистрируй промо-код на сайте yokobaby-promo.kg</span>
          </div>
        </div>
      </div>

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
      {/* <div className="volna">
        <div className="sakura51">
          <img src={sakura5} alt="" />
        </div>
      </div> */}
    </div>
  );
};

export default Main;
