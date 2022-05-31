import React from 'react'
import {  useLocation } from "react-router-dom";
import { Link,useNavigate } from 'react-router-dom';
export default function Navbar() {
    let location = useLocation();
    const navigate=useNavigate();
    const handlelogout=()=>{
        localStorage.removeItem('token');
        navigate('/login');

    }
    return (
       
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark   " >
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">inotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/" ?"active": "" }`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/about" ?"active": "" }`} aria-current="page" to="/about">About</Link>
                            </li>


                        </ul>




                        {!localStorage.getItem('token') ?<div  className="d-flex">
                        <Link className="btn btn-primary mx-2" to='/login' role="button">Login</Link>
                        <Link className="btn btn-primary mx-2" to='/signup' role="button">SignUp</Link></div> :
                        <button className="btn btn-primary mx-2" onClick={handlelogout}   >Logout</button>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}
