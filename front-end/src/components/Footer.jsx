import axios from 'axios';
import React, { useState } from 'react'

function Footer() {
    const[emal, setEmail] = useState();

    async function getEmail(event){
        event.preventDefault();
        const res = await axios.post('http://localhost:5000/mysql/getReport', {
            email: emal
        });
        console.log(res);
    }

  return (
    <div className='footer' style={{position: "fixed", backgroundColor: "", width: "75%", bottom: "0", padding: "20px 0px"}}>
        <form action="" onSubmit={(event) => getEmail(event)}>
            <p>Email</p>
            <input style={{border: "none", borderRadius: "0px"}} type="text" onChange={(event) => setEmail(event.target.value)} />
            <button style={{padding: "8px 18px", border: "none"}} type='submit'>Send</button>
        </form>
    </div>
  )
}

export default Footer