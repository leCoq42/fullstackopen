import { useState } from "react";

const Header = ({ text }) => (
  <div>
    <h1>{text}</h1>
  </div>
);

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ cat, value }) => {
  return (
    <tr>
      <td>{cat}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  if (total === 0) {
    return <div>No feedback given</div>;
  }

  const average = () => (good - bad) / total;
  const positive = () => (good / total) * 100 + "%";

  return (
    <table>
      <tbody>
        <StatisticLine cat="good" value={good} />
        <StatisticLine cat="neutral" value={neutral} />
        <StatisticLine cat="bad" value={bad} />
        <StatisticLine cat="all" value={total} />
        <StatisticLine cat="average" value={average()} />
        <StatisticLine cat="positive" value={positive()} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addToGood = () => setGood(good + 1);
  const addToNeutral = () => setNeutral(neutral + 1);
  const addToBad = () => setBad(bad + 1);

  return (
    <div>
      <Header text="Give Feedback" />
      <Button handleClick={addToGood} text="good" />
      <Button handleClick={addToNeutral} text="neutral" />
      <Button handleClick={addToBad} text="bad" />
      <Header text="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
