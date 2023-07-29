import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from "./components/common/Navbar"
import OpenRoute from './components/core/Auth/OpenRoute'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import VerifyEmail from './pages/VerifyEmail'
import About from './pages/About'
import Contact from './pages/Contact'
import Error from './pages/Error'
import MyProfile from './components/core/Dashboard/MyProfile'
import Dashboard from './pages/Dashboard'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from './utils/constants'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import Settings from "./components/core/Dashboard/Settings/Index";
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses'
import Cart from './components/core/Dashboard/Cart/Index'
import AddCourse from './components/core/Dashboard/AddCourse/Index'
import MyCourses from './components/core/Dashboard/MyCourses'
import EditCourse from './components/core/Dashboard/EditCourse/Index'
import Catalog from './pages/Catalog'
import CourseDetails from './pages/CourseDetails'
import ViewCourse from './pages/ViewCourse'
import VideoDetails from './components/core/ViewCourse/VideoDetails'


const App = () => {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className='w-screen min-h-screen'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* only those user can access the OpenRoute, which are not logged in */}

        {/* only those user can access the PrivateRoute, which are logged in */}

        <Route path='/signup' element={<OpenRoute> <Signup /> </OpenRoute>} />
        <Route path='/login' element={<OpenRoute> <Login /> </OpenRoute>} />
        <Route path='/forgot-password' element={<OpenRoute> <ForgotPassword /> </OpenRoute>} />
        <Route path='/update-password/:id' element={<OpenRoute> <UpdatePassword /> </OpenRoute>} />
        <Route path='/verify-email' element={<OpenRoute> <VerifyEmail /> </OpenRoute>} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/catalog/:catalogName' element={<Catalog />} />
        <Route path='/courses/:courseId' element={<CourseDetails />} />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/Settings" element={<Settings />} />

          {/* only student can access the cart and courses, instructor can't access them */}
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/cart" element={<Cart />} />
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
              </>
            )
          }

          {/* only Instructor can access the AddCourse and courses, instructor can't access them */}
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/add-course" element={<AddCourse />} />
                <Route path="dashboard/my-courses" element={<MyCourses />} />
                <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
                {/* <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} /> */}
              </>
            )
          }

        </Route>

        {/* for watching course lectures  */}
        <Route
        element={
          <PrivateRoute>
            <ViewCourse/>
          </PrivateRoute>
        }
        >

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route 
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails/>}
                />
              </>
            )
          }
        </Route>

        {/* 404 page not found  */}
        <Route path='*' element={<Error />} />
      </Routes>

    </div>
  )
}

export default App
