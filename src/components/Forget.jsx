import React , {useState} from 'react'
import '../App.css'
import './style.css'

import { useNavigate , Link } from 'react-router-dom';
function Forget() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
   const[loading,setloading]=useState(false)

  const forget = async (e) => {

    e.preventDefault();
    setloading(true)
    try {
      const response = await fetch('https://quizbackend-5phh.onrender.com/api/user/forget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
setloading(false)
      if (!response.ok) {
        alert(response.message)
        return;
      }
      navigate('/login');
      
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
      
    ):(
   <div className="upper">

  
    <div className="forms content">
    <form>
        <h1 className='text-center mb-5'>Reset Password</h1>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Enter email</label>
    <input value={email} onChange={(e)=>setEmail(e.target.value)} name='email' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Enter new Password</label>
    <input value={password} onChange={(e)=>setPassword(e.target.value)} name='password' type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
 
  <button type="submit" style={{width:"100%"}} className="btn btn-primary">
 
    <Link  onClick={forget} style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', outline: 'none' }}>Update Password</Link>

</button>
</form>
    </div>
    </div>
    )}
   </>
    

  )
}

export default Forget
