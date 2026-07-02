export default function StatusBadge({
  status,
}: {
  status: string;
}) {
  const normalizedStatus =
    status.toUpperCase();

  let classes =
    "px-3 py-1 rounded-full text-sm font-semibold";

  if (normalizedStatus === "PENDING") {
    classes +=
      " bg-yellow-100 text-yellow-700";
  } else if (
    normalizedStatus === "CONFIRMED"
  ) {
    classes +=
      " bg-green-100 text-green-700";
  } else if (
    normalizedStatus === "COMPLETED"
  ) {
    classes +=
      " bg-blue-100 text-blue-700";
  } else {
    classes +=
      " bg-red-100 text-red-700";
  }

  return (
    <span className={classes}>
      {status}
    </span>
  );
}