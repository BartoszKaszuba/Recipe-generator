interface Props {
  data: any;
}

export default function ResponseJson({ data }: Props) {
  if (!data) return null;

  return (
    <div className="mb-6 p-4 bg-white rounded border border-gray-200">
      <h2 className="text-sm font-semibold mb-3 text-gray-700">API Response (JSON)</h2>
      <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-xs">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
