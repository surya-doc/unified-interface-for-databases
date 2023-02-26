import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Postgres.css'

function Connectpost() {
    const[host, setHost] = React.useState('')
    const[user, setUser] = React.useState('')
    const[password, setPassword] = React.useState('')
    const[database, setDatabase] = React.useState('')
    const navigate = useNavigate();

    async function collectDetails(event){
        event.preventDefault();
        console.log(host, user, password, database);
        const reply = await axios.post('http://localhost:5000/postgres/newDB', {
            host: host,
            user: user,
            password: password,
            database: database
        })
        console.log(reply.data);
        alert(reply.data.message);
        const res = await axios.post('http://localhost:5000/postgres/connectDB', {host:"localhost",user:"root",password:"dana@1234",database:"social_portal"});
        console.log(res.data);
        navigate('/dashboard');
    }

  return (
    <div className="connect__info" style={{paddingTop: "40px"}}>
        <h2 style={{textAlign: "center", fontFamily: "sans-serif", letterSpacing: "2px", wordSpacing: "2px"}}>Enter your MySql details</h2>
        <form action="" style={{display: "flex", flexDirection: "column", width: "100%", alignItems: "center"}} onSubmit={(e) => collectDetails(e)}>
            <p>Host</p>
            <input type="text" onChange={(event) => setHost(event.target.value)} />
            <p>User</p>
            <input type="text" onChange={(event) => setUser(event.target.value)} />
            <p>Password</p>
            <input type="text" onChange={(event) => setPassword(event.target.value)} />
            <p>Database</p>
            <input type="text" onChange={(event) => setDatabase(event.target.value)} />
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Connectpost