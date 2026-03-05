
import './App.css'

import AboutUs from './Pages/AboutUs';
import Contact from './Pages/Contact';
import HomePage from './Pages/HomePage';
import NotFound from './Pages/NotFound';
import RequireAuth from './Components/Auth/RequireAuth';
import Denied from './Pages/Denied';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { Routes, Route } from 'react-router-dom';
import EditProfile from './Pages/User/EditProfile';
import ForgotPassword from './Pages/User/forgotPassword';
import Profile from './Pages/User/Profile';
import ResetPassword from './Pages/User/resetPassword';
import ChangePassword from './Pages/User/changePassword';

import AdminDashboard from './Pages/Dashboard/AdminDashboard';
import Checkout from './Pages/Payment/Checkout';
import CheckoutFailure from './Pages/Payment/CheckoutFailure';
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess';

import CourseDescription from './Pages/Course/CourseDescription';
import CourseList from './Pages/Course/CourseList';
import CreateCourse from './Pages/Course/CreateCourse';
import Displaylectures from './Pages/Dashboard/Displaylectures';
import Addlecture from './Pages/Dashboard/Addlecture';

function App() {
  
  return (
   

     <Routes>
         <Route path="/" element={<HomePage />}/>
         <Route path="/about" element={<AboutUs />} />
           <Route path="/courses" element={<CourseList />} />
          <Route path="/contact" element={<Contact />} />
           <Route path="/denied" element={<Denied />} />


           <Route path="/course/description" element={<CourseDescription />} />


           <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} /> 
          <Route path='/changepassword' element={<ChangePassword />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />


 <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
  <Route path="/course/create" element={<CreateCourse />} />
   <Route path="/course/addlecture" element={<Addlecture />} />
   <Route path="/admin/dashboard" element={<AdminDashboard />} />
 </Route>


   <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
<Route path='/user/profile' element={<Profile />} />
          <Route path='/user/editprofile' element={<EditProfile />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/checkout/success' element={<CheckoutSuccess />} />
          <Route path='/checkout/fail' element={<CheckoutFailure />} />
          <Route path='/course/displaylectures' element={<Displaylectures />}/>
   
   </Route>
              
         <Route path="*" element={<NotFound />}></Route>
  </Routes>
  );
}

  


export default App;
