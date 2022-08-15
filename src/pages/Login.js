import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Login.css";

function Login() {
    let [Email, setEmail] = useState("");
    let [Password, setPassword] = useState("");

    let [LoginLoader, setLoginLoader] = useState(false);

    let navigate = useNavigate();

    let submitData = async (event) => {
        event.preventDefault();
        setLoginLoader(true);
        let response_obj = await fetch("https://batman-panic-app-server.herokuapp.com/api/login"/*"http://127.0.0.1:8000/api/login"*/, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: Email,
                password: Password
            })
        });
        let response = await response_obj.json();
        setLoginLoader(false);
        if (response.status === "success") {
            sessionStorage.setItem("access_granted", true);
            sessionStorage.setItem("token", response.data.api_access_token);
            navigate("/panic");
        } else {
            alert(response.message);
        }
    };

  return (
    <div className='loginWrapper'>
        <form className="loginForm" onSubmit={submitData}>
            <div className='image'></div>
            <div className="form-group">
                <label>Email</label>
                <input className="form-control" type="text" required value={Email} onChange={(e) => {setEmail(e.target.value)}}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input className="form-control" type="password" required value={Password} onChange={(e) => {setPassword(e.target.value)}}/>
            </div>
            <div className="form-group">
                <button className="form-control" type="submit">{LoginLoader ? "Logging in..." : "Login"}</button>
            </div>
        </form>
    </div>
  )
}

export default Login