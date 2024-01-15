import { useState } from "react"

function QuestionCard({questionText, answers, val}) {
    // questionText, questions, correctAnswer, id, currentState (parametro de entrada)
    const [favourite, setFavourite] = useState(false)

    const handleFav = (event) => {
        event.preventDefault();
        setFavourite(!favourite);
        let id = val
        if(favourite){
            let oldValues = JSON.parse(localStorage.getItem("currentUser"))
            if(oldValues.favQuestions.includes(id)){
                let index = oldValues.favQuestions.includes(id);
                oldValues.favQuestions.splice(index, 1)
                localStorage.removeItem("currentUser");
                localStorage.setItem("currentUser", JSON.stringify(oldValues));
            }else {
                oldValues.favQuestions.push(id)
                localStorage.removeItem("currentUser");
                localStorage.setItem("currentUser", JSON.stringify(oldValues));
            }
        }else {
            // hacer que se busque la posicion en el array y eliminarlo
            let oldValues = JSON.parse(localStorage.getItem("currentUser"))
            if(oldValues.favQuestions.includes(id)){
                let index = oldValues.favQuestions.includes(id);
                oldValues.favQuestions.splice(index, 1)
                localStorage.removeItem("currentUser");
                localStorage.setItem("currentUser", JSON.stringify(oldValues));
            }else {
                oldValues.favQuestions.push(id)
                localStorage.removeItem("currentUser");
                localStorage.setItem("currentUser", JSON.stringify(oldValues));
            }
        }
    }

    // const handleQuestion = (event) => {
    //     event.preventDefault();
    //     if(event.target.id == correctAnswer) {
    //         currentState = !currentState ;
    //     }
    // }
    // console.log("texto de la pregunta" + questionText);
     console.log("respuestas" + answers);
    // const valores = Object.keys(answers);
    // console.log(valores)
    
    // <button id={index} onClick={handleQuestion} className={`w-1/2 rounded-md p-2 ${currentState ? "bg-green-500" : "bg-red-500"}`}>{e.question}</button>


    return (
        <div className="bg-slate-400 p-2 w-3/4 mx-auto mt-10 h-[40rem] rounded-lg pb-6">
            <div className="flex flex-row justify-between bg-slate-500 p-2 text-white text-center rounded-lg">
                <h2 className="text-center text-xl mx-auto">{questionText}</h2>
                <button onClick={handleFav} className={`${favourite ? 'text-yellow-400' : 'text-white'}`}>{favourite ? String.fromCharCode(9733) : String.fromCharCode(9734)}</button>
            </div>
            <div className=" h-[90%] ps-1">
            {answers.map((e, index) => <button key={index} className={`w-[49%] h-[49%] m-1 rounded-md text-white p-1 bg-slate-500 hover:scale-105 transition-all`}>{e}</button>)}
            </div>
        </div>
    )
}

export default QuestionCard