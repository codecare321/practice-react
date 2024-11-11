import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./home";
import About from "./About";
import Contact from "./Contact";
import Navbar from "./Navbar";
// import ListTable from "./components/ListTable";
import Main from "./components/Main";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/listofdata" element={<Main />}></Route>
        <Route path="/adddata" element={<Main />}></Route>

        <Route path="/adddata/:id" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
