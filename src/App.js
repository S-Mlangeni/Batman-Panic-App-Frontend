import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Login from './pages/Login';
import Panic from './pages/Panic';

function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/panic" element={sessionStorage.getItem("access_granted") === "true" ? <Panic /> : <Navigate to="/"/>} />
        </Routes>
      </div>
  );
}

export default App;
