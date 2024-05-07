import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


const Register = lazy(() => import("./components/register/Register"));
const Login = lazy(() => import("./components/login/login"));

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
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

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
