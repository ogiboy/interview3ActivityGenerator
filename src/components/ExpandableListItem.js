import { useDispatch, useSelector } from "react-redux";
import { toggleIsOpen } from "../redux/activitySlice";
import { orderBy } from "lodash";

import ErrorWithTimeout from "../features/Error";

const ExpandableListItem = ({ sort }) => {
  const dispatch = useDispatch();
  const { activities, isOpen } = useSelector((state) => state.activity);

  const handleToggle = (active) => {
    dispatch(toggleIsOpen(isOpen === active ? null : active));
  };

  const showDetails = (activity) => {
    const keys = Object.keys(activity);
    return keys.map((key) => {
      if (
        key !== "key" &&
        activity[key] !== null &&
        activity[key] !== "" &&
        key !== "id"
      ) {
        if (key === "link" && activity[key] === "") {
          return null;
        }
        if (key === "input") {
          return null;
        }
        if (key === "link" && activity[key]) {
          return (
            <li key={key}>
              <strong>{key}:</strong>{" "}
              <a
                href={activity[key]}
                target="_blank"
                referrerPolicy="no-referrer"
                className={`link link-${activity[key]}`}
              >
                {activity[key]}
              </a>
            </li>
          );
        }
        return (
          <li key={key}>
            <strong>{key}:</strong> {activity[key]}
          </li>
        );
      }
      return null;
    });
  };

  return (
    <div>
      {orderBy(activities, "price", sort).map((activity, index) => {
        if (activity.error) {
          return (
            <ErrorWithTimeout
              delay="2500"
              key={activity.id}
              errorId={activity.input}
              id={activity.id}
            />
          );
        }

        if (activity.activity) {
          return (
            <div className={`activity activity-${index}`} key={activity.id}>
              <h2 className="activityName">{activity.activity}</h2>
              <button onClick={() => handleToggle(activity.id)}>
                {isOpen === activity.id ? "Hide Details" : "Show Details"}
              </button>
              {isOpen === activity.id && (
                <ul className={`activityDetails ${isOpen ? "open" : "closed"}`}>
                  {showDetails(activity)}
                </ul>
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default ExpandableListItem;
