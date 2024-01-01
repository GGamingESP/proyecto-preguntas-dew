import Navbar from "./Navbar"
import './App.css'

function Principal() {

    if(!localStorage.getItem("currentUser")){
        window.location.replace("/")
    }

    const handleQuestions = (event) => {
        event.preventDefault();
        window.location.replace("/questions")
    }

    const handleExam = (event) => {
        event.preventDefault();
        window.location.replace("/exam")
    }

    const handleFavourites = (event) => {
        event.preventDefault();
        window.location.replace("/favourites")
    }

    return (
        <>
            <Navbar/>
            <div className="flex flex-row justify-between p-5 h-full">
                <div className="w-1/3 bg-slate-400 rounded-xl h-[825px] flex flex-col justify-center p-4 m-2 hover:scale-105 transition-all duration-200">
                    <h1 className="text-white text-3xl text-center font-bold">Preguntas Aleatorias</h1>
                    <p className="text-white text-lg text-justify px-6 mt-5">Test de preguntas aleatorias con un numero modificable de las mismas. Con una puntuacion al final para hacerse una idea. Con un total de 15 segundos entre pregunta y pregunta</p>
                    <button onClick={handleQuestions} className=" bg-slate-600 p-3 mt-5 rounded-xl text-white text-center hover:scale-110 hover:rounded-2xl hover:bg-slate-500 transition-all duration-200 mx-auto">Acceder</button>
                </div>
                <div className="w-1/3 bg-slate-400 rounded-xl h-[825px] flex flex-col justify-center p-4 m-2 hover:scale-105 transition-all duration-200">
                    <h1 className="text-white text-3xl text-center font-bold">Examen</h1>
                    <p className="text-white text-lg text-justify px-6 mt-5">Examen con numero de preguntas fijas, al final se le comunica la nota del examen y se le hara una media de los examenes totales. Con un total de 15 segundos por pregunta</p>
                    <button onClick={handleExam} className="bg-slate-600 p-3 mt-5 rounded-xl text-white text-center hover:scale-110 hover:rounded-2xl hover:bg-slate-500 transition-all duration-200 mx-auto">Acceder</button>
                </div>
                <div className="w-1/3 bg-slate-400 rounded-xl h-[825px] flex flex-col justify-center p-4 m-2 hover:scale-105 transition-all duration-200">
                    <h1 className="text-white text-3xl text-center font-bold ">Preguntas favoritas</h1>
                    <p className="text-white text-lg text-justify px-6 mt-5">Seleccion de las preguntas favoritas por el usuario, en este podras ver las preguntas y las respuestas solucionadas. Sin limite de tiempo entre preguntas</p>
                    <button onClick={handleFavourites} className="bg-slate-600 p-3 mt-5 rounded-xl text-white text-center hover:scale-110 hover:rounded-2xl hover:bg-slate-500 transition-all duration-200 mx-auto">Acceder</button>
                </div>
            </div>
        </>
    )
}

export default Principal