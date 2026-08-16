import { useState } from "react";
import { uploadResume } from "../api/resumeApi";
import { useNavigate } from "react-router-dom";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploaded, setUploaded] = useState(false);

  const navigate = useNavigate();

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    setUploaded(false);
    setUploadError("");

    if (selectedFile.type !== "application/pdf") {
      setFile(null);
      setError("Please select a PDF file.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setFile(null);
      setError("Your resume must be 5 MB or smaller.");
      return;
    }

    setFile(selectedFile);
    setError("");
  }

  async function handleUpload() {
    if (!file) return;

    setLoading(true);
    setUploadError("");
    setUploaded(false);

    try {
      const data = await uploadResume(file);

      console.log(data);

      setUploaded(true);

      navigate(`/analysis/${data.analysis._id}`);
    } catch (error) {
      console.error("Analysis failed:", error);

      // User is not authenticated
      if (error.response?.status === 401) {
        navigate("/login", {
          state: {
            message: "Please login first to analyze your resume.",
          },
        });

        return;
      }

      setUploadError(
        error.response?.data?.error ||
          "Failed to analyze resume. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10 flex justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl border-2 border-dashed border-gray-300 bg-white p-10 text-center shadow-sm transition hover:border-blue-400">

        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-50 text-3xl">
            📄
          </div>
        </div>

        <h2 className="mt-5 text-xl font-semibold text-gray-800">
          Upload your resume
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          PDF only • Max 5 MB
        </p>

        <label className="mt-6 inline-block cursor-pointer rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
          Choose PDF

          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <p
          className={`mt-6 text-sm ${
            error ? "text-red-500" : "text-gray-600"
          }`}
        >
          {error
            ? error
            : file
              ? `📄 ${file.name}`
              : "No file selected yet"}
        </p>

        {uploadError && (
          <p className="mt-3 text-sm text-red-500">
            {uploadError}
          </p>
        )}

        <button
          disabled={!file || loading}
          onClick={handleUpload}
          className={`mt-5 rounded-lg px-6 py-3 font-medium text-white transition ${
            file && !loading
              ? "bg-green-600 hover:bg-green-700"
              : "cursor-not-allowed bg-gray-400"
          }`}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {uploaded && (
          <div className="mt-5 rounded-lg bg-green-50 p-4">
            <p className="font-semibold text-green-700">
              ✓ Resume analyzed successfully
            </p>

            <p className="mt-1 text-sm text-green-600">
              {file.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeUpload;