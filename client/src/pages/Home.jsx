import ResumeUpload from "../components/ResumeUpload";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Resume Reviewer
          </h1>

          <p className="mt-3 text-gray-500">
            Upload your resume and get an AI-powered analysis.
          </p>
        </div>

        <ResumeUpload />
      </div>
    </div>
  );
}

export default Home;