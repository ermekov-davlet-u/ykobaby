import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import ForgotPasswordModal from "./ForgotPasswordModal"; // Импортируем ForgotPasswordModal
function AuthModal({ show, handleClose, onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [birthDate, setBirthDate] = useState("");
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [phone, setPhone] = useState("996");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const [errors, setErrors] = useState({});
  const { t } = useTranslation();

  const formatPhoneNumber = (phone) => phone.replace(/[^\d]/g, "");

  const validate = () => {
    const newErrors = {};
    const formattedPhone = formatPhoneNumber(phone);
    const phoneRegex = /^996\d{9}$/;

    if (isForgotPassword) {
      if (!formattedPhone.match(phoneRegex)) {
        newErrors.phone = "Телефон должен быть в формате 996XXXXXXXXX";
      }
      if (!name.trim()) {
        newErrors.name = "ФИО обязательно";
      }
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        newErrors.email = "Неверный формат email";
      }
    } else {
      if (!formattedPhone.match(phoneRegex)) {
        newErrors.phone = "Телефон должен быть в формате 996XXXXXXXXX";
      }
      if (password.length < 3) {
        newErrors.password = "Пароль должен быть не менее 3 символов";
      }
      if (!isLogin && !isForgotPassword) {
        if (!name.trim()) {
          newErrors.name = "ФИО обязательно";
        }
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          newErrors.email = "Неверный формат email";
        }
        if (!city.trim()) {
          newErrors.city = "Город обязателен";
        }
        if (!birthDate) {
          newErrors.birthDate = "Дата рождения обязательна";
        }
        if (!isChecked) {
          newErrors.isChecked = "Вы должны согласиться с правилами лотереи";
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleForgotPassword = () => {
    setForgotPasswordVisible(true);
  };

  const handleCloseForgotPassword = () => {
    setForgotPasswordVisible(false);
    setIsLogin(true);
  };

  const handleDateChange = (e) => setBirthDate(e.target.value);

  const saveUserDataToCookie = (phone, name) => {
    Cookies.set("userPhone", phone, { expires: 7 });
    Cookies.set("userName", encodeURIComponent(name), { expires: 7 });
  };

  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/[^\d]/g, "");

    // Если телефон начинается с "996" и третий символ - это "0", то блокируем ввод
    if (input.startsWith("996") && input[3] === "0") {
      input = input.slice(0, 3); // Оставляем только "996"
    }

    if (input.startsWith("996")) {
      setPhone(input.slice(0, 12)); // Ограничиваем длину до 12 символов (например, 996XXXXXXXXX)
    } else {
      setPhone("996" + input.slice(0, 9)); // Ограничиваем длину до 9 символов
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;


    const formattedPhone = formatPhoneNumber(phone);
    let url, data;

    if (isForgotPassword) {
      url = "https://yokobaby-promo.kg/api/forgot_password";
      data = new URLSearchParams({
        telephone: formattedPhone,
        fio: name,
        email,
        lang: "0",
      });
    } else if (isLogin) {
      url = "https://yokobaby-promo.kg/api/login";
      data = new URLSearchParams({ telephone: formattedPhone, password });
    } else {
      url = "https://yokobaby-promo.kg/api/register_user";
      data = new URLSearchParams({
        telephone: formattedPhone,
        fio: name,
        email,
        city,
        age: birthDate,
        password,
        lang: "0",
      });
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data.toString(),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const result = await response.json();

      if (result.data) {
        const userName = result.data.name || name;
        setServerMessage(result.data.message || "");
        if (isLogin) {
          saveUserDataToCookie(formattedPhone, userName);
          onAuthSuccess(formattedPhone);
          Cookies.set("shouldShowRegisterModal", "true", { expires: 1 });
        } else if (isForgotPassword) {
          setIsForgotPassword(false);
        } else {
          setIsLogin(true);
        }
      } else {
        setErrors({
          phone: "Такой номер не зарегистрирован или данные введены неверно.",
        });
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isForgotPassword
            ? "Восстановление пароля"
            : isLogin
            ? t("xz81")
            : "Регистрация"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={handleSubmit}
          className={
            isLogin
              ? "form-login"
              : isForgotPassword
              ? "form-forgot-password"
              : "form-register"
          }
        >
          {serverMessage && <p className="text-success">{serverMessage}</p>}
          {isForgotPassword ? (
            <>
              <Form.Group controlId="formName">
                <Form.Label>ФИО</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите ФИО"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPhone">
                <Form.Label>Телефон</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите телефон"
                  value={phone}
                  onChange={handlePhoneChange}
                  isInvalid={!!errors.phone}
                />
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
            </>
          ) : (
            <>
              {!isLogin && (
                <>
                  <Form.Group controlId="formName">
                    <Form.Label>ФИО</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Введите ФИО"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
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
                  <Form.Group controlId="formCity">
                    <Form.Label>Город</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Введите город"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      isInvalid={!!errors.city}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.city}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="formBirthDate">
                    <Form.Label>Дата рождения</Form.Label>
                    <Form.Control
                      type="date"
                      value={birthDate}
                      onChange={handleDateChange}
                      isInvalid={!!errors.birthDate}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.birthDate}
                    </Form.Control.Feedback>
                  </Form.Group>
                </>
              )}
              <Form.Group controlId="formPhone">
                <Form.Label>Телефон</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите телефон"
                  value={phone}
                  onChange={handlePhoneChange}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={t("xz83")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </>
          )}

          {/* Чекбокс в самом низу */}
          {!isLogin && !isForgotPassword && (
            <Form.Group controlId="formAgreement">
              <Form.Check
                type="checkbox"
                label={t("xz88")}
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                isInvalid={!!errors.isChecked}
              />
              <Form.Control.Feedback type="invalid">
                {errors.isChecked}
              </Form.Control.Feedback>
            </Form.Group>
          )}

          <Button
            variant="primary"
            type="submit"
            data-action={
              isLogin
                ? "login"
                : isForgotPassword
                ? "reset-password"
                : "register"
            }
          >
            {isForgotPassword
              ? "Восстановить пароль"
              : isLogin
              ? t("xz81")
              : t("xz84")}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {isForgotPassword ? (
          <Button variant="primary" onClick={() => setIsForgotPassword(false)}>
            Назад
          </Button>
        ) : (
          <>
            {isLogin ? (
              <>
                <Button variant="link" onClick={() => setIsLogin(false)}>
                  {t("xz84")}
                </Button>
                <Button variant="link" onClick={handleForgotPassword}>
                  {t("xz85")}
                </Button>
              </>
            ) : (
              <Button variant="link" onClick={() => setIsLogin(true)}>
                {t("xz87")}
              </Button>
            )}
            <ForgotPasswordModal
              show={forgotPasswordVisible}
              handleClose={handleCloseForgotPassword}
            />
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default AuthModal;
