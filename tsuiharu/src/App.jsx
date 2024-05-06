import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


const Register = lazy(() => import("./components/register/Register"));

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
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
