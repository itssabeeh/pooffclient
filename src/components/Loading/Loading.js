import { Spinner } from 'react-bootstrap';
import '../Loading/Loading.css';
const Loading = () => {
  return (
    <div className="loadingContainer">
      <Spinner
        style={{ width: '100px', height: '100px' }}
        animation="border"
        variant="secondary"
      />
    </div>
  );
};

export default Loading;
