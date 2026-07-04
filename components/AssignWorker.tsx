"use client";

import { useRouter } from "next/navigation";

interface Worker {
  id: string;
  name: string;
}

interface Props {
  bookingId: string;
  workers: Worker[];
}

export default function AssignWorker({
  bookingId,
  workers,
}: Props) {
  const router = useRouter();

  async function assignWorker(workerId: string) {
    if (!workerId) return;

    const res = await fetch(
      `/api/bookings/${bookingId}/assign`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workerId,
        }),
      }
    );

    if (res.ok) {
      alert("Worker assigned!");
      router.refresh();
    }
  }

  return (
    <select
      className="border rounded p-2"
      defaultValue=""
      onChange={(e) =>
        assignWorker(e.target.value)
      }
    >
      <option value="">
        Assign Worker
      </option>

      {workers.map((worker) => (
        <option
          key={worker.id}
          value={worker.id}
        >
          {worker.name}
        </option>
      ))}
    </select>
  );
}