
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { Main } from './components/main';
import { Product } from './components/product';
import { Header } from "./components/Header";
import './App.css';


function App() {
  

  return (<BrowserRouter>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product" element={<Product />} /> 
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
