import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function ShowTables() {
    const[dbName, setDbName] = React.useState('')
    const[tables, setTables] = React.useState([])
    const navigate = useNavigate();
    // const db = ;
    const db = JSON.parse(localStorage.getItem('activedb'));
    
    const getTables = async(e) => {
        // e.preventDefault();
        console.log(db);
        const reply = await axios.post('http://localhost:5000/mysql/getTables', {dbName: db.database});
        console.log(reply.data);
        setTables(reply.data.result);
    }

    useEffect(()=>{
        getTables();
    },[])

    

  return (
    <div className='abcd'>
        <h1 style={{textAlign: "center", borderBottom: "1px solid #FFF", padding: "20px 0px"}}>Tables in DB {db.database}</h1>
        <div className="tables" style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            {
                tables?.map((table, index) => {
                    return <p style={{fontSize: "20px"}} key={index}>{table.Tables_in_social_portal}</p>
                }
                )
            }
        </div>
        <div>
        </div>
    </div>
  )
}

export default ShowTables