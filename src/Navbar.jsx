import { useState } from "react"

function Navbar() {

    let currentUser = JSON.parse(localStorage.getItem("currentUser"))

    const [desp, setDesp] = useState(false)

    const handleDesp = (event) => {
        event.preventDefault();
        setDesp(!desp)
    }

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem("currentUser")
        window.location.replace("/")
    }

    const handleData = (event) => {
        event.preventDefault();
        window.location.replace("/myData");
    }

    return (
        <div className="w-full bg-slate-500 p-2 pe-6 text-white flex items-center justify-end relative">
            <button onClick={handleDesp} className="text-2xl">{currentUser.name} {desp ? String.fromCharCode(9650) : String.fromCharCode(9660)}</button>
            <div id="navbar-desp" className={`absolute right-1 top-9 mt-2 ${desp ? 'block' : 'hidden'} rounded-xl p-2 flex flex-col bg-slate-200 z-10`}>
                <a href="/main" className="bg-slate-600 rounded-xl cursor-pointer p-1 hover:scale-110 transition-all text-center">Inicio</a>
                <button className="bg-slate-600 rounded-xl cursor-pointer p-1 hover:scale-110 transition-all mt-2" onClick={handleData}>Mis Datos</button>
                <button className="bg-slate-600 rounded-xl cursor-pointer p-1 hover:scale-110 transition-all mt-2" onClick={handleLogout}>Cerrar Sesión</button>
            </div>
        </div>
    )
}

export default Navbar