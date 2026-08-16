import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ScoreCard from "../components/ScoreCard";
import Strengths from "../components/Strengths";
import Weaknesses from "../components/Weaknesses";
import Suggestions from "../components/Suggestions";

import Api from "../api/axios.js";

function Analysis() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await Api.get(`/resume/analyses/${id}`);
        setAnalysis(response.data.analysis);
      } catch (error) {
        console.error("Failed to fetch analysis:", error);
        setError("Failed to load resume analysis.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading analysis...</p>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">
            {error || "No resume analysis found."}
          </p>

          <button
            onClick={() => navigate("/history")}
            className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Back to History
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Resume Analysis
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {analysis.fileName}
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
          >
            ← Analyze Another Resume
          </button>
        </div>

        <div className="mt-8">
          <ScoreCard analysis={analysis} />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Strengths strengths={analysis.strengths} />

          <Weaknesses weaknesses={analysis.weaknesses} />
        </div>

        <div className="mt-6">
          <Suggestions suggestions={analysis.suggestions} />
        </div>

      </div>
    </div>
  );
}

export default Analysis;