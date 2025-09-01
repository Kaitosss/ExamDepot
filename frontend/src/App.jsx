import { Route, Routes, BrowserRouter, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import AdminHome from "./pages/AdminHome";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import useAuthStore from "./store/useAuthStore";
import { LoaderCircle } from "lucide-react";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import NewPassword from "./pages/NewPassword";
import SlideBar from "./components/SlideBar"; 
import ManageUser from "./pages/ManageUser";
import EditExam from "./pages/EditExam";
import ManagExams from "./pages/ManagExams";
import SearchExam from "./pages/SearchExam";
import EditUser from "./pages/EditUser";
import ProtectedRoute from "./components/ProtectedRoute";
import UserHome from "./pages/UserHome";
import DetailExamUser from "./pages/DetailExamUser";

function AppRoutes() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const location = useLocation();
  const path = location.pathname;
  const hideSidebarPaths = ["/profile","/newpassword","/login"]

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="size-10 animate-spin" />
      </div>
    );

  return (
    <div className="bg-base-100 text-base-content">
      <Toaster position="top-center" reverseOrder={false} />
      {path === "/login" ? null : <Navbar />}
      <div className="flex">
         {hideSidebarPaths.includes(path) ? null : <SlideBar />}
      <div className="flex-1 p-4">
      <Routes>
        <Route path="/" element={
          !authUser ? <Navigate to={"/login"} />
          : authUser.role == "admin" ? (
            <Navigate to={"/admin/home"} />
          )
          : <Navigate to={"/user/home"}/>
          } />
        <Route path="/admin/home" element={
          <ProtectedRoute role={"admin"}>
            <AdminHome />
          </ProtectedRoute>
          } />
          <Route path="/user/home" element={
            <ProtectedRoute role={"student"}>
              <UserHome />
            </ProtectedRoute>
          }/>

        <Route path="/detailexam/:id" element={<ProtectedRoute role={"student"}><DetailExamUser/></ProtectedRoute>} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to={"/"} />} />
        <Route path="/profile" element={!authUser ? <Navigate to={"/login"} /> : <Profile />} />
        <Route path="/newpassword" element={!authUser ? <Navigate to={"/login"} /> : <NewPassword />} /> 

        
        <Route path="/manageexam" element={<ProtectedRoute role={"admin"}> <ManagExams/> </ProtectedRoute> } />
        <Route path="/manageusers" element={<ProtectedRoute role={"admin"}> <ManageUser /> </ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute role={"admin"}> <EditExam /> </ProtectedRoute> } />
        <Route path="/search" element={<ProtectedRoute role={"admin"}> <SearchExam /> </ProtectedRoute> } />
        <Route path="/edituser/:id" element={<ProtectedRoute role={"admin"}> <EditUser /> </ProtectedRoute>} />
      </Routes>
      </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
