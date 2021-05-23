import { Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./Question.css";

const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
}) => {
  // console.log(questions);
  const [selected, setSelected] = useState(questions[currQues].selectedAnswer);
  useEffect(() => {
    setSelected(questions[currQues].selectedAnswer);
  }, [currQues, questions]);
  const history = useHistory();

  const handleNext = () => {
    if (currQues > 8) {
      history.push("/result");
    }
    setCurrQues(currQues + 1);
  };
  const handlePrevious = () => {
    if (currQues < 1) {
      return;
    }
    setCurrQues(currQues - 1);
  };

  const handleQuit = () => {
    setCurrQues(0);
    setQuestions();
  };

  return (
    <div className="question">
      <h1>Question {currQues + 1} :</h1>

      <div className="singleQuestion">
        <h2>{questions[currQues].question}</h2>
        <div className="options">
          {options &&
            options.map((i) => (
              <div className="singleOption" key={i}>
                <label htmlFor={i}>{i}</label>
                <input
                  className="radioButton"
                  type="radio"
                  name=""
                  id={i}
                  value={i}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setSelected(e.target.value);
                    const temp = [...questions];
                    temp[currQues].selectedAnswer = e.target.value;
                    setQuestions(temp);
                    if (temp[currQues].selectedAnswer === correct) {
                      setScore(score + 1);
                    }
                    if (selected && temp[currQues].selectedAnswer !== correct) {
                      setScore(score - 1);
                    }
                  }}
                  checked={selected === i}
                />
              </div>
            ))}
        </div>
        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            href="/"
            onClick={() => handleQuit()}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handlePrevious}
          >
            {" "}
            Previous Question
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            {currQues > 8 ? "Submit" : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;
