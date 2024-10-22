//Pages
import { Signin } from "Pages/Signin";
import { Signup } from "Pages/Signup";
import { Dashboard } from "Pages/Dashboard";

//React-Router
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

//Components
import PrivateRoute from "Components/PrivateRouter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Signup />} />
        <Route exact path="/signin" element={<Signin />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
