import {
  Modal,
  Typography,
  Box,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

function FAQModal({ open, handleClose }) {
  const { t } = useTranslation();
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: "#f9f9f9",
          borderRadius: "15px",
          maxWidth: 1200,
          maxHeight: "80vh", // Ограничиваем высоту модального окна
          margin: "auto",
          marginTop: "5%", // Центрирование модального окна по вертикали
          overflowY: "auto", // Вертикальный скролл для всего окна
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)", // Тень для эффекта
          position: "relative", // Для позиционирования кнопки закрытия
        }}
      >
        {/* Кнопка закрытия */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "grey.600",
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Заголовок */}
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "30px",
            color: "rgb(100,100,100)",
          }}
        >
          {t("xz82")}
        </Typography>

        {/* Аккордеон */}
        <Box sx={{ maxWidth: 1000, margin: "auto" }}>
          {[
            {
              question: `${t("xz38")}`,
              answer: `${t("xz39")}`,
            },
            {
              question: `${t("xz40")}`,
              answer: `${t("xz41")}`,
            },
            {
              question: `${t("xz42")}`, // "Что мне нужно сделать, чтобы принять участие?"
              answer: `${t("xz43")}`, // "Чтобы принять участие в акции, вам необходимо приобрести продукцию Yokobaby в упаковке с промо стикером, внутри которой находится скретч-карта с промокодом и пройти регистрацию."
            },
            {
              question: `${t("xz44")}`, // "Когда будут розыгрыши?"
              answer: `${t("xz45")}`, // "Даты розыгрышей: 19 ноября 2024 года, 17 декабря 2024 года, 3 Февраля 2025 года. Публикация результатов будет в течение 10 календарных дней с дат определения результатов."
            },
            {
              question: `${t("xz46")}`, // "Когда можно зарегистрировать код для участия в промо акции?"
              answer: `${t("xz47")}`, // "В срок с 15 октября 2024 года по 31 января 2025 года включительно."
            },
            {
              question: `${t("xz48")}`, // "Как я могу зарегистрировать код?"
              answer: `${t("xz49")}`,
            },
            {
              question: `${t("xz50")}`, // "Что делать, если не получается ввести корректно код со скретч карты?"
              answer: `${t("xz51")}`, // "Если код не работает, пожалуйста, проверьте его еще раз на наличие ошибок..."
            },
            {
              question: `${t("xz52")}`, // "Кто может принимать участие?"
              answer: `${t("xz53")}`, // "Участниками промо акции могут быть дееспособные граждане Кыргызской Республики..."
            },
            {
              question: `${t("xz54")}`, // "Какие продукты участвуют в промо акции?"
              answer: `${t("xz55")}`, // "В акции участвуют следующая продукция торговой марки YOKOBABY..."
            },
            {
              question: `${t("xz56")}`, // "Где я могу приобрести продукцию участвующую в промо акции?"
              answer: `${t("xz57")}`, // "Продукцию участвующую в промо акции можно купить в сети супермаркетов..."
            },
            {
              question: `${t("xz58")}`, // "Что такое промо-упаковка продукта?"
              answer: `${t("xz59")}`, // "Промо Упаковкой считается 1 (Одна) единица товара..."
            },
            {
              question: `${t("xz60")}`, // "Что такое код? Где я могу его найти?"
              answer: `${t("xz61")}`, // "Код - это девятизначный цифровой номер, который расположен НА СКРЕТЧ КАРТЕ..."
            },
            {
              question: `${t("xz62")}`, // "Нужно ли сохранить промо-упаковку?"
              answer: `${t("xz63")}`, // "Промо кутулоо сактоо үчүн зарыл болгон эмес..."
            },
            {
              question: `${t("xz64")}`, // "Сколько кодов я могу зарегистрировать?"
              answer: `${t("xz65")}`, // "Количество Кодов, которые могут быть зарегистрированы одним и тем же Участником..."
            },
            {
              question: `${t("xz66")}`, // "Где посмотреть зарегистрированные коды?"
              answer: `${t("xz67")}`, // "Все зарегистрированные вами Коды отображаются в вашем личном кабинете..."
            },
            {
              question: `${t("xz68")}`, // "Какие призы я могу получить если выиграю?"
              answer: `${t("xz69")}`, // "Каждый месяц мы разыгрываем множество ценных призов..."
            },
            {
              question: `${t("xz70")}`, // "Как узнать результаты розыгрыша главного приза?"
              answer: `${t("xz71")}`, // "Розыгрыши проходят ежемесячно и результаты публикуются на нашем сайте..."
            },
            {
              question: `${t("xz72")}`, // "Как я могу получить приз?"
              answer: `${t("xz73")}`, // "В вашем личном кабинете появится информация..."
            },
            {
              question: `${t("xz74")}`, // "Как будет осуществляться выдача призов?"
              answer: `${t("xz75")}`, // "Выдача призов осуществляется после заключения договора..."
            },
            {
              question: `${t("xz76")}`, // "Надо ли платить налоги с приза?"
              answer: `${t("xz77")}`, // "Нет, налог на приз оплачивает Организатор промо акции."
            },
          ].map((item, index) => (
            <Accordion
              key={index}
              sx={{
                backgroundColor: "#ffffff",
                boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1)",
                marginBottom: 2,
                color: "rgb(100,100,100)",
                borderRadius: "8px",
                "&:before": {
                  display: "none",
                },
                "&.Mui-expanded": {
                  margin: "auto",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  padding: "15px 20px",
                  "& .MuiAccordionSummary-content": {
                    margin: 0,
                  },
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <Typography sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ padding: "15px 20px", backgroundColor: "#f9f9f9" }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: "rgb(100,100,100)" }}
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Modal>
  );
}

export default FAQModal;
