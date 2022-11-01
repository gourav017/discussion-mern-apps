import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CreateQuestion = () => {
  const [postques, setpostques] = useState({});
  const params = useParams()
  const handleChange = (e) => {
    let { name, value } = e.target;
    setpostques({
      ...postques,
      [name]: value,
    });
  };

  let token = localStorage.getItem("token")
  const handleSubmit = (e)=>{
    e.preventDefault();
    fetch(`http://localhost:8080/discussion/${params.userId}/create`,{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postques),
    })
    .then((res)=>res.json())
    .then((data)=>console.log(data))
    .catch((e)=>{
        console.log(e);
    })
  }
 
  if(!token){
    return <h1>not authorized</h1>
  }
  


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="Question"
        placeholder="enter your question.."
        onChange={handleChange}
      />

      <input
        type="text"
        name="tag"
        placeholder="write your tag"
        onChange={handleChange}
      />

      <button type="submit">submit</button>
    </form>
  );
};

export default CreateQuestion;
