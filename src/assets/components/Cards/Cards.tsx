import "./Cards.css";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import { useState, useEffect } from "react";

type Props = {
  datos: {
    title: string;
    description: string;
    img: string;
  }[];
};

const Cards = (props: Props) => {
  const { datos } = props;
  const [indexImg, setIndexImg] = useState(0);

  const handleIndex = (index: number) => {
    setIndexImg(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndexImg((prevIndex) => (prevIndex + 1) % datos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [datos.length]);

  return (
    <>
      <div className="card-container">
        <h2>{datos[indexImg].title}</h2>
        <p>{datos[indexImg].description}</p>
        <a href="#">
          <img src={datos[indexImg].img} alt={datos[indexImg].title} />
        </a>
      </div>
      <div>
        {datos.map((_, index) => (
          <button key={index} onClick={() => handleIndex(index)}>
            {index === indexImg ? (
              <RadioButtonCheckedOutlinedIcon color="primary" />
            ) : (
              <RadioButtonUncheckedOutlinedIcon />
            )}
          </button>
        ))}
      </div>
    </>
  );
};

export default Cards;
