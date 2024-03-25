import React, { useEffect, useState } from 'react';
import { useNavigate , Link } from 'react-router-dom';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [res, setRes] = useState(false);
  const [result, setResult] = useState();
  const[loading,setloading]=useState(false)
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    setloading(true)
    try {
      const id = localStorage.getItem('fetchid');
      const response = await fetch(`https://quizbackend-5phh.onrender.com/api/quiz/getques/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      console.log(data);
      setQuestions(data);
      setloading(false)
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleOptionChange = (questionId, option) => {
    setSelectedOptions({ ...selectedOptions, [questionId]: capitalizeFirstLetter(option) });
  };
  

  const handleSubmit = () => {
    const isOptionSelectedForAllQuestions = questions.every(question => {
      return selectedOptions.hasOwnProperty(question._id);
    });

    if (isOptionSelectedForAllQuestions) {
      console.log("Selected Options:", selectedOptions);
      setSubmitted(true);

      let result = 0;
      
      for (let i = 0; i < questions.length; i++) {
        console.log(typeof questions[i].result, typeof selectedOptions[questions[i]._id]);
console.log(JSON.stringify(questions[i].result), JSON.stringify(selectedOptions[questions[i]._id]));

if (questions[i].result.trim() === selectedOptions[questions[i]._id].trim()) {
    console.log("yes");
    result = result + 10;
}
      }
      setRes(true);
      setResult(result);
    } else {
      alert("Please select an option for each question.");
    }
  };
  const back=()=>{
    navigate('/home')
  }
  const capitalizeFirstLetter = (str) => {
    
    return str.charAt(0).toUpperCase() + str.slice(1);
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
    <div className='ques'>
      {res ? (
        <>
        <div className="resut">
            <h1 className='d-block my-3'>Your Score is : {result}</h1>
            <button  onClick={back} className="btn btn-primary">Go Back to Home Page</button>
            {/* <a href="/home">Go Back to Home Page </a> */}
        </div>


        </>
      ) : (
        <>
        <div className="all">

      
          <h2 className='text-center'>QUESTIONS OF QUIZ</h2>
          <p>Each question carry 10 marks</p>
          <hr/>
         <div className="quiz">
         {questions.map((question, index) => (
            <div key={index}>
              <p className='fw-bold'>{question.ques}</p>
              <ul>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={question._id}
                      id={`${question._id}-${optionIndex}`}
                      value={capitalizeFirstLetter(option)}
                      checked={selectedOptions[question._id] === option}
                      onChange={() => handleOptionChange(question._id, option)}
                    />
                    <label className="form-check-label" htmlFor={`${question._id}-${optionIndex}`}>{option}</label>
                  </div>
                ))}
              </ul>
            </div>
          ))}
         </div>

          <button onClick={handleSubmit} className="btn btn-primary ans">Submit</button>
          </div>
        </>
       
      )}
    </div>
    )}
    </>
  );
}

export default Quiz;

