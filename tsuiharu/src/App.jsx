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
              <Suspense
              // fallback={
              //   <Loading icon={"address card outline"} text={"登入"} />
              // }
              >
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
