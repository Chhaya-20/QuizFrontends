
import React , {useState} from 'react'

import './style.css'
import { useNavigate , Link } from 'react-router-dom';

function Signup() {
  const[loading,setloading]=useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[name,setname]=useState("")
  const navigate = useNavigate();

const Signup = async (e) => {
  e.preventDefault();
setloading(true)
  try {
    const response = await fetch('https://quizbackend-5phh.onrender.com/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }), 
    });
setloading(false)
    if (!response.ok) {
      alert("Error Occured !");
      return;
    }

    const data = await response.json();
   
    localStorage.setItem('token', data.token);
    navigate('/home');
  } catch (error) {
    console.error("Internal Server Error", error);
  }
};


  return (
    <>
     {loading ? (
      <div
        className="flex flex-col justify-center items-center m-0 p-0"
        style={{ height: "100vh" , "width":"100vw"  , "display":"flex" , "justifyContent":"center" ,  "alignItems" : "center"}}
      >
        <img
          style={{ height: "10vh" }}
          src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"
          alt=""
        />
        <p>Loading....</p>
      </div>
      
    ):(
    <div className="upper">
    <div className="forms content">
    <form>
        <h1 className='text-center mb-5'>Create Account</h1>
        <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input onChange={(e)=>setname(e.target.value)} type="text" className="form-control" id="name" />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input  onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
 
  <button onClick={Signup} type="submit" className="btn btn-primary" style={{width:"100%"}}>Sign Up</button>
  <div className="mt-3 form-check" style={{'padding':0}}>
  Already have an account ?<Link to="/login"> Login </Link>
  </div>
</form>
    </div>
    </div>
    )}
    </>

  )
}

export default Signup