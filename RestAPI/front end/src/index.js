import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Home from './pages/home';
import Login from './pages/auth/login';
import Search from './pages/search';
import Sort from './pages/sort';
import Profile from './pages/profile';
import Signin from './pages/auth/signin';
import Forget from './pages/auth/forget';
import Detail from './pages/detail';
import Setting from './pages/profile/setting';
import ChangePassword from './pages/profile/changepassword';
import Personal from './pages/profile/personal';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/sort" element={<Sort />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="personal" element={<Personal />} />
        <Route path="changepassword" element={<ChangePassword />} />
        <Route path="setting" element={<Setting />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="forget" element={<Forget />} />
        <Route path="login" element={<Login />} />
        <Route path="signin" element={<Signin />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
