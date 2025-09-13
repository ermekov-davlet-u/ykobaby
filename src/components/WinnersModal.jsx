import {
    Modal,
    Typography,
    Box,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
  import CloseIcon from "@mui/icons-material/Close";
  import TableWinners from "./TableWinners";
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
            {t("xz21")}
          </Typography>
            <TableWinners></TableWinners>
            
        </Box>
      </Modal>
    );
  }
  
  export default FAQModal;
  