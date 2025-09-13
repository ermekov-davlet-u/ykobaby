import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import CustomSlider from "./CustomSlider";
import Header from "./Header";
import Main from "./Main";
import ProductSection from "./ProductSection";
// import Slider from "./Slider";
import Raffle from "./Raffle";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";
import AuthModal from "./AuthModal";
import RegisterCodeModal from "./RegisterCodeModal";
import { useState, useEffect } from "react";
import "../styles/MainPage.css";
import CustomButton from "./CustomButton";
import ModalWindow from "./ModalWindow";

function MainPage() {
  const { t } = useTranslation();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRegisterCodeModalOpen, setIsRegisterCodeModalOpen] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    // Получение данных из куки
    const savedPhone = Cookies.get("userPhone");
    const promo = new URLSearchParams(window.location.search).get("promo_code");
    const shouldShowRegisterModal = Cookies.get("shouldShowRegisterModal");

    // Устанавливаем номер телефона, если он есть в куки
    if (savedPhone) {
      setUserPhone(savedPhone);
    }

    // Открытие модального окна регистрации кода, если параметр promo_code есть в URL
    if (promo) {
      location.reload();
      setIsRegisterCodeModalOpen(true);
    }

    // Открываем RegisterCodeModal, если флаг в куки установлен
    if (shouldShowRegisterModal) {
      location.reload();
      setIsRegisterCodeModalOpen(true);
      // Удаляем куку после открытия, чтобы предотвратить повторное открытие
      Cookies.remove("shouldShowRegisterModal");
    }
  }, []);

  const openAuthModal = () => {
    const savedPhone = Cookies.get("userPhone");
    if (savedPhone) {
      setIsRegisterCodeModalOpen(true);
    } else {
      // Иначе открываем окно авторизации
      setIsAuthModalOpen(true);
    }
  };
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const handleAuthSuccess = (phone) => {
    setUserPhone(phone);
    Cookies.set("userPhone", phone, { expires: 7 });
    Cookies.set("shouldShowRegisterModal", "true", { expires: 1 }); // Устанавливаем флаг
    setIsAuthModalOpen(false);
  };

  const closeRegisterCodeModal = () => setIsRegisterCodeModalOpen(false);

  // Обработка выхода пользователя
  const handleLogout = () => {
    Cookies.remove("userName");
    Cookies.remove("userPhone");
    setUserPhone(""); // Сбросим номер телефона
    // Дополнительные действия при выходе, если необходимо
  };

  // const sliderData = [
  //   { img: "../../public/zx5.png", title: "Slide 1" },
  //   { img: "../../public/zx5.png", title: "Slide 2" },
  //   { img: "../../public/zx5.png", title: "Slide 3" },
  //   { img: "../../public/zx5.png", title: "Slide 4" },
  //   { img: "../../public/zx5.png", title: "Slide 5" },
  // ];

  // Упорядоченные изображения для Yokobaby
  const yokobabyImages = [
    "/slide1.png",
    "/2.webp",
    "/3.webp",
    "/4.webp",
    "/5.webp",
    "/6.webp",
    "/7.webp",
    "/8.webp",
    "/9.webp",
    "/10.webp",
    "/11.webp",
    "/12.webp",
    "/13.webp",
    "/14.webp",
    "/15.webp",
    "/16.webp",
    "/17.webp",
  ];

  // Упорядоченные изображения для Super Premium
  const superPremiumImages = [
    "/web2.png",
    "/2_2.webp",
    "/2_3.webp",
    "/2_4.webp",
    "/2_5.webp",
    "/2_6.webp",
    "/2_7.webp",
    "/2_8.webp",
    "/2_9.webp",
    "/2_10.webp",
    "/2_11.webp",
    "/2_12.webp",
    "/2_13.webp",
    "/2_14.webp",
    "/2_15.webp",
  ];

  const ultraThinImages = [
    "/web3.png",
    "/3_2.webp",
    "/3_3.webp",
    "/3_4.webp",
    "/3_5.webp",
    "/3_6.webp",
    "/3_7.webp",
    "/3_8.webp",
    "/3_9.webp",
    "/3_10.webp",
    "/3_11.webp",
    "/3_12.webp",
    "/3_13.webp",
    "/3_14.webp",
    "/3_15.webp",
  ];

  return (
    <>
      <Header onLogout={handleLogout} openAuthModal={openAuthModal} />

      <Main openAuthModal={openAuthModal} />

      <ProductSection />
      {/* <center
        id="4"
        className="slider_title"
        dangerouslySetInnerHTML={{
          __html: t("xz12"),
        }}
      ></center> */}
      <div className="slider_title slider_title_new">{t("xzx12")}</div>
      <div className="slider-container">
        <CustomSlider
          images={yokobabyImages}
          imageWidth="360px"
          imageHeight="400px"
          label={"ПОДГУЗНИКИ И ТРУСИКИ YOKOBABY"}
        />

        <CustomSlider
          images={superPremiumImages}
          imageWidth="360px"
          imageHeight={"400px"}
          label={"ПОДГУЗНИКИ И ТРУСИКИ YOKOBABY SPECIAL CARE"}
        />
        <CustomSlider
          images={ultraThinImages}
          imageWidth="360px"
          imageHeight={"400px"}
          label={"ПОДГУЗНИКИ И ТРУСИКИ YOKOBABY ULTRA THIN"}
        />
      </div>

      {/* <span id="3" className="xz-slider_text">
        {t("winners")}
      </span>
      <center onClick={handleOpenModal}>
        <CustomButton bgColor="#CC3433" textColor="#ffffff" text={t("xz17")} />
      </center> */}
      <ModalWindow open={isModalOpen} onClose={handleCloseModal} />
      {/* <Slider images={sliderData} direction={"left"} /> */}
      <Raffle openAuthModal={openAuthModal} />
      <Footer />
      <ScrollToTopButton />

      <AuthModal
        show={isAuthModalOpen}
        handleClose={closeAuthModal}
        onAuthSuccess={handleAuthSuccess}
      />
      <RegisterCodeModal
        show={isRegisterCodeModalOpen}
        handleClose={closeRegisterCodeModal}
        phone={userPhone}
      />
    </>
  );
}

export default MainPage;
