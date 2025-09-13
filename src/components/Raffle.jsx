import { useState, useEffect } from "react";
import CustomButton from "./CustomButton";
import cars2 from "../../public/cars.png";
import "../styles/Raffle.css";
import { useTranslation } from "react-i18next";
import sakura from "../../public/fire.png";

const Raffle = ({ openAuthModal }) => {
  const { t } = useTranslation();
  const calculateTimeLeft = () => {
    const difference = +new Date("2025-02-03") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTimeUnit = (value, unit) => {
    if (value === 1) {
      return `${value} ${unit[0]}`; // единственное число
    } else if (value >= 2 && value <= 4) {
      return `${value} ${unit[1]}`; // множественное число 2-4
    } else {
      return `${value} ${unit[2]}`; // множественное число 5 и больше
    }
  };

  const timerComponents = [];
  const russianUnits = {
    days: ["день", "дня", "дней"],
    hours: ["час", "часа", "часов"],
    minutes: ["минута", "минуты", "минут"],
    seconds: ["секунда", "секунды", "секунд"],
  };

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <div key={interval} className="timer-circle fancy">
        <span className="timer-value">{timeLeft[interval]}</span>
        <span className="timer-label">
          {formatTimeUnit(timeLeft[interval], russianUnits[interval])}
        </span>
      </div>
    );
  });

  return (
    <>
      <div className="raffle-block_wrap">
        {/* <div className="sakura5">
          <img src={sakura} alt="" />
        </div> */}
        <div className="raffle-block_text">
          <span
            className="raffle-block_title"
            dangerouslySetInnerHTML={{ __html: t("xz14") }}
          ></span>
          <div className="timer-container">
            {timerComponents.length ? (
              timerComponents
            ) : (
              <span>Время вышло!</span>
            )}
          </div>
          <span
            className="raffle-block_p1"
            dangerouslySetInnerHTML={{ __html: t("xz1") }}
          ></span>
          <CustomButton
            bgColor="#cc3433"
            textColor="#ffffff"
            text={t("xz16")}
            disabled={false}
            onClick={openAuthModal}
          />
          <span style={{ fontWeight: "600", color: "rgb(255,255,255)" }}>
            {t("xz36")}
          </span>
        </div>
        <div className="block_1_img2">
          <img src={cars2} alt="" />
        </div>
        {/* <div className="sakura11">
          <img src={sakura} alt="" />
        </div> */}
      </div>
    </>
  );
};

export default Raffle;
