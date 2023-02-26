import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../global/SideBar';
import Topbar from '../global/Topbar';
import './Mysql.css'

function Getdbdatas() {
    const[dbs, setDbs] = React.useState([]);
    const navigate = useNavigate();

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
    <div>
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <div style={{width: "20%"}}>
                <Sidebar />
            </div>
            <div style={{width: "75%"}}>
                <Topbar />
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
                                return <tr 
                                className='table__row'
                                onClick={async()=>{
                                    const result=await axios.post(
                                        'http://localhost:5000/mysql/connectDB',
                                        {
                                            database: db.database,
                                            host: db.host,
                                            user: db.user,
                                            password: db.password
                                        }
                                    )
                                    console.log(result.data)
                                    localStorage.setItem('activedb', JSON.stringify({
                                        database: db.database,
                                        host: db.host,
                                        user: db.user,
                                        password: db.password
                                    }));
                                    navigate('/dashboard')
                                }}>
                                        <td style={{borderRadius: "8px 0px 0px 8px"}}>{db.database}</td>
                                        <td>{db.host}</td>
                                        <td>{db.user}</td>
                                        <td style={{borderRadius: "0px 8px 8px 0px"}}>{db.password}</td>
                                </tr>
                            }):null
                            // console.log(dbs)
                        }
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Getdbdatas