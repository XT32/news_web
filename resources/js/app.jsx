import React from "react"
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import ReactDOM from 'react-dom/client';     
import Homepage from "./pages/homepage";
import NewsPage from "./pages/newsPage.jsx"
import NewsMorePage from "./pages/newsMorePage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import ForgotPassword from "./pages/forgotPassword";
import VerificationPage from "./pages/verificationPage";
import NewPasswordReset from './pages/newPasswordReset';
import DashboardAdmin from './pages/admin/dashboardAdmin.jsx'
import NewsManagement from './pages/admin/newsManagement.jsx'



ReactDOM.createRoot(document.getElementById('app')).render(     
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/newsMore" element={<NewsMorePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/forgotpassword/verification" element={<VerificationPage />} />
      <Route path="/forgotpassword/newpassword" element={<NewPasswordReset />} />
      <Route path="/admin" element={<DashboardAdmin />} />
      <Route path="/admin/news" element={<NewsManagement />} />
    </Routes>
  </BrowserRouter>
);
