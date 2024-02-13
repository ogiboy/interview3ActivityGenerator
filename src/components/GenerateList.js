import { useDispatch } from "react-redux";
import {
  addActivity,
  toggleIsOpen,
  setUserInput
} from "../redux/activitySlice";
import { useState } from "react";

import axios from "axios";
import ExpandableListItem from "./ExpandableListItem";
import LoadingItem from "../features/Loading";

const GenerateList = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [sort, setSort] = useState("asc");

  const fetchActivity = async () => {
    setIsLoading(true);
    const url = "https://www.boredapi.com/api/activity";
    try {
      const response = await axios.get(url, {
        params: { participants: input }
      });
      if (response.status !== 200 || response.statusText !== "OK") {
        throw new Error("Connection Error");
      } else {
        const id = crypto.randomUUID();
        dispatch(addActivity({ id, ...response.data, input }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormParams = async () => {
    dispatch(toggleIsOpen(null));
    dispatch(setUserInput(input));
    await fetchActivity();
  };

  return (
    <div className="generator">
      <div className="heading">
        <h1>Activity Generator</h1>
      </div>
      <div className="form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFormParams();
          }}
        >
          <label htmlFor="participants">
            Number of Participants:{" "}
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              name="personNmbr"
              id="participants"
              type="range"
              min={0}
              max={15}
            />
            <input id="displayPerson" type="number" disabled value={input} />
          </label>
          <button type="submit">Generate Activity</button>
          <button
            type="button"
            onClick={() => setSort(sort === "asc" ? "desc" : "asc")}
          >
            {sort === "asc" ? "Price Low to High" : "Price High to Low"}
          </button>
        </form>
      </div>
      <div className="list">
        {isLoading && <LoadingItem />}
        <ExpandableListItem sort={sort} />
      </div>
    </div>
  );
};

export default GenerateList;
