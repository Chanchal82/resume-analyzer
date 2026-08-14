function Weaknesses({ weaknesses }) {
  const items = weaknesses || [];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-semibold text-gray-800">
        Weaknesses
      </h2>

      {items.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">
          No major weaknesses identified.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((weakness, index) => (
            <li
              key={index}
              className="rounded-lg bg-red-50 p-3 text-sm leading-6 text-gray-700"
            >
              <span className="mr-2 font-semibold text-red-500">
                !
              </span>

              {weakness}
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}

export default Weaknesses;