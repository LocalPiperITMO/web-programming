import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Main from "./Index";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/main" element={<Main />}></Route>
      </Routes>
    </div>
  );
}

export default App;
