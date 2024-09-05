import { useState } from "react";

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Display = ({ cat, value }) => {
  if (cat === "positive") {
    return (
      <div>
        {cat} {value} %
      </div>
    );
  }
  return (
    <div>
      {cat} {value}
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = bad + neutral + good;

  const addToGood = () => {
    setGood(good + 1);
  };

  const addToNeutral = () => {
    setNeutral(neutral + 1);
  };

  const addToBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header text={"Give Feedback"} />
      <Button handleClick={addToGood} text="good" />
      <Button handleClick={addToNeutral} text="neutral" />
      <Button handleClick={addToBad} text="bad" />
      <Header text={"Statistics"} />
      <Display cat={"good"} value={good} />
      <Display cat={"neutral"} value={neutral} />
      <Display cat={"bad"} value={bad} />
      <Display cat={"all"} value={total} />
      <Display cat={"average"} value={(good * 1 + bad * -1) / total} />
      <Display cat={"positive"} value={good / total} />
    </div>
  );
};

export default App;
