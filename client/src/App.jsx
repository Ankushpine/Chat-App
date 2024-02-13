import "./App.css";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from "./context/AuthContext";

import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
      <Route path='/' element={authUser ? <Home /> : <Navigate to={"/signin"} />} />
				<Route path='/signin' element={authUser ? <Navigate to='/' /> : <SignIn />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
