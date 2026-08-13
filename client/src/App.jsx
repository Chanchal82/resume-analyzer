import React from "react";
import ResumeUpload from "./components/ResumeUpload"


function App() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-blue-600 text-center mt-10">
        AI Resume Analyzer
      </h1>
      <p className="text-gray-700 text-center mt-10">
       Analyze your resume with AI and discover how to improve it. 
      </p>
      <ResumeUpload/>
   
    </div>
    
  )
}

export default App