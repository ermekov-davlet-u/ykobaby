// src/components/RegisterPage.jsx
import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterPage.css";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    // Логика регистрации пользователя
    localStorage.setItem("auth", true);
    navigate("/main");
  };

  return (
    <Container fluid className="register-page-container">
      <video id="video" loop autoPlay muted className="background-video">
        <source src="/video_auto.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>
      <Container className="form-container">
        <div className="form-content">
          <img src="public/dr32222.png" alt="" className="login-image" />
          <Form onSubmit={handleRegister} className="register-form">
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Регистрация</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Control
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword" className="mt-3">
              <Form.Control
                type="password"
                placeholder="Подтвердите пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <span>
              Вернуться обратно на страницу
              <a href="/register">Авторизации</a>
            </span>
            <Button
              variant="primary"
              type="submit"
              className="mt-3"
              style={{ background: "#4e73df", border: "none" }}
            >
              Зарегистрироваться
            </Button>
          </Form>
        </div>
      </Container>
      <footer className="footer">
        <p>Наши контакты:</p>
        <p>
          Телефон: <br /> +996(555)-954-120 <br /> +996(552)-708-701
        </p>
        <p>
          Почта: <br /> altynsuleimankg@gmail.com <br /> admin@333.kg
        </p>
      </footer>
    </Container>
  );
}

export default RegisterPage;
