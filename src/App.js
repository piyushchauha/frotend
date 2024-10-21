//Components
import { Signin } from 'Components/Signin';
import { Signup } from 'Components/Signup';

//React-Router
import { BrowserRouter } from 'react-router-dom';
import {Routes,Route} from 'react-router-dom';

//Dashboard
import { Dashboard} from 'Dashboard/Dashboard';

//PrivateRouter
import PrivateRoute from 'PrivateRouter/PrivateRouter';

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route  index path="/" element={<Signup/>}/>
      <Route  exact path="/signin" element={<Signin/>}/>
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
