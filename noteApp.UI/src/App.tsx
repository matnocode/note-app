import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from "./pages/Container";
import Home from "./pages/home/Home";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Container />}>
          <Route path="home" element={<Home />} />
          <Route path="*" element={<>NotFound</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
