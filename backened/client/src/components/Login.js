import React,{useState} from 'react'
import {  useNavigate } from 'react-router-dom'
const Login = (props) => {
    const host = "http://localhost:5000"
    const {showalert}=props;
    const [credential, setcredential] = useState({ email: "", password: "" })
    let navigate=useNavigate();
    const handlesubmit = async(e) => {
        e.preventDefault();

        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credential.email, password: credential.password }) // body data type must match "Content-Type" header

        });
        const res=await response.json();
        if(res.success)
        {
            //redirect
            localStorage.setItem('token',res.authtoken);
            showalert("Logged in successfully","success");
            navigate("/");
console.log(res.authtoken);
        }
        else{
            showalert("Invalid Ceredential","warning");
        }
        console.log( res);
    }
    const onChange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value })
    }


    return (
        <div >
            <h2 >Login to continue on iNotebook</h2>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credential.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credential.password} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login