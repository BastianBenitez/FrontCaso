import "./News.css";
import Cards from "../Cards/Cards";
import datos from "../../datos.json";

const News = () => {
  return (
    <div className="new-container">
      <Cards datos={datos} />
    </div>
  );
};

export default News;
