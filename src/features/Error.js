import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { delErrorFromState } from "../redux/activitySlice";

const Error = ({ errorId }) => {
  const errorStyling = {
    padding: "20px",
    border: "1px dotted black",
    borderRadius: "10px",
    width: "50%",
    margin: "5px auto",
    backgroundColor: "black",
    color: "white",
    opacity: "0.5"
  };

  return (
    <div style={errorStyling} className="error">
      <h3>Aww snap!</h3>
      <p>Can't find any activity for {errorId} people right now.</p>
    </div>
  );
};

const ErrorWithTimeout = ({ delay, errorId, id }) => {
  const dispatch = useDispatch();
  const [isErrorOpen, setIsErrorOpen] = useState(true);
  const errorKey = crypto.randomUUID();

  useEffect(() => {
    const handleTimeout = () => {
      dispatch(delErrorFromState(id));
      setIsErrorOpen(false);
    };

    let timeoutId = setTimeout(() => {
      handleTimeout();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay, dispatch, id]);

  useEffect(() => console.log(isErrorOpen), [isErrorOpen]);

  return isErrorOpen ? <Error errorId={errorId} key={errorKey} /> : null;
};

export default ErrorWithTimeout;
