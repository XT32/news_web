import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

const Homepage = lazy(() => import('./pages/homepage'));
const NewsPage = lazy(() => import('./pages/newsPage.jsx'));
const NewsMorePage = lazy(() => import('./pages/newsMorePage'));
const LoginPage = lazy(() => import('./pages/loginPage'));
const SignupPage = lazy(() => import('./pages/signupPage'));
const ForgotPassword = lazy(() => import('./pages/forgotPassword'));
const VerificationPage = lazy(() => import('./pages/verificationPage'));
const NewPasswordReset = lazy(() => import('./pages/newPasswordReset'));
const DashboardAdmin = lazy(() => import('./pages/admin/dashboardAdmin.jsx'));
const NewsManagement = lazy(() => import('./pages/admin/newsManagement.jsx'));
const UsersAdmin = lazy(() => import('./pages/admin/usersAdmin.jsx'));
const ProfileAdmin = lazy(() => import('./pages/admin/profileAdmin.jsx'));
const DashboardJurnalis = lazy(() => import('./pages/jurnalis/dashboardJurnalis.jsx'));
const NewsJurnalis = lazy(() => import('./pages/jurnalis/newsJurnalis.jsx'));
const ProfileJurnalis = lazy(() => import('./pages/jurnalis/profileJurnalis.jsx'));
const CreateNews = lazy(() => import('./pages/jurnalis/createNews.jsx'));
const ProfileUser = lazy(() => import('./pages/user/profileUser.jsx'));
const SaveNews = lazy(() => import('./pages/user/saveNews.jsx'));
const Notification = lazy(() => import('./pages/user/notification.jsx'));







function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

ReactDOM.createRoot(document.getElementById('app')).render(     
  <BrowserRouter>
    <Suspense fallback={<div>Loading halaman...</div>}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/newsMore" element={<NewsMorePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/forgotpassword/verification" element={<VerificationPage />} />
        <Route path="/forgotpassword/newpassword" element={<NewPasswordReset />} />
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/admin/news" element={<NewsManagement />} />
        <Route path="/admin/users" element={<UsersAdmin />} />
        <Route path="/admin/profile" element={<ProfileAdmin />} />
        <Route path="/jurnalis/dashboard" element={<DashboardJurnalis />} />
        <Route path="/jurnalis/news" element={<NewsJurnalis />} />
        <Route path="/jurnalis/profile" element={<ProfileJurnalis />} />
        <Route path="/jurnalis/create-news" element={<CreateNews />} />
        <Route path="/user/profile" element={<ProfileUser />} />
        <Route path="/user/save-news" element={<SaveNews />} />
        <Route path="/user/notification" element={<Notification />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);
