import React , {useState} from 'react'

import './style.css'
import { useNavigate , Link } from 'react-router-dom';

function Login() {
  const[loading,setloading]=useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
   
  
    const login = async (e) => {
      e.preventDefault();
      setloading(true)
      try {
        const response = await fetch('https://quizbackend-5phh.onrender.com/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  setloading(false)
        if (!response.ok) {
          alert("Wrong Credentials")
           navigate("/login")
          return;
        }
  
        const data = await response.json();
     
        localStorage.setItem('token',data.token)
        navigate('/home');
        
      } catch (error) {
        console.error("Internal Server Error");
      }
    };

  
  return (
    <>
    {loading ? (
      <div
        className="flex flex-col justify-center items-center m-0 p-0"
        style={{ height: "100vh" , "width":"100vw"  , "display":"flex" , "justifyContent":"center" ,  "alignItems" : "center","flexDirection":"column"}}
      >
        <img
          style={{ height: "10vh" }}
          src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"
          alt=""
        />
        <p>Loading....</p>
      </div>
    ) : (
    <div className="upper">
    <div className="forms content">
    <form method="POST">
        <h1 className='text-center mb-5'>Login To Account</h1>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input name="email" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input name='password'  value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3 form-check" style={{'padding':0}}>
    <Link to="/forget">Forgot Password ? </Link>
  </div>
  <button onClick={login} type="submit" className="btn btn-primary" style={{width:"100%"}}>Login</button>
  <div className="mt-3 form-check" style={{'padding':0}}>
  Don't have an account ?<Link to="/signup"> Create Account </Link>
  </div>
</form>
    </div>
    </div>
    )}
   </> 

  )
}

export default Login
