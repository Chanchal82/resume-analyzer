import { useState } from "react";
import { uploadResume } from "../api/resumeApi";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [extractedText, setExtractedText] = useState("");

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    setUploaded(false);
    setExtractedText("");
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
    setExtractedText("");

    try {
      const data = await uploadResume(file);

      console.log(data);

      setUploaded(true);
      setExtractedText(data.text);
    } catch (error) {
      console.error("Upload failed:", error);

      setUploadError(
        error.response?.data?.error ||
          "Failed to upload resume. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center mt-12 px-4">

      <div className="w-full max-w-xl rounded-2xl border-2 border-dashed border-gray-300 bg-white p-10 text-center shadow-sm hover:border-blue-400">

        <div className="flex justify-center mb-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-50 text-3xl">
            📄
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800">
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
              ? "bg-green-600 hover:bg-green-700 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? "Uploading..." : "Analyze Resume"}
        </button>


        {uploaded && (
          <div className="mt-5 rounded-lg bg-green-50 p-4 text-center">
            <p className="font-semibold  text-green-700">
              ✓ Resume uploaded successfully
            </p>

            <p className="mt-1 text-sm text-green-600">
              {file.name}
            </p>
          </div>
        )}
      </div>

      {uploaded && (
        <div className="mt-8 w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold text-gray-800">
            Extracted Resume Text
          </h2>

          <div className="mt-4 max-h-96 overflow-y-auto rounded-lg bg-gray-50 p-5">
            <pre className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
              {extractedText}
            </pre>
          </div>

        </div>
      )}
    </div>
  );
}

export default ResumeUpload;