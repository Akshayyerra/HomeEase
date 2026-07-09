"use client";

interface Props {
  status: string;
}

export default function StatusBadge({
  status,
}: Props) {
  const colors: Record<string, string> = {
    PENDING:
      "bg-yellow-100 text-yellow-700",
    CONFIRMED:
      "bg-green-100 text-green-700",
    IN_PROGRESS:
      "bg-orange-100 text-orange-700",
    COMPLETED:
      "bg-blue-100 text-blue-700",
    CANCELLED:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-4 py-2 font-bold ${
        colors[status] ??
        "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}