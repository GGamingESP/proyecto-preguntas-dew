

function MyQuestionCard({id, questionText, options, correctAnswer}) {

    console.log(correctAnswer)
    let resp = options.map((e, index) => 
        <li key={index} className={`rounded-lg p-1 m-1 ${index + 1 == correctAnswer ? "bg-green-300" : " bg-red-500"}`}>{e}</li>
    )
    
    const handleDelete = (event) => {
        event.preventDefault();
        //logica
    }

    return (
        <li id={id} className="p-2 m-1 rounded-lg bg-slate-400">
            <div>
                <div className="flex flex-row">
                    <h3>{questionText}</h3>
                    <button onClick={() => handleDelete} className="p-1 bg-slate-500 text-white font-bold ms-2 rounded-lg text-center">X</button>
                </div>
                <ul className="">
                    {resp}
                </ul>
            </div>
        </li>
    )
}

export default MyQuestionCard