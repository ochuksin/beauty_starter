import { useNavigate } from "react-router";
import Error from "../../components/error/Error";
import "./404.scss";

const PageNorFound = () => {
  const navigate = useNavigate();
  return (
    <div className="page-not-found">
      <Error />
      <h1>This page wasn't found</h1>
      <button onClick={() => navigate(-1)}>Go one step back</button>
    </div>
  );
};

export default PageNorFound;
