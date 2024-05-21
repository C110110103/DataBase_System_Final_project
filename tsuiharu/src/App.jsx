import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';


const Register = lazy(() => import("./components/register/Register"));
const Login = lazy(() => import("./components/login/login"));
const CreateForm = lazy(() => import("./components/createForm/CreateForm"));
const Home = lazy(() => import("./components/home/Home"));
const ModifyForm = lazy(() => import("./components/modifyForm/ModifyForm"));

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/home"
            element={
              <Suspense fallback={<div>Loading...</div>} >
                <Home />
              </Suspense>
            }
            exact
          ></Route>


          <Route
            path="/register"
            element={
              <Suspense fallback={<div>Loading...</div>} >
                <Register />
              </Suspense>
            }
            exact
          ></Route>

          <Route
            path="/login"
            element={
              <Suspense fallback={<div>Loading...</div>} >
                <Login />
              </Suspense>
            }
            exact
          ></Route>

          <Route
            path="/createForm"
            element={
              <Suspense fallback={<div>Loading...</div>} >
                <CreateForm />
              </Suspense>
            }
            exact
          ></Route>

          <Route
            path="/modifyForm/:FormId"
            element={
              <Suspense fallback={<div>Loading...</div>} >
                <ModifyForm />
              </Suspense>
            }
            exact
          ></Route>




        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
