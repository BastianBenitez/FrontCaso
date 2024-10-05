import "./News.css";
import Ads from "../Ads/Ads";
import datos from "../../datos.json";

const News = () => {
  return (
    <div className="new-container">
      <Ads datos={datos} />
    </div>
  );
};

export default News;
