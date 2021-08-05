import 'bootstrap/dist/css/bootstrap.min.css';

import Menu from './components/Menu';
import Routes from './routes';

import { isAuthenticated } from './services/auth';

function App() {
  return (
    <div className="App">
      {isAuthenticated() ? <Menu></Menu> : ''}
      <Routes></Routes>
    </div>
  );
}

export default App;
