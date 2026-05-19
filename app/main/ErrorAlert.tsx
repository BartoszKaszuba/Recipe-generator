interface Props {
  message?: string;
}

export default function ErrorAlert({ message }: Props) {
  if (!message) return null;

  return (
    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700">
      {message}
    </div>
  );
}
