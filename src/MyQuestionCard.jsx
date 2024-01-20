import { useContext } from "react";
import MyDataContext from './MyDataContext';

function MyQuestionCard({id, handler}) {

    const myContextData = useContext(MyDataContext);

    let currentQuestion = myContextData.filter((e) => e.id == id)
    let correctAnswer = currentQuestion[0].correctAnswer
    // console.log(correctAnswer)
    let resp = currentQuestion[0].options.map((e, index) => 
        <li key={index} className={`rounded-lg p-1 m-1 ${index + 1 == correctAnswer ? "bg-green-300" : " bg-red-500"}`}>{e}</li>
    )
    
    const handleDelete = (event) => {
        event.preventDefault();
        //logica
        console.log("intentando eliminar pregunta");
        handler(id)   
    }

    return (
        <li id={id} className="p-2 m-1 rounded-lg bg-slate-400">
            <div>
                <div className="flex flex-row">
                    <h3>{currentQuestion[0].question}</h3>
                    <button onClick={handleDelete} className="p-1 bg-slate-500 text-white font-bold ms-2 rounded-lg text-center hover:scale-105 transition-all right-1">X</button>
                </div>  
                <ul className="">
                    {resp}
                </ul>
            </div>
        </li>
    )
}

export default MyQuestionCard