import axios from 'axios'
import React, { useEffect } from 'react'
import './Mysql.css'

function Getdbdatas() {
    const[dbs, setDbs] = React.useState([]);

    async function getDBs(){
        const res = await axios.post('http://localhost:5000/mysql/getDB');
        // console.log(typeof(res.data));
        setDbs([res ? res.data : null]);
        localStorage.setItem('dbs', JSON.stringify(res ? res.data : null));
    }

    useEffect(() => {
        getDBs();
    }, [])
  return (
    <div className="Getdbdatas">
        <h1 style={{textAlign: "center", borderBottom: "1px solid #FFF", padding: "10px"}}>Getdbdatas</h1>
        <table style={{margin: "0 auto"}}>
            <tr>
                <th>Database</th>
                <th>Host</th>
                <th>User</th>
                <th>Password</th>
            </tr>
            {
                dbs?dbs[0]?.data.map((db) => {
                    return <tr>
                            <td>{db.database}</td>
                            <td>{db.host}</td>
                            <td>{db.user}</td>
                            <td>{db.password}</td>
                    </tr>
                }):null
                // console.log(dbs)
            }
        </table>
    </div>
  )
}

export default Getdbdatas