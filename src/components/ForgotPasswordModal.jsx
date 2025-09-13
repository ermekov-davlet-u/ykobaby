import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import InputMask from "react-input-mask"; // Импортируем InputMask
import "../styles/ForgotPasswordModal.css"; // Импортируем файл стилей

function ForgotPasswordModal({ show, handleClose }) {
  const [phone, setPhone] = useState("996"); // Инициализируем телефон с "996"
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    // Регулярное выражение для формата 996XXXXXXXXX
    if (!phone.match(/^996\d{9}$/)) {
      newErrors.phone = "Телефон должен быть в формате 996XXXXXXXXX";
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Неверный формат email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Submitting forgot password request...");

    try {
      const response = await fetch(
        "https://yokobaby-promo.kg/api/forgot_password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            telephone: phone,
            email,
            lang: "0",
          }).toString(),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server responded with an error:", errorText);
        throw new Error("Network response was not ok");
      }
      console.log(response);

      console.log("Password recovery request successful");
      handleClose();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/[^\d]/g, "");
    if (input.startsWith("996")) {
      setPhone(input.slice(0, 12)); // Ограничиваем длину до 12 символов
    } else {
      setPhone("996" + input.slice(0, 9)); // Если вводится другой префикс, добавляем "996"
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="custom-modal" // Применяем кастомный класс
    >
      <Modal.Header closeButton>
        <Modal.Title>Восстановление пароля</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formPhone">
            <Form.Label>Телефон</Form.Label>
            <InputMask
              mask="996999999999" // Маска для номера в формате 996XXXXXXXXX
              value={phone}
              onChange={handlePhoneChange} // Используем новый обработчик
            >
              {(inputProps) => (
                <Form.Control
                  {...inputProps}
                  type="text"
                  placeholder="Введите телефон"
                  isInvalid={!!errors.phone}
                />
              )}
            </InputMask>
            <Form.Control.Feedback type="invalid">
              {errors.phone}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Введите email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="mt-3"
            style={{
              backgroundColor: "rgb(204, 52, 51)",
              borderColor: "rgb(204, 52, 51)",
            }}
          >
            Отправить
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ForgotPasswordModal;
