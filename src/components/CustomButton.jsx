import "../styles/CustomButton.css";

const CustomButton = ({ bgColor, textColor, text, onClick, disabled = true }) => {
  const buttonStyle = {
    backgroundColor: bgColor,
    color: textColor,
  };

  return (
    <button className="btn1" onClick={onClick} disabled={disabled} style={buttonStyle}>
      {text}
    </button>
  );
};

export default CustomButton;
