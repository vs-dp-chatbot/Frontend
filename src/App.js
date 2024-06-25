import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Suspense} from "react";
import Main from './components/Main';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
              <Route path="/" element={<Suspense><Main/></Suspense>} />
          </Routes>
      </Router>

    </div>
  );
}

export default App;
