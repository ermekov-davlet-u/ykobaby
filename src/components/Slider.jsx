import "../styles/Slider.css";

const Slider = ({ images, direction }) => {
  return (
    <div  className={`xz-slider xz-slider-${direction}`}>
      <div className="xz-slider-track">
        {images.map((item, index) => (
          <div className="xz-slider-item" key={index}>
            <img src={item.img} alt={item.title} />
          </div>
        ))}
        {images.map((item, index) => (
          <div className="xz-slider-item" key={`clone-${index}`}>
            <img src={item.img} alt={item.title} />
          </div>
        ))}
        {images.map((item, index) => (
          <div className="xz-slider-item" key={`clone-${index}`}>
            <img src={item.img} alt={item.title} />
          </div>
        ))}
        {images.map((item, index) => (
          <div className="xz-slider-item" key={`clone-${index}`}>
            <img src={item.img} alt={item.title} />
          </div>
        ))}
        {images.map((item, index) => (
          <div className="xz-slider-item" key={`clone-${index}`}>
            <img src={item.img} alt={item.title} />
          </div>
        ))}
        {images.map((item, index) => (
          <div className="xz-slider-item" key={`clone-${index}`}>
            <img src={item.img} alt={item.title} />
          </div>
        ))}
        {images.map((item, index) => (
          <div className="xz-slider-item" key={`clone-${index}`}>
            <img src={item.img} alt={item.title} />
          </div>
        ))}
        {images.map((item, index) => (
          <div className="xz-slider-item" key={`clone-${index}`}>
            <img src={item.img} alt={item.title} />
          </div>
        ))}
        {images.map((item, index) => (
          <div className="xz-slider-item" key={`clone-${index}`}>
            <img src={item.img} alt={item.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
