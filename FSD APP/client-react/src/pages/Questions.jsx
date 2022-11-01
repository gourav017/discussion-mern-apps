import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteQuestionApi, getQuestionAPI } from "../apis/api";
import EditQuestion from "./EditQuestion";

const Questions = () => {
  const [questions, setquestions] = useState({});

  const getQuestion = () => {
    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("userId");

    getQuestionAPI({ token, userId })
      .then((res) => res.json())
      .then((data) => {
        setquestions(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getQuestion();
  }, []);

  const handelDelete = (question_Id, user_Id) => {
    let token = localStorage.getItem("token");
    deleteQuestionApi({ question_Id, user_Id, token }).then(() => {
      getQuestion();
    });
  };

  if (!localStorage.getItem("token")) {
    return <h1>Please login again</h1>;
  }

  return (
    <div>
      <h1>yours questions</h1>
      {questions.length > 0 &&
        questions.map((q, index) => {
          return (
            <div key={index}>
              <p>{q.Question}</p>
              <p>{q.tag}</p>

              <button onClick={() => handelDelete(q._id, q.userId)}>
                delete
              </button>

              <EditQuestion
                Question_Id={q._id}
                user_Id={q.userId}
                getQuestion={getQuestion}
              />

              <Link to={`/Questions/${q.userId}`}>create question</Link>
            </div>
          );
        })}
    </div>
  );
};

export default Questions;
