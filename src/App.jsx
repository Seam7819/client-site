import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState([])

  useEffect(()=> {
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUser(data))
  },[])

  const addHandleSubmit = event => {
    event.preventDefault()
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const users = {name,email};
    console.log(users)

    fetch('http://localhost:5000/users',{
      method : 'POST',
      headers : {
        'content-type' : 'application/json'
      },
      body : JSON.stringify(users)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      const newUsers = [...users,data];
      setUser(newUsers)
      form.reset();
    })
  }

  return (
    <>
      <h2>User Management System</h2>
      <p>Nume of user : {user.length}</p>

      <form onSubmit={addHandleSubmit}>
        <input type="text" placeholder='name' name="name" id="" />
        <br />
        <input type="email" placeholder='email' name="email" id="" />
        <br />
        <input type="submit" value="Submit" />
      </form>
      {
        user.map(use => <p key={use.id}>{use.id}. {use.name}: {use.email}</p>)
      }
    </>
  )
}

export default App
