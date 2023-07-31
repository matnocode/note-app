import { FC } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from "./pages/Container";
import Home from "./pages/home/Home";
import FileExplorer from "./pages/fileExplorer/FileExplorer";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Container />}>
          <Route path="home" element={<Home />} />
          <Route path="files" element={<FileExplorer />} />
          <Route path="*" element={<>NotFound</>} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
