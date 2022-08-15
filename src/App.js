import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from './pages/Login';
import Panic from './pages/Panic';
import ProtectedRoutes from './pages/ProtectedRoutes';

function App() {
  return (
      <div className="App">
        <Routes>
          <Route element={<ProtectedRoutes/>}>
            <Route exact path="/panic" element={<Panic />} />
          </Route>
          <Route exact path="/" element={<Login />}/>         
        </Routes>
      </div>
  );
}

export default App;
