import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Panic.css";

function Panic() {
  let [Longitude, setLongitude] = useState("");
  let [Latitude, setLatitude] = useState("");
  let [PanicType, setPanicType] = useState("");
  let [Details, setDetails] = useState("");
  let [Panics, setPanics] = useState([]);

  let [LogoutLoader, setLogoutLoader] = useState(false);
  let [GetLoader, setGetLoader] = useState(false);
  let [SendLoader, setSendLoader] = useState(false);
  let [CancelBtnNumber, setCancelBtnNumber] = useState(0);

  let [SendToggle, setSendToggle] = useState(false);
  let [CancelToggle, setCancelToggle] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    let getPanics = async () => {
      setGetLoader(true);
      let response_obj = await fetch("https://batman-panic-app-server.herokuapp.com/api/panic_history"/*"http://127.0.0.1:8000/api/panic_history"*/, {
          method: "GET",
          headers: { 
            "Accept": "application/json",
            "Authorization": "Bearer "+sessionStorage.getItem("token")
          }
      });
      let response = await response_obj.json();
      setGetLoader(false);
      if (response.status === "success") {
        setPanics(response.data.panics);
      } else {
        setPanics(response.data.panics);
        alert(response.message);
      }
    };
    getPanics();
  }, [SendToggle, CancelToggle])

  let cancelPanic = async (e) => {
    let panicID = e.target.value;
    setCancelBtnNumber(panicID);
    let response_obj = await fetch("https://batman-panic-app-server.herokuapp.com/api/cancel_panic"/*"http://127.0.0.1:8000/api/cancel_panic"*/, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Bearer "+sessionStorage.getItem("token")
        },
        body: JSON.stringify({
            panic_id: panicID
        })
    });
    let response = await response_obj.json();
    if (response.status === "success") {
      setCancelToggle(!CancelToggle);
    } else {
      setCancelToggle(!CancelToggle);
      alert(response.message);
    };
  }

  let sendPanic = async (e) => {
    e.preventDefault();
    setSendLoader(true);
    let response_obj = await fetch("https://batman-panic-app-server.herokuapp.com/api/send_panic"/*"http://127.0.0.1:8000/api/send_panic"*/, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Bearer "+sessionStorage.getItem("token")
        },
        body: JSON.stringify({
          longitude: Longitude,
          latitude: Latitude,
          panic_type: PanicType,
          details: Details
        })
    });
    let response = await response_obj.json();
    setSendLoader(false);
    if (response.status === "success") {
      setLongitude("");
      setLatitude("");
      setPanicType("");
      setDetails("");
      setSendToggle(!SendToggle);
    } else {
      alert(response.message);
    };
  };
  
  let logout = async () => {
    setLogoutLoader(true);
    let response_obj = await fetch("https://batman-panic-app-server.herokuapp.com/api/logout"/*"http://127.0.0.1:8000/api/logout"*/, {
        method: "POST",
        headers: { 
          "Accept": "application/json",
          "Authorization": "Bearer "+sessionStorage.getItem("token")
        }
    });
    let response = await response_obj.json();
    setLogoutLoader(false);
    if (response.status === "success") {
        sessionStorage.setItem("access_granted", false);
        navigate(-1);
    } else {
        alert(response.message);
    }
  };

  return (
    <div className='panicWrapper'>
      <div className='header'>
        <div className="logo"></div>
        <h1>Panic</h1>
        <button type="button" onClick={logout}>{LogoutLoader ? "Logging out..." : "Logout"}</button>
      </div>
      <div className='formWrapper'>
        <form className="panicForm" onSubmit={sendPanic}>
          <div className="form-group">
            <label>Longitude</label>
            <input className="form-control" type="text" required value={Longitude} onChange={(e) => {setLongitude(e.target.value)}}/>
          </div>
          <div className="form-group">
            <label>Latitude</label>
            <input className="form-control" type="text" required value={Latitude} onChange={(e) => {setLatitude(e.target.value)}}/>
          </div>
          <div className="form-group">
            <label>Panic Type</label>
            <input className="form-control" type="text" value={PanicType} onChange={(e) => {setPanicType(e.target.value)}}/>
          </div>
          <div className="form-group">
            <label>Details</label>
            <textarea className="form-control" type="text" value={Details} onChange={(e) => {setDetails(e.target.value)}}></textarea>
          </div>
          <div className="form-group">
            <button className="form-control" type="submit">{SendLoader ? "Sending..." : "Send Panic"}</button>
          </div>
        </form>
      </div>
      <div className='panicHistory'>
        <h2>Panic History</h2>
        {GetLoader ? 
          <div className='loader'>
            <p>Loading...</p>
          </div> :
          Panics.map((panic) => {
            return (
              <div className='historyContent' key={panic.id}>
                <div className='historyInfo'>
                  <b>{panic.panic_type}</b>
                  <p>{panic.details}</p>
                </div>
                <button type="button" value={panic.id} onClick={cancelPanic}>{CancelBtnNumber == panic.id ? "Cancelling..." : "Cancel Panic"}</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Panic