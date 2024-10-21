import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import { createEntry, getAllEntries } from "./entryService";
import Notification from "./components/Notification";
import axios from "axios";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [visibility, setVisibility] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    getAllEntries().then((data) => setEntries(data));
  }, []);

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    createEntry({ date, weather, visibility, comment })
      .then((data) => {
        setEntries(entries.concat(data));
        setDate("");
        setWeather("");
        setVisibility("");
        setComment("");
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          setErrorMsg(err.response?.data);
          setTimeout(() => setErrorMsg(null), 5000);
        } else {
          setErrorMsg("Unexpected error.");
          setTimeout(() => setErrorMsg(null), 5000);
        }
      });
  };

  return (
    <div>
      <Notification message={errorMsg} />
      <h2>Add an Entry</h2>
      <form onSubmit={entryCreation}>
        <div>
          <label>date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>weather: </label>
          sunny
          <input
            type="radio"
            name="weather"
            value="sunny"
            onChange={(e) => setWeather(e.target.value)}
          />{" "}
          rainy
          <input
            type="radio"
            name="weather"
            value="rainy"
            onChange={(e) => setWeather(e.target.value)}
          />{" "}
          cloudy
          <input
            type="radio"
            name="weather"
            value="cloudy"
            onChange={(e) => setWeather(e.target.value)}
          />{" "}
          stormy
          <input
            type="radio"
            name="weather"
            value="stormy"
            onChange={(e) => setWeather(e.target.value)}
          />{" "}
          windy
          <input
            type="radio"
            name="weather"
            value="windy"
            onChange={(e) => setWeather(e.target.value)}
          />
        </div>
        <div>
          <label>visibility: </label>
          great
          <input
            type="radio"
            name="visibility"
            value="great"
            onChange={(e) => setVisibility(e.target.value)}
          />{" "}
          good
          <input
            type="radio"
            name="visibility"
            value="good"
            onChange={(e) => setVisibility(e.target.value)}
          />{" "}
          ok
          <input
            type="radio"
            name="visibility"
            value="ok"
            onChange={(e) => setVisibility(e.target.value)}
          />{" "}
          poor
          <input
            type="radio"
            name="visibility"
            value="poor"
            onChange={(e) => setVisibility(e.target.value)}
          />{" "}
        </div>
        <div>
          <label>comment: </label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>

      <h2>Diary Entries</h2>
      {entries.map((entry) => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <p>weather: {entry.weather}</p>
          <p>visibility: {entry.visibility}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
