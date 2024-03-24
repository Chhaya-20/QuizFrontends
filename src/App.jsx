

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'
// import Login from '../components/login';
 import Signup from './components/SignUp';
 import Forget from './components/Forget';
import Home from './components/Home';
// import AddTopic  from '../../backend/controllers/Quiz';
import Addques  from './components/Addques'
import AddTopic  from './components/AddTopic'
import Quiz from './components/Quiz'

function App() {
 

  return (
    <>
     <Router>
      <Routes>
      <Route exact path="/" element={<Login />} />

        <Route exact path="/home" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route exact path="/forget" element={<Forget />} />
        {/* <Route exact path="/result" element={<Result />} /> */}
        <Route exact path="/addtopic" element={<AddTopic />} />
        <Route exact path="/addques" element={<Addques />} />
        <Route exact path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
    </>
  )
}

export default App


// https://quizapp-li67.onrender.com/