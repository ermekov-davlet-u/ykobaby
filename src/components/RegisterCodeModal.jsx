import { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import InputMask from "react-input-mask"; // Импортируем InputMask
import Cookies from "js-cookie"; // Импортируем js-cookie для работы с куки

function RegisterCodeModal({ show, handleClose, phone }) {
  const [code, setCode] = useState(""); // Инициализация промо-кода пустой строкой
  const [telephone, setTelephone] = useState("996"); // Установить начальное значение в 996
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(""); // Для отображения сообщения об ошибке или успехе

  useEffect(() => {
    // Получаем телефон из куки и устанавливаем его в состояние
    const savedPhone = Cookies.get("userPhone");
    if (savedPhone) {
      setTelephone(savedPhone);
    } else if (phone) {
      setTelephone(phone);
    }

    // Получаем промо-код из URL
    const urlParams = new URLSearchParams(window.location.search);
    const promoCode = urlParams.get("promo_code");

    if (promoCode) {
      setCode(promoCode); // Устанавливаем промо-код из URL
    }
  }, [phone]);

  const validate = () => {
    const newErrors = {};

    const phoneRegex = /^996\d{9}$/; // Регулярное выражение для формата 996XXXXXXXXX
    const formattedPhone = telephone.replace(/[^\d]/g, ""); // Удаляем все нецифровые символы

    if (!formattedPhone.match(phoneRegex)) {
      newErrors.phone = "Телефон должен быть в формате 996XXXXXXXXX";
    }

    if (!code.trim()) {
      newErrors.code = "Код обязателен";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Если кнопка уже заблокирована, не выполняем сабмит
    setIsSubmitting(true); // Блокируем кнопку

    const url = "https://yokobaby-promo.kg/api/register_code";
    const data = new URLSearchParams({
      telephone, // вводимый телефон
      code, // код
      lang: "0", // фиксированный язык (русский)
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
      });

      if (!response.ok) {
        throw new Error("Ошибка сети");
      }

      const result = await response.json();

      if (result.data && result.data.code_user) {
        setMessage(result.data.message || "Код успешно зарегистрирован!");
      } else {
        setMessage(
          result.data.message || "Некорректный код, попробуйте ещё раз."
        );
      }
    } catch (error) {
      console.error("Ошибка при отправке кода:", error);
      setMessage(
        "Произошла ошибка при отправке данных. Пожалуйста, попробуйте позже."
      );
    } finally {
      setTimeout(() => {
        setIsSubmitting(false); // Разблокируем кнопку через 3 секунды
      }, 3000);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Регистрация кода</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && (
          <Alert
            variant={
              errors.phone ||
              errors.code ||
              message === "Некорректный код, попробуйте ещё раз."
                ? "danger"
                : "success"
            }
          >
            {message}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          {/* Поле для телефона */}
          <Form.Group
            style={{ display: "none" }}
            controlId="formBasicTelephone"
            className="mt-3"
          >
            <Form.Label>Введите телефон</Form.Label>
            <InputMask
              mask="996999999999" // Маска для номера в формате 996XXXXXXXXX
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            >
              {(inputProps) => (
                <Form.Control
                  {...inputProps}
                  type="text"
                  placeholder="Введите номер телефона"
                  isInvalid={!!errors.phone}
                />
              )}
            </InputMask>
            <Form.Control.Feedback type="invalid">
              {errors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicCode" className="mt-3">
            <Form.Label>Введите код</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите код с карты"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              isInvalid={!!errors.code}
            />
            <Form.Control.Feedback type="invalid">
              {errors.code}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            style={{ background: "#cc3433", border: "none" }}
            variant="primary"
            type="submit"
            className="mt-4"
          >
            Зарегистрировать код
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RegisterCodeModal;
