import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../api/axios.js";

const History = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const response = await Api.get("/resume/analyses");
        setAnalyses(response.data.analyses);
      } catch (error) {
        console.error("Failed to fetch analyses:", error);
        setError("Failed to load analysis history");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyses();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();

    const confirmed = window.confirm(
      "Are you sure you want to delete this analysis?"
    );

    if (!confirmed) return;

    try {
      await Api.delete(`/resume/analyses/${id}`);

      setAnalyses((prev) =>
        prev.filter((analysis) => analysis._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete analysis:", error);
      setError("Failed to delete analysis");
    }
  };

  const getScoreStyle = (score) => {
    if (score >= 80) {
      return {
        text: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-200",
        label: "Excellent",
      };
    }

    if (score >= 60) {
      return {
        text: "text-yellow-600",
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        label: "Good",
      };
    }

    return {
      text: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      label: "Needs Improvement",
    };
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-500">
          Loading history...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Resume Analysis History
            </h1>

            <p className="mt-2 text-gray-500">
              View and manage your previous resume analyses.
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Analyze New Resume
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Empty State */}
        {analyses.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              No analyses yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              Upload your first resume to get an AI-powered analysis.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Analyze a Resume
            </button>
          </div>
        ) : (
          /* Analysis Cards */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {analyses.map((analysis) => {
              const scoreStyle = getScoreStyle(
                analysis.overallScore
              );

              return (
                <div
                  key={analysis._id}
                  onClick={() =>
                    navigate(`/analysis/${analysis._id}`)
                  }
                  className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                >
                  {/* File name */}
                  <div className="flex items-start justify-between gap-3">
                    <h2
                      className="truncate text-lg font-semibold text-gray-900"
                      title={analysis.fileName}
                    >
                      {analysis.fileName}
                    </h2>

                    <span className="shrink-0 text-sm font-medium text-blue-600 opacity-0 transition group-hover:opacity-100">
                      View →
                    </span>
                  </div>

                  {/* Score */}
                  <div
                    className={`mt-6 rounded-xl border p-4 ${scoreStyle.bg} ${scoreStyle.border}`}
                  >
                    <p className="text-sm text-gray-500">
                      Overall Score
                    </p>

                    <div className="mt-1 flex items-center justify-between">
                      <span
                        className={`text-4xl font-bold ${scoreStyle.text}`}
                      >
                        {analysis.overallScore}
                      </span>

                      <span
                        className={`text-sm font-medium ${scoreStyle.text}`}
                      >
                        {scoreStyle.label}
                      </span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="mt-5">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Analyzed On
                    </p>

                    <p className="mt-1 text-sm text-gray-700">
                      {new Date(
                        analysis.createdAt
                      ).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(
                          `/analysis/${analysis._id}`
                        );
                      }}
                      className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                      View Analysis
                    </button>

                    <button
                      onClick={(e) =>
                        handleDelete(e, analysis._id)
                      }
                      className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;