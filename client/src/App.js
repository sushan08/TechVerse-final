
import ReactDOM from 'react-dom';
import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Settings from "./pages/settings/Settings.jsx";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Contact from "./pages/contact/Contact.jsx";
import './app.css';
import {
  createBrowserRouter as Router,
  RouterProvider,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import About from './pages/about/About.jsx';
import { Context } from './context/Context.js';
import { useContext } from 'react';


function App() {
  const { user } = useContext(Context);
  return (

    <Routes>

      <Route index element={
        <main>
          <TopBar />
          <Home />
        </main>
      } />
      <Route path={'/login'} element={
        <main>
          <TopBar />
          {user ? <Home /> : <Login />}

        </main>
      } />
      <Route path="/about" element={
        <main>
          <TopBar />
          <About />
        </main>
      } />
      <Route path="/contact" element={
        <main>
          <TopBar />
          <Contact />
        </main>
      } />
      <Route path={'/register'} element={
        <main>
          <TopBar />
          {user ? <Home /> : <Register />}
        </main>
      } />
      <Route path={'/write'} element={
        <main>
          <TopBar />
          {user ? <Write /> : <Login />}
        </main>
      } />
      <Route path={'/settings'} element={
        <main>
          <TopBar />
          <Settings />
        </main>
      } />
      <Route path={'/post/:postID'} element={
        <main>
          <TopBar />
          <Single />
        </main>
      } />
    </Routes>





  );
}

export default App;
