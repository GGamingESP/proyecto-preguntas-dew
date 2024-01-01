import { useState } from "react"

function QuestionCard(questionText, questions, correctAnswer, id, currentState) {

    const [favourite, setFavourite] = useState(false)

    const handleFav = (event) => {
        event.preventDefault();
        setFavourite(!favourite);
        if(favourite){
            let oldValues = JSON.parse(localStorage.getItem("currentUser"))
            if(oldValues.favQuestions.includes(id)){
                let index = oldValues.indexOf(id);
                oldValues.splice(index, 1)
            }else {
                oldValues.push(id)
            }
        }else {
            // hacer que se busque la posicion en el array y eliminarlo
            let oldValues = JSON.parse(localStorage.getItem("currentUser"))
            if(oldValues.favQuestions.includes(id)){
                let index = oldValues.indexOf(id);
                oldValues.splice(index, 1)
            }else {
                oldValues.push(id)
            }
        }
    }

    const handleQuestion = (event) => {
        event.preventDefault();
        if(event.target.id == correctAnswer) {
            currentState = !currentState ;
        }
    }

    const preguntas = questions.map((e, index) => {
        <button id={index} onClick={handleQuestion} className={`w-1/2 rounded-md p-2 ${currentState ? "bg-green-500" : "bg-red-500"}`}>{e.question}</button>
    })

    return (
        <div>
            <div className="flex flex-row justify-between bg-slate-400">
                <h2>{questionText}</h2>
                <button onClick={handleFav} className={`${favourite ? 'text-yellow-400' : 'text-white'}`}>{favourite ? String.fromCharCode(9733) : String.fromCharCode(9734)}</button>
            </div>
            <div>
            {preguntas}
            </div>
        </div>
    )
}

export default QuestionCard