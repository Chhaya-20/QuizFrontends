import React, { useState } from 'react'
import './style.css'
import { useNavigate , Link } from 'react-router-dom';

function AddTopic() {
  const navigate = useNavigate();
  const[loading,setloading]=useState(false)
    const [topic,settopic]=useState("")



    const addtopic=async(e)=>{
      e.preventDefault(); 

      setloading(true)
        try {
            const response = await fetch('https://quizbackend-5phh.onrender.com/api/quiz/addtopic', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({topic}), 
            });
        setloading(false)
            if (!response.ok) {
              alert("Error Occured !");
              return;
            }
            const data = await response.json();
           localStorage.setItem('topicid',data.id);
            navigate('/addques');
          } catch (error) {
            console.error("Internal Server Error", error);
          }


    } 
    
    
    
    
    return (
      <>
      {loading ? (
        <div
          className="flex flex-col justify-center items-center m-0 p-0"
          style={{ height: "100vh" , "width":"100vw"  , "display":"flex" , "justifyContent":"center" ,  "alignItems" : "center" ,"flexDirection":"column" }}
          >
          <img
            style={{ height: "10vh" }}
            src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif"
            alt=""
          />
          <p>Loading....</p>
        </div>
        
      ):
   ( <div className="upper">
    <div className="forms content">
    <form method="POST">
        <h3 className='text-center mb-5'>ADD  TOPIC  NAME</h3>
        <div className="mb-3">
    <label htmlFor="topic" className="form-label">Topic Name</label>
    <input value={topic} onChange={(e)=>settopic(e.target.value)} type="text" className="form-control" id="topic" />
  </div>
  <button onClick={addtopic} type="submit" className="btn btn-primary" style={{width:"100%"}}>Next</button>

</form>
    </div>
    </div>)
      }
      </>
   
  )
}

export default AddTopic
