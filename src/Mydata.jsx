import './App.css'
import MyQuestionCard from './MyQuestionCard';
import Navbar from './Navbar'
import { useEffect, useState, useContext } from 'react'
import MyDataContext from './Mydatacontext';

function Mydata() {
    const MyDataProvider = MyDataContext.Provider;
    let usr = JSON.parse(localStorage.getItem("currentUser"))

    const [myQuestionsDesp, setMyQuestionsDesp] = useState(false);
    const [myQuestions, setMyQuestions] = useState([...usr.madeQuestions]);
    const [questions, setQuestions] = useState([]);
    const [tick, setCurrenTick] = useState({
        id: "",
        position: ""
    });
    const [questionData, setQuestionData] = useState({
        question: '',
        respuesta1: '',
        respuesta2: '',
        respuesta3: '',
        respuesta4: '',
        correctAnswer: null,
    }) 

    const handleChangeNewQuestion = (event) => {
        event.preventDefault();
        const {name, value} = event.target ;
        setQuestionData({
            ...questionData,
            [name]: value
        })
    }

    const handleNewQuestion = (event) => {
        event.preventDefault();
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        let madeQuestions ;
        if(currentUser.madeQuestions) {
            madeQuestions = currentUser.madeQuestions ;
        }else {
            madeQuestions = [];
        }
        let newQuestion = {
            question: questionData.question,
            options: [
                questionData.respuesta1,
                questionData.respuesta2,
                questionData.respuesta3,
                questionData.respuesta4
            ],
            correctAnswer: questionData.correctAnswer,
            id: crypto.randomUUID()
        }
        madeQuestions.push(newQuestion)
        let changesMade = {
            ...currentUser,
            madeQuestions: madeQuestions
        };
        localStorage.removeItem("currentUser");
        localStorage.setItem("currentUser", JSON.stringify(changesMade));
        //aqui hacer los cambios a el localstorage de todos los usuarios
        let allUsers = JSON.parse(localStorage.getItem("users"));
        let allUsersLess = allUsers.filter((user) => user.name != changesMade.name)
        allUsersLess.push(changesMade)
        localStorage.removeItem("users");
        localStorage.setItem("users", JSON.stringify(allUsersLess));
        console.log(questionData);
        let user = JSON.parse(localStorage.getItem("currentUser"));
        let preg = user.madeQuestions.map((e, index) => <MyQuestionCard key={index} id={e.id} questionText={e.question} options={e.options} correctAnswer={e.correctAnswer} handler={() => deleteQuestion(e.id)} />)
        setQuestions(preg);
        setMyQuestions([...madeQuestions], () => {console.log(myQuestions)});
        // console.log(myQuestions)
        // location.reload();
    };

    const handleMyQuestionsDesp = (event) => {
        event.preventDefault();
        setMyQuestionsDesp(!myQuestionsDesp);
    }

    const deleteQuestion = (id) => {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        console.log(currentUser);
        console.log("ID de la pregunta a eliminar: " + id);
        console.log(myQuestions);
    
        setMyQuestions(prevQuestions => {
            let updatedQuestions = prevQuestions.filter((pregunta) => pregunta.id !== id);
    
            console.log(updatedQuestions);
    
            let changesMade = {
                ...currentUser,
                madeQuestions: updatedQuestions,
            };
    
            localStorage.setItem("currentUser", JSON.stringify(changesMade));
    
            // Update other users in localStorage
            let allUsers = JSON.parse(localStorage.getItem("users"));
            let allUsersLess = allUsers.filter((user) => user.name !== changesMade.name);
            allUsersLess.push(changesMade)
            localStorage.setItem("users", JSON.stringify(allUsersLess));
    
            // Update the component state with the updated questions
            let preg = updatedQuestions.map((e, index) => (
                <MyQuestionCard
                    key={index}
                    id={e.id}
                    questionText={e.question}
                    options={e.options}
                    correctAnswer={e.correctAnswer}
                    handler={() => deleteQuestion(e.id)}
                />
            ));
            setQuestions(preg);
    
            return [...updatedQuestions]; // Devolver el nuevo estado
        });
    };

    const handleMyQuestionTick = (event) => {
        event.preventDefault();
        let tickID = event.target.id;
        let tickLength = tickID.length;
        let tickIDNumber = tickID.charAt(tickLength - 1);
        console.log(tickIDNumber )
        if(tick.id == tickID){
            setCurrenTick(...tick);
        }else {
            setCurrenTick({
                id: tickID,
                position: tickIDNumber
            });
            let question = questionData
            question.correctAnswer = parseInt(tickIDNumber)
            setQuestionData(question) 
            // console.log(questionData)
        }
    }
    

    useEffect(() => {
        // funciones para cargar los datos al principio
        let user = JSON.parse(localStorage.getItem("currentUser"));
        if(user.madeQuestions){
            // setMyQuestions(user.madeQuestions)
            let preg = user.madeQuestions.map((e, index) => <MyQuestionCard key={index} id={e.id} questionText={e.question} options={e.options} correctAnswer={e.correctAnswer} handler={() => deleteQuestion(e.id)} />)
            setQuestions(preg);
            console.log(user.madeQuestions)
            setMyQuestions([...user.madeQuestions])
            console.log(myQuestions); 
        }
        // console.log(myQuestions);
        // setMyQuestions(...user.madeQuestions)
        // console.log(myQuestions);
    }, []);


    return (
        <>
            <Navbar />
            <div>
                <div>
                    <h2 className='text-white text-3xl mt-4 ms-8'>Mis preguntas</h2>
                    <ul className='flex flex-row mt-2 ms-8'>
                        {questions}
                    </ul>
                    <button className=' p-2 bg-slate-400 text-white rounded-xl mt-4 ms-8 hover:scale-105 transition-all' onClick={handleMyQuestionsDesp}>Añadir Pregunta</button>
                    <div className={`flex flex-col bg-slate-400 w-72 p-4 rounded-xl ${myQuestionsDesp ? "block" : "hidden"} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                        <form className='flex flex-col bg-slate-400 w-96 p-4 rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                            <label htmlFor="question" className='text-white text-lg font-bold'>Texto de la pregunta</label>
                            <input type="text" name="question" id="question" placeholder='Introduce el texto de la pregunta' className='p-1 rounded w-full mt-2' onChange={handleChangeNewQuestion} />
                            <div className='ps-2 mt-1'>
                                <label className='text-white text-lg font-bold'>Respuestas</label>
                                <div className='flex flex-row justify-center items-center'><input type="text" name='respuesta1' placeholder='Introduce la respuestas' className='p-1 rounded w-[90%] mt-2' onChange={handleChangeNewQuestion} /> <button id='respuestatick1' className={`w-[10%] ${tick.id == "respuestatick1" ? "bg-green-400" : "bg-slate-300"} ms-1 mt-2 rounded-lg hover:scale-110 transition-all`} onClick={handleMyQuestionTick}>&#10003;</button></div>
                                <div className='flex flex-row justify-center items-center'><input type="text" name='respuesta2' placeholder='Introduce la respuestas' className='p-1 rounded w-[90%] mt-2' onChange={handleChangeNewQuestion} /> <button id='respuestatick2' className={`w-[10%] ${tick.id == "respuestatick2" ? "bg-green-400" : "bg-slate-300"} ms-1 mt-2 rounded-lg hover:scale-110 transition-all`} onClick={handleMyQuestionTick}>&#10003;</button></div>
                                <div className='flex flex-row justify-center items-center'><input type="text" name='respuesta3' placeholder='Introduce la respuestas' className='p-1 rounded w-[90%] mt-2' onChange={handleChangeNewQuestion} /> <button id='respuestatick3' className={`w-[10%] ${tick.id == "respuestatick3" ? "bg-green-400" : "bg-slate-300"} ms-1 mt-2 rounded-lg hover:scale-110 transition-all`} onClick={handleMyQuestionTick}>&#10003;</button></div>
                                <div className='flex flex-row justify-center items-center'><input type="text" name='respuesta4' placeholder='Introduce la respuestas' className='p-1 rounded w-[90%] mt-2' onChange={handleChangeNewQuestion} /> <button id='respuestatick4' className={`w-[10%] ${tick.id == "respuestatick4" ? "bg-green-400" : "bg-slate-300"} ms-1 mt-2 rounded-lg hover:scale-110 transition-all`} onClick={handleMyQuestionTick}>&#10003;</button></div>
                            </div>
                            <button className='bg-slate-500 p-2 rounded mx-auto mt-4 text-white cursor-pointer hover:scale-105 transition-all' onClick={handleNewQuestion}>Crear Pregunta</button>
                        </form>
                    </div>
                </div>
                <div>
                    <h2 className='text-white text-3xl mt-4 ms-8'>Mi puntuacion promedio</h2>
                    <p className='text-white text-2xl mt-3 ms-8'>{Number.isNaN(usr.avgScore) ? usr.avgScore.reduce((acumulador, numero) => acumulador + numero, 0) / usr.avgScore.length : "Todavia no has hecho ningun examen"}</p>
                </div>
            </div>
        </>
    )
}

export default Mydata