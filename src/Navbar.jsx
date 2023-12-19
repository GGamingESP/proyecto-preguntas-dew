import { useState } from "react"

function Navbar() {

    let currentUser = JSON.parse(localStorage.getItem("currentUser"))

    const [desp, setDesp] = useState(false)


    const handleDesp = (event) => {
        event.preventDefault();
        if(desp){
            setDesp(false)
        }else {
            setDesp(true)
        }
    }

    const despValue = "block ";
    const undespValue = "hidden rounded-xl p-2";

    return (
        <div className="w-full h-20 bg-slate-500 p-2 pe-6 text-white flex items-center justify-end">
            <button onClick={handleDesp} className=" text-2xl">{currentUser.user} &darr;</button>
            <div id="navbar-desp" className={desp == true ? despValue : undespValue}>
                <button className="bg-slate-600 rounded-xl cursor-pointer p-1 hover:scale-110 transition-all">Cerrar Sesion</button>
            </div>
        </div>
    )
}

export default Navbar