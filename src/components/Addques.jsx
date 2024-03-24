import React, { useState , useEffect } from 'react'
import { useNavigate , Link } from 'react-router-dom';


function Addques() {
  const[loading,setloading]=useState(false);
  
  const navigate = useNavigate()
    let[options,setopt]=useState([]);
    let[desc,setdesc]=useState("")
    let[o1,seto1]=useState("");
    let[o2,seto2]=useState("");
    let[o3,seto3]=useState("");
    let[o4,seto4]=useState("");
    let[answer,setanswer]=useState("");
    const capitalizeFirstLetter = (str) => {
    
      return str.charAt(0).toUpperCase() + str.slice(1);
  };
    const addques=async(e)=>{
      e.preventDefault(); 
    
      setloading(true)
      const topicid = localStorage.getItem('topicid');
      if(!topicid)
      {
        alert("Please first enter topic name....")
        navigate('/addtopic');
      }
        try {
          desc = capitalizeFirstLetter(desc);
          o1 = capitalizeFirstLetter(o1);
          o2 = capitalizeFirstLetter(o2);
          o3 = capitalizeFirstLetter(o3);
          o4=capitalizeFirstLetter(o4);
          answer = capitalizeFirstLetter(answer)
            const response = await fetch('https://quizbackend-5phh.onrender.com/api/quiz/addques', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({desc,o1,o2,o3,o4,answer,topicid}), 
            });
       setloading(false)
            if (!response.ok) {
              alert("Error Occured !");
              return;
            }
          
            const data = await response.json();
           //localStorage.setItem('topicid',data.id);
           alert("Successfully Added..");
           setdesc("");
           seto1("");
           seto2("");
           seto3("");
           seto4("");
           setanswer("");
           setloading(false)
          navigate('/addques');
          } catch (error) {
            console.error("Internal Server Error", error);
          }
        

    }
    const exit=async(e)=>{
      e.preventDefault(); 
     const topicid = localStorage.getItem('topicid');
      if(!topicid)
      {
        alert("Please first enter topic name....")
        navigate('/addtopic');
      }
        try {
          desc = capitalizeFirstLetter(desc);
          o1 = capitalizeFirstLetter(o1);
          o2 = capitalizeFirstLetter(o2);
          o3 = capitalizeFirstLetter(o3);
          o4=capitalizeFirstLetter(o4);
          answer = capitalizeFirstLetter(answer)

            const response = await fetch('https://quizbackend-5phh.onrender.com/api/quiz/addques', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({desc,o1,o2,o3,o4,answer,topicid}), 
            });
        
            if (!response.ok) {
              alert("Error Occured !");
              return;
            }
            const data = await response.json();
           alert("Successfully Added..");
           setdesc("");
           seto1("");
           seto2("");
           seto3("");
           seto4("");
           setanswer("");
           
          navigate('/home');
          } catch (error) {
            console.error("Internal Server Error", error);
          }

    }
    const exit1 =()=>{
      navigate('/home')
    }
    useEffect(()=>{
      const topicid = localStorage.getItem('topicid');
      if(!topicid)
      {
        alert("Please first enter topic name....")
        navigate('/addtopic');
      }
      else{
        navigate('/addques')
      }
  
    },[])

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
      <>
    <div className="upper">
    <div className="forms content">
    <form method="POST">
        <h3 className='text-center mb-5'>Add Question</h3>
       
        <div className="mb-3">
    <label htmlFor="topic" className="form-label">Enter description</label>
    <input required={true} value={desc} onChange={(e)=>setdesc(e.target.value)} type="text" className="form-control" id="desc" />
  </div>
        <div className="mb-3">
    <label htmlFor="topic" className="form-label">Enter Option 1</label>
    <input required={true} value={o1} onChange={(e)=>seto1(e.target.value)} type="text" className="form-control" id="o1" />
  </div>
  <div className="mb-3">
    <label htmlFor="topic" className="form-label">Enter Option 2</label>
    <input required={true} value={o2} onChange={(e)=>seto2(e.target.value)} type="text" className="form-control" id="o2" />
  </div>
  <div className="mb-3">
    <label htmlFor="topic" className="form-label">Enter Option 3</label>
    <input required={true} value={o3} onChange={(e)=>seto3(e.target.value)} type="text" className="form-control" id="o3" />
  </div>
  <div className="mb-3">
    <label htmlFor="topic" className="form-label">Enter Option 4</label>
    <input required={true} value={o4} onChange={(e)=>seto4(e.target.value)} type="text" className="form-control" id="o4" />
  </div>
  <div className="mb-3">
    <label htmlFor="topic" className="form-label">Enter Answer of question</label>
    <input  required={true} value={answer} onChange={(e)=>setanswer(e.target.value)} type="text" className="form-control" id="ans" />
  </div>
  <button onClick={addques}  type="submit" className="btn btn-primary mb-3" style={{width:"100%"}}>Add</button>
  <div className="btns" style={{"display":"flex"}}>
  <button  onClick={exit} type="submit" className="btn btn-primary mx-3" style={{width:"100%"}}>Add and Exit</button>
  <button  onClick={exit1} type="submit" className="btn btn-primary" style={{width:"100%"}}>Exit</button>
  </div>
  


</form>
    </div>
    </div>
    </>)}
    </>
  )
    }

export default Addques