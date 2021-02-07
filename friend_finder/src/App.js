import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import home from './components/home';
import login from './components/login';
import register from './components/register';

function App() {
  return (
    <Router>
      <Route path='/' exact component={home} />
      <Route path='/Login' exact component={login} />
      <Route path='/Register' exact component={register} />
    </Router>
  );
}

export default App;
