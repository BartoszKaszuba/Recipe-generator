interface Props {
  data: any;
}

export default function ResponseJson({ data }: Props) {
  if (!data || !data.recipeName) return null;

  return (
    <div className="mb-6">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-leafy-green flex items-center justify-center text-white font-bold flex-shrink-0">
          AI
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 w-full">
          {data.thanks && (
            <p className="text-sm text-green-700 font-medium mb-3 bg-green-50 p-2 rounded border border-green-200">
              ✓ {data.thanks}
            </p>
          )}

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {data.recipeName}
          </h3>
          <p className="text-gray-700 mb-3">{data.summary}</p>

          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">
              Ingredients
            </h4>
            <ul className="list-disc pl-5 text-gray-700">
              {Array.isArray(data.ingredients) &&
                data.ingredients.map((ing: string, i: number) => (
                  <li key={i}>{ing}</li>
                ))}
            </ul>
          </div>

          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">
              Instructions
            </h4>
            <ol className="list-decimal pl-5 text-gray-700">
              {Array.isArray(data.instructions) &&
                data.instructions.map((step: string, i: number) => (
                  <li key={i} className="mb-1">
                    {step}
                  </li>
                ))}
            </ol>
          </div>

          {data.tips && (
            <div className="mt-2 text-sm text-gray-600">
              <strong>Tip:</strong> {data.tips}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
