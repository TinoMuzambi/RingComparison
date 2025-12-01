"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { createUrl } from "@/utils";
import { RingType } from "@/utils";

export default function RingTypeToggle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentRingType =
    (searchParams?.get("ringType") as RingType) || "engagement";

  const handleToggle = (ringType: RingType) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("ringType", ringType);
    router.push(createUrl(pathname, newParams));
  };

  return (
    <div className="flex gap-2 items-center mt-4">
      <button
        onClick={() => handleToggle("engagement")}
        className={`px-4 py-2 rounded transition ${
          currentRingType === "engagement"
            ? "bg-blue-600 text-white font-bold"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Engagement Rings
      </button>
      <button
        onClick={() => handleToggle("wedding-band")}
        className={`px-4 py-2 rounded transition ${
          currentRingType === "wedding-band"
            ? "bg-blue-600 text-white font-bold"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Wedding Bands
      </button>
    </div>
  );
}
