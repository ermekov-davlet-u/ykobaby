import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"; // Иконка для приза
import { useTranslation } from "react-i18next";

const winners = [
  // { name: "Иван", age: 30, city: "Москва", prize: "Автомобиль" },
  // { name: "Анна", age: 25, city: "Санкт-Петербург", prize: "Телефон" },
];

const ModalWindow = ({ open, onClose }) => {
  const { t } = useTranslation();

  return (
    <Dialog
      sx={{
        zIndex: "999",
        background: "rgba(255, 255, 255, 0.9)", // Полупрозрачный белый фон
        backdropFilter: "blur(5px)", // Размытие фона
      }}
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          position: "relative",
          marginBottom: 3,
          backgroundColor: "#97459a", // Цвет заголовка
          color: "#fff", // Цвет текста заголовка
          padding: "16px",
        }}
      >
        {t("xz17")}
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#f3f4f6" }}>
        {" "}
        {/* Светлый фон для содержимого */}
        <Grid container spacing={2}>
          {winners.map((winner, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  boxShadow: 3,
                  backgroundColor: "#fff", // Цвет фона карточки
                  borderRadius: 2,
                  "&:hover": {
                    boxShadow: 6, // Тень при наведении
                    transform: "translateY(-3px)", // Подъем при наведении
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <EmojiEventsIcon
                      sx={{ marginRight: 1, color: "#ff9800" }}
                    />{" "}
                    {/* Цвет иконки */}
                    {winner.name}
                  </Typography>
                  <Typography variant="body2">Возраст: {winner.age}</Typography>
                  <Typography variant="body2">Город: {winner.city}</Typography>
                </CardContent>
                <CardActions>
                  <Typography variant="body2" color="primary">
                    Приз: {winner.prize}
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ModalWindow;
