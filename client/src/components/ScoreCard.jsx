function ScoreCard({ analysis }) {
  const categoryScores = analysis?.categoryScores || {};

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">


      <div className="text-center">
        <p className="text-sm font-medium text-gray-500">
          Overall Score
        </p>

        <p className="mt-2 text-6xl font-bold text-blue-600">
          {analysis?.overallScore ?? 0}
        </p>

        <p className="mt-1 text-sm text-gray-400">
          out of 100
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800">
          Category Scores
        </h2>

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {Object.entries(categoryScores).map(
            ([category, score]) => (
              <div
                key={category}
                className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center"
              >
                <p className="text-sm capitalize text-gray-500">
                  {category}
                </p>

                <p className="mt-1 text-2xl font-bold text-gray-800">
                  {score ?? 0}
                </p>
              </div>
            )
          )}
        </div>
      </div>

    </div>
  );
}

export default ScoreCard;