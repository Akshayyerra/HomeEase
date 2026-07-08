export default function DateTime({
  date,
}: {
  date: Date;
}) {
  return (
    <>
      {new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Kolkata",
      }).format(new Date(date))}
    </>
  );
}