import { useState } from "react";
import CandidateCard from "../components/CandidateCard";

const Candidates = () => {
  const allCandidates = [
    {
      name: "Alice Morgan",
      position: "Frontend Developer",
      status: "Pending",
      tags: ["remote", "junior"],
    },
    {
      name: "Liam Chen",
      position: "UI/UX Designer",
      status: "Interviewed",
      tags: ["full-time", "hybrid"],
    },
    {
      name: "Noah Müller",
      position: "Backend Developer",
      status: "Rejected",
      tags: ["contract", "onsite"],
    },
  ];

  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCandidates = allCandidates.filter((candidate) => {
    const matchesStatus =
      statusFilter === "All" || candidate.status === statusFilter;
    const matchesSearch = candidate.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Candidates</h2>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Search by name..."
          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {["All", "Pending", "Interviewed", "Rejected"].map((status) => (
          <button
            key={status}
            className={`px-3 py-1 rounded border ${
              statusFilter === status
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-800"
            }`}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Filtered List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCandidates.map((candidate, index) => (
          <CandidateCard key={index} {...candidate} />
        ))}
      </div>
    </div>
  );
};

export default Candidates;