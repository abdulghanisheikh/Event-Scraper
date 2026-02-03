import { Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminPage from "./pages/AdminPage";

const App=()=>{
  return <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/admin" element={<AdminPage />}></Route>
  </Routes>
}

export default App;