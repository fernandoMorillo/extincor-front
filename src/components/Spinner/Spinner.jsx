import { Spinner } from "react-bootstrap";

const LoadingSpinner = ({ text = "Cargando..." }) => {
  return (
    <div className="spinner-container">
      <Spinner animation="border" role="status" />
      <span className="loading-text">{text}</span>
    </div>
  );
};

export default LoadingSpinner;
