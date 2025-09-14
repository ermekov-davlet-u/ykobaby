import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import CustomSlider from "./CustomSlider";
import Main from "./Main";
import ProductSection from "./ProductSection";
import Raffle from "./Raffle";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";
import AuthModal from "./AuthModal";
import RegisterCodeModal from "./RegisterCodeModal";
import { useState, useEffect, useRef } from "react";
import "../styles/MainPage.css";
import CustomButton from "./CustomButton";
import ModalWindow from "./ModalWindow";
import Header from "./Header";

function MainPage() {
  const { t } = useTranslation();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRegisterCodeModalOpen, setIsRegisterCodeModalOpen] = useState(false);
  const [userPhone, setUserPhone] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const [showVideo, setShowVideo] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("mainFon.mp4");
  const scrollTimeoutRef = useRef(null);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  // Отслеживаем скролл
  useEffect(() => {
    const handleScroll = () => {
      // Очищаем таймер остановки скролла
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Значительный скролл → больше половины экрана
      if (scrollY > viewportHeight / 2) {
        setShowVideo(true);
      }

      // Меняем видео на второе, если скролл > 200vh
      if (scrollY >= viewportHeight * 2) {
        setCurrentVideo("severFon.mp4");
      } else {
        setCurrentVideo("mainFon.mp4");
      }

      // Таймер: если скролл остановился → скрываем видео через 800ms
      scrollTimeoutRef.current = setTimeout(() => {
        setShowVideo(false);
      }, 800);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Авторизация и куки
  useEffect(() => {
    const savedPhone = Cookies.get("userPhone");
    const promo = new URLSearchParams(window.location.search).get("promo_code");
    const shouldShowRegisterModal = Cookies.get("shouldShowRegisterModal");

    if (savedPhone) setUserPhone(savedPhone);

    if (promo) {
      location.reload();
      setIsRegisterCodeModalOpen(true);
    }

    if (shouldShowRegisterModal) {
      location.reload();
      setIsRegisterCodeModalOpen(true);
      Cookies.remove("shouldShowRegisterModal");
    }
  }, []);

  const openAuthModal = () => {
    const savedPhone = Cookies.get("userPhone");
    if (savedPhone) {
      setIsRegisterCodeModalOpen(true);
    } else setIsAuthModalOpen(true);
  };
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const handleAuthSuccess = (phone) => {
    setUserPhone(phone);
    Cookies.set("userPhone", phone, { expires: 7 });
    Cookies.set("shouldShowRegisterModal", "true", { expires: 1 });
    setIsAuthModalOpen(false);
  };

  const closeRegisterCodeModal = () => setIsRegisterCodeModalOpen(false);

  const handleLogout = () => {
    Cookies.remove("userName");
    Cookies.remove("userPhone");
    setUserPhone("");
  };

  const yokobabyImages = ["/slide1.png", "/2.webp", "/3.webp"];
  const superPremiumImages = ["/web2.png", "/2_2.webp", "/2_3.webp"];
  const ultraThinImages = ["/web3.png", "/3_2.webp", "/3_3.webp"];

  return (
    <div className="mainpage-wrap">
      {/* Фоновое видео */}
      <video
        className={`mainpage-bg-video ${showVideo ? "visible" : ""}`}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={`../../public/${currentVideo}`} type="video/mp4" />
      </video>

      <Header onLogout={handleLogout} openAuthModal={openAuthModal} />
      <Main openAuthModal={openAuthModal} />
      <ProductSection />

      <div className="slider-wrap">
        <div className="slider_title slider_title_new">{t("xzx12")}</div>
        <div className="slider-container">
          <CustomSlider
            images={yokobabyImages}
            imageWidth="21vw"
            imageHeight="270px"
            label={"ПОДГУЗНИКИ YOKOBABY"}
          />
          <CustomSlider
            images={superPremiumImages}
            imageWidth="21vw"
            imageHeight="270px"
            label={"ПОДГУЗНИКИ SPECIAL CARE"}
          />
          <CustomSlider
            images={ultraThinImages}
            imageWidth="21vw"
            imageHeight="270px"
            label={"ULTRA THIN"}
          />
        </div>
      </div>

      <ModalWindow open={isModalOpen} onClose={handleCloseModal} />
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
    </div>
  );
}

export default MainPage;
