import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./credentials/login";
import Signup from "./credentials/signup";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
