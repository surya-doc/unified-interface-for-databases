import React from 'react'
import { SiMysql, SiPostgresql } from 'react-icons/si'
import { AiFillBackward } from 'react-icons/ai'
import './Language.css'
import { useNavigate } from 'react-router-dom'
import ShowOp from './ShowOp/ShowOp'
import { Translate } from '@mui/icons-material'
import { ImCross } from 'react-icons/im'

function Language() {
    const[show, setShow] = React.useState(true)
    const navigate = useNavigate();
  return (
    <div className="language__option"
        style={{
            display: "flex",
            width: "100%",
            minHeight: "100vh",
            fontFamily: "sans-serif",
            flexDirection: "column",
        }}
    >
        <div style={{backgroundColor: "#121a2c", textAlign: "center"}}>
            <h2 style={{borderBottom: "1px solid #FFF", width: "90%", margin: "auto", padding: "20px 0px", fontFamily: "sans-serif", letterSpacing: "2px"}}>Select your database languages</h2>
        </div>
        <div className="languag"
            style={{
                backgroundColor: "#121a2c",
                width: "100%",
                height: "100%",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div>
                <div className="mysql" style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.4)",
                    width: "280px",
                    height: "280px",
                    borderRadius: "10px",
                    margin: "0px"
                }}
                onClick={() => setShow(!show)}
                >
                    <SiMysql style={{fontSize: "100px"}} />
                </div>
                <div className="show__options" style={{zIndex: "100", display: show ? "none" : "block", position: "absolute", top: "50%", left: "50%", transform: "Translate(-50%, -50%)"}}>
                    <ShowOp style={{color: "#000000", backgroundColor: "red", zIndex: "999"}} />
                    <div style={{zIndex: "999", cursor: "pointer", position: "absolute", padding: "10px"}}
                onClick={() => setShow(!show)}>
                    <ImCross style={{color: "#141b2d", fontSize: "20px"}} />
                    </div>
                </div>
            </div>
            <div style={{padding: "0px 40px"}}>
                <div className="mysql" style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.4)",
                    width: "280px",
                    height: "280px",
                    borderRadius: "10px",
                    margin: "0px"
                }}
                onClick={() => setShow(!show)}
                >
                    <SiPostgresql style={{fontSize: "100px"}} />
                </div>
                <div className="show__options" style={{zIndex: "100", display: show ? "none" : "block", position: "absolute", top: "50%", left: "50%", transform: "Translate(-50%, -50%)"}}>
                    <ShowOp style={{color: "#000000", backgroundColor: "red", zIndex: "999"}} />
                    <div style={{zIndex: "999", cursor: "pointer", position: "absolute", padding: "10px"}}
                onClick={() => setShow(!show)}>
                    <ImCross style={{color: "#141b2d", fontSize: "20px"}} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Language