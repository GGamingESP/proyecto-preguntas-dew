import { useState } from 'react';
import './App.css'

function Signup() {

        const [userData, setUserData] = useState({
            user: '',
            password: '',
            password_confirm: ''
        });

        const [error, setError] = useState(false)
        
        const [correct, setCorrect] = useState(false)

        const handleChange = (event) => {
            const { name, value } = event.target;
            setUserData({
                ...userData,
                [name]: value
            });
        };
        const handleSubmit = (event) => {
            event.preventDefault();
            console.log('Valores enviados:', userData);
            // Aquí puedes realizar la lógica para enviar los datos a tu backend o realizar alguna acción con los valores obtenidos
            let oldValues = localStorage.getItem("users");
            if (!oldValues) {
                oldValues = []; // Si no hay datos en localStorage, inicializa oldValues como un array vacío
            } else {
                oldValues = JSON.parse(oldValues); // Parsea los datos si existe algo en localStorage
            }
            if(userData.password != userData.password_confirm){
                setError(true)
                setTimeout(() => {
                    setError(false)
                },2000)
            }else{
                let newUser = {
                    name: userData.user,
                    password: userData.password
                }
                oldValues.push(newUser);
                localStorage.setItem("users", JSON.stringify(oldValues));
                setCorrect(true);
                setTimeout(() => {
                    setCorrect(false)
                    window.location.replace("/")
                }, 2500)
            }
            
        };

    return (
        <>
            <div className='flex flex-col h-screen items-center justify-center'>
                <h1 className='text-white text-5xl mb-8'>Crear Cuenta</h1>
                <form action="#" onSubmit={handleSubmit} className='bg-slate-500 rounded-2xl p-4 flex flex-col w-96' id='login-form'>
                    <label className='text-center text-white font-bold text-2xl mb-2' htmlFor="user">Nombre de Usuario</label>
                    <input className='rounded-3xl p-2 text-center' type="text" name="user" id="user" value={userData.user} onChange={handleChange} />
                    <label className='text-center text-white font-bold text-2xl mb-2' htmlFor="password">Contraseña</label>
                    <input className='rounded-3xl p-2 text-center' type="password" name="password" id="password" value={userData.password} onChange={handleChange}/>
                    <label className='text-center text-white font-bold text-2xl mb-2' htmlFor="password_confirm">Repetir Contraseña</label>
                    <input className='rounded-3xl p-2 text-center' type="password" name="password_confirm" id="password_confirm" value={userData.password_confirm} onChange={handleChange}/>
                    <input className='rounded-full bg-slate-400 w-2/4 p-3 mt-3 mx-auto cursor-pointer' type="submit" value="Crear Cuenta" />
                    {error == true ? <h2 className=' bg-red-600 text-white text-2xl text-center p-2 mt-2 rounded-xl'>Las contraseñas no son iguales</h2> : ""}
                    {correct == true ? <h2 className=' bg-green-600 text-white text-2xl text-center p-2 mt-2 rounded-xl'>Usuario creado correctamente</h2> : ""}
                </form>
                <a href="/" className='mt-3 rounded-full bg-slate-400 p-2'>Iniciar Sesion</a>
            </div>
        </>
    )
}



export default Signup