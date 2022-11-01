// let token = localStorage.getItem("token");
// let userId = localStorage.getItem("userId");

export const getQuestionAPI = ({token,userId}) => {
  return fetch(`http://localhost:8080/discussion/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editQuestionApi = ({user_Id,Question_Id,token,editques}) => {
  return fetch(`http://localhost:8080/discussion/${user_Id}/edit/${Question_Id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(editques),
  });
};

export const deleteQuestionApi = ({question_Id, user_Id,token}) => {
    return fetch(`http://localhost:8080/discussion/${user_Id}/delete/${question_Id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
  };
