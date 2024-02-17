import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from '../pages/loginpage';
import Homesherlock from '../pages/hompage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Homesherlock />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;