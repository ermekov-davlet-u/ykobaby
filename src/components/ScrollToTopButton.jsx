import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import "../styles/ScrollToTopButton.css";
import phone from "../../public/insta.svg"; 
import tg from "../../public/tg.svg"; 
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 1000) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="scroll-to-top">
      {/* Блок телефона всегда видим */}
      <div className="tg">
        <a
          target="_blank"
          href="https://t.me/Yokobaby_bot"
        >
          <img src={tg} alt="Phone" />
        </a>
      </div>
      <div className="phone">
        <a
          target="_blank"
          href="https://www.instagram.com/yokobaby.kgz?igsh=MWsxdnd2cnN5NzF4NQ=="
        >
          <img src={phone} alt="Phone" />
        </a>
      </div>
      {/* Кнопка скролла наверх видима только при прокрутке */}
      {isVisible && (
        <div onClick={scrollToTop} className="scroll-button">
          <FaArrowUp />
        </div>
      )}
    </div>
  );
};

export default ScrollToTopButton;
