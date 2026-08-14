function Suggestions({ suggestions }) {
  const items = suggestions || [];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-semibold text-gray-800">
        Suggestions
      </h2>

      {items.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">
          No suggestions available.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {items.map((suggestion, index) => (
            <div
              key={index}
              className="flex gap-3 rounded-lg bg-gray-50 p-4"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                {index + 1}
              </div>

              <p className="text-sm leading-6 text-gray-700">
                {suggestion}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Suggestions;