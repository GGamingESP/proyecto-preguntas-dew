import Navbar from "./Navbar"

function Principal() {

    if(!localStorage.getItem("currentUser")){
        window.location.replace("/")
    }

    return (
        <>
            <Navbar/>
            <div>
                
            </div>
        </>
    )
}

export default Principal