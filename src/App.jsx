import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [userData, setUserData] = useState({
    user: '',
    password: ''
  })

  const [error, setError] = useState(false)
  
  const [correct, setCorrect] = useState(false)

  const handleChange = (event) => {
    const {name, value} = event.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }

  useEffect(() => {
    const datosFetch = async () => {
      await fetch("/data.json").then(reponse => reponse.json()).then(response => {
        let newData = response.map((e, index) => {
          e.id = index + 1
          return e ;
        })
        localStorage.setItem("preguntas", JSON.stringify(newData))
      })
    }
    datosFetch();
    if(localStorage.getItem("users")){
      ""
    }else {
      localStorage.setItem("users", [])
    }
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    let users = JSON.parse(localStorage.getItem("users"));
    if(users.some(user => user.name == userData.user && user.password == userData.password)){
      setCorrect(true);
      let currentUser = {
        user: userData.user,
        password: userData.password
      }
      localStorage.setItem("currentUser", JSON.stringify(currentUser))
      setInterval(() => {
        setCorrect(false)
        window.location.replace("/main");
      }, 2000)
    }else {
      setError(true)
      setInterval(() => {
        setUserData({
          name: '',
          password: ''
        })
        setError(false)
      }, 2000)
    }
  }

  return (
    <>
      <div className='flex flex-col h-screen items-center justify-center'>
        <h1 className='text-white text-5xl mb-4 text-center'>Preguntas Celador</h1>
        <form action="#" className='bg-slate-500 rounded-2xl p-4 flex flex-col w-96' id='login-form' onSubmit={handleSubmit}>
          <label className='text-center text-white font-bold text-2xl mb-2' htmlFor="user">Usuario</label>
          <input className='rounded-3xl p-2' type="text" name="user" id="user" value={userData.name} onChange={handleChange}/>
          <label className='text-center text-white font-bold text-2xl mb-2' htmlFor="password">Contraseña</label>
          <input className='rounded-3xl p-2' type="password" name="password" id="password" value={userData.password} onChange={handleChange}/>
          <input className='rounded-full bg-slate-400 w-2/4 p-3 mt-3 mx-auto cursor-pointer hover:scale-110 transition-all' type="submit" value="Iniciar Sesion" />
          {error == true ? <h2 className=' bg-red-600 text-white text-2xl text-center p-2 mt-2 rounded-xl'>Datos incorrectos</h2> : ""}
          {correct == true ? <h2 className=' bg-green-600 text-white text-2xl text-center p-2 mt-2 rounded-xl'>Datos correctos</h2> : ""}
        </form>
        <a href="/signup" className='mt-3 rounded-full bg-slate-400 p-2 hover:scale-110 transition-all'>Crear cuenta</a>
      </div>
    </>
  )
}

export default App
