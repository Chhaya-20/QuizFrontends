import React, { useState, useEffect } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import Quiz from '../components/Quiz'
// import { useNavigate , Link } from 'react-router-dom';


function Home() {
    
    const navigate = useNavigate();
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [loading,setloading]=useState(false)

    const fetchTopics = async () => {
        setloading(true)
        try {
            const response = await fetch('https://quizbackend-5phh.onrender.com/api/quiz/gettopics');
            if (!response.ok) {
                alert("Error Occurred !");
                return;
            }
            const data = await response.json();
           
            setTopics(data);
          setloading(false)
        } catch (error) {
            console.error("Internal Server Error", error);
        }
    }

    const fetchques = async (id) => {
        try {
          
            localStorage.setItem('fetchid',id);
           navigate('/quiz')
            
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        } else {
            fetchTopics();
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <>
         {loading ? (
      <div
        
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
            <button onClick={logout} className='btn btn-primary logout'>Logout</button>
            <div className="home">
                <div className="topics">
                    <h2 className='Text-center' style={{ textAlign: "center", fontWeight: "bold" }}>Select Topic For Quiz:</h2>
                    <div className="topic-buttons ">
                        {topics.map((topic, index) => (
                            topic.questions.length > 0 && (
                                <button
                                    key={index}
                                    className="btn btn-primary mt-3"
                                    style={{"marginRight":"10px"}}
                                    onClick={() => fetchques(topic._id)}
                                >
                                    {capitalizeFirstLetter(topic.topic)}
                                </button>
                            )
                        ))}
                    </div>
                </div>
                <div style={{"position":"absolute" , "bottom":0 , }}>
                <a  style={{"color":"black" , "fontSize":"20px" , "textDecoration":"underline"}} 
                className='fw-bold' href="/addtopic"
                onMouseEnter={(e) => { e.target.style.color = "blue"; }} // Change color on hover
  onMouseLeave={(e) => { e.target.style.color = "black"; }} // Restore original color
                >Contribute to a Topic or ques</a>
                </div>
               
            </div>
            </>
    )}

        </>
    );
}

export default Home;
