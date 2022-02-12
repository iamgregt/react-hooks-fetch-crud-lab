import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionItem from "./QuestionItem";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])


  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(r => r.json())
    .then(data => {
      console.log(data)
      setQuestions(data)
    })
  }, [])

  function handleNewQuestion(newQuestion){
    const updatedQuestions = [...questions, newQuestion]
    setQuestions(updatedQuestions)
  }

  function handleDeletedQuestion(deletedQuestion){
    console.log(deletedQuestion.id)
    const updatedQuestions = questions.filter((question) => {
      return question.id !== deletedQuestion.id
    })
    setQuestions(updatedQuestions)
  }

  // function handleUpdatedAnswer(updatedQuestion){
  //   const updatedQuestions = questions.map((question) => {
  //     if(question.id === updatedQuestion.id){
  //       return updatedQuestion
  //     } else{
  //       return question
  //     }
  //   })
  //   setQuestions(updatedQuestions)
  // }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onNewQuestion={handleNewQuestion} /> : <QuestionList questions={questions} onDelete={handleDeletedQuestion} />}
    </main>
  );
}

export default App;
