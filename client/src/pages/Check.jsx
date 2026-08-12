import { useState } from "react";
import Api from "../api/resumeApi.js";

function Check() {
  const [message, setMessage] = useState("");

  function handleButton() {
    Api.get("/test")
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage("Error connecting to backend");
        console.error(error);
      });
  }

  return (
    <div className="text-center mt-12">
      <button
        onClick={handleButton}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Check Backend
      </button>

      {message && (
        <p className="mt-6 text-green-600 font-semibold">
          {message}
        </p>
      )}
    </div>
  );
}

export default Check;