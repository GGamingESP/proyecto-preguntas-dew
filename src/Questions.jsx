import { useState } from "react";
import Navbar from "./Navbar"
import QuestionCard from "./QuestionCard";

function Questions() {

    const [cantidad, setCantidad] = useState(0);
    const [cantidadDesp, setCantidadDesp] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questionValue, setQuestionValue] = useState(null) ;

    function randomizarArrayHasta(arrayOriginal, numeroPosiciones) {
        const arrayResultante = [...arrayOriginal]; // Copia el array original para no modificarlo directamente

        while (arrayResultante.length > numeroPosiciones) {
            const indiceAEliminar = Math.floor(Math.random() * arrayResultante.length); // Obtiene un índice aleatorio
            arrayResultante.splice(indiceAEliminar, 1); // Elimina un elemento en el índice aleatorio
        }
        return arrayResultante; // Devuelve el nuevo array con el número de posiciones requerido
    }

    let preguntasPreRandom = JSON.parse(localStorage.getItem("preguntas"))
    

    const handleCantidadInput = (event) => {
        event.preventDefault();

        let value = parseInt(event.target.value, 10); // Convertir el valor a un número entero

        if (value < 0 || isNaN(value)) { // Verificar si el valor es negativo o no es un número
          value = 0; // Si es negativo o no es un número, establecer el valor en 0
        }
        if(value > 25 || isNaN(value)) {
            value = 25 ;
        }

        setCantidad(value);
    }


    const handleDesp = (event) => {
        event.preventDefault();
        setCantidadDesp(!cantidadDesp)
        // logica hacer las preguntas
        
        let preguntas = randomizarArrayHasta(preguntasPreRandom, cantidad)
        preguntasObj = preguntas.map((e) => {

        })

        
    }

    return (
        <>
            <Navbar />
            <div className={`${cantidadDesp ? "hidden" : "block"}`}>
                {preguntasObj[currentQuestion]}
            </div>
            <div className={`flex flex-col bg-slate-400 w-72 p-4 rounded-xl ${cantidadDesp ? "block" : "hidden"} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`} id="elegir-cantidad">
                <label htmlFor="cantidad" className="text-center text-white font-bold text-xl">Elige la cantidad de preguntas</label>
                <input type="number" name="cantidad" id="cantidad" className="m-1 rounded-2xl p-1 text-center" placeholder="Maximo de 25" value={cantidad} onChange={handleCantidadInput} />
                <button id="elegir" className="mt-1 bg-slate-600 text-white text-center cursor-pointer w-1/3 mx-auto rounded-xl hover:scale-110 transition-all" onClick={handleDesp}>Elegir</button>
            </div>
        </>
    )
}

export default Questions