import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Test from './pages/Test/Test';
import Score from './pages/Score/Score';
import Protected from './components/Protected';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* component used for prevent user access the exam page when they are not login */}
      <Route element={<Protected />}>
        <Route path="/test" element={<Test />} />
        <Route path="score/:score" element={<Score />} />
      </Route>
    </Routes>
  </BrowserRouter>

  );
}

export default App
