import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = (props) => {
  const {showalert}=props;
  const host = "http://localhost:5000"
  const [credential, setcredential] = useState({name:"", email: "", password: "" })
  let navigate=useNavigate();
  const handlesubmit = async(e) => {
      e.preventDefault();

      const response = await fetch(`${host}/api/auth/createuser`, {
          method: 'POST',

          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({name:credential.name, email: credential.email, password: credential.password }) // body data type must match "Content-Type" header

      });
      const res=await response.json();
      if(res.success)
      {
          //redirect
          localStorage.setItem('token',res.Userauth);
          navigate("/");
          showalert("Sign Up successfully","success");
          console.log(res.Userauth);
      }
      else{
        showalert("User with this email is already registered","info");

      }
      console.log( res);
  }
  const onChange = (e) => {
      setcredential({ ...credential, [e.target.name]: e.target.value })
  }
  return (

    <div className='container'>
            <h2 >Signup to  start using iNotebook</h2>

      <form onSubmit={handlesubmit}>
      <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name='name' onChange={onChange} minLength={5} required aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" onChange={onChange} minLength={8} required name='password'/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" onChange={onChange} minLength={8} required name='cpassword'/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup