import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CandidateCard from "@/features/candidates/components/CandidateCard";
import CandidateDetail from "@/features/candidates/components/CandidateDetail";
import CandidateEditor from "@/features/candidates/components/CandidateEditor";
import {
  selectActiveTab,
  selectSearchTerm,
  selectSelectedCandidate,
  selectViewMode,
} from "@/features/candidates/candidatesSelectors";
import {
  setSelectedCandidate,
  setViewMode,
  clearSelectedCandidate,
} from "@/features/candidates/candidatesUI.slice";
import ConfirmModal from "@/components/modals/ConfirmModal";

// Dummy data
const initialCandidates = [
  {
    id: "1",
    name: "Yunus YILDIZ",
    position: "Full-Stack Developer",
    status: "Interviewed",
    tags: ["remote", "junior","qualified","first"],
    createdAt: "2024-10-10T12:00:00Z",
  },
  {
    id: "2",
    name: "Liam Chen",
    position: "UI/UX Designer",
    status: "Rejected",
    tags: ["full-time", "hybrid"],
    createdAt: "2024-10-11T10:30:00Z",
  },
  {
    id: "3",
    name: "Noah Müller",
    position: "Backend Developer",
    status: "Rejected",
    tags: ["onsite", "contract"],
    createdAt: "2024-10-12T08:15:00Z",
  },
  {
    id: "4",
    name: "Alice Morgan",
    position: "Frontend Developer",
    status: "Pending",
    tags: ["remote", "junior"],
    createdAt: "2024-10-10T12:00:00Z",
  }
];

export default function Candidates() {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);
  const viewMode = useSelector(selectViewMode);
  const selectedCandidate = useSelector(selectSelectedCandidate);
  const searchTerm = useSelector(selectSearchTerm);

  const [candidates, setCandidates] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState(null);

  useEffect(() => {
    setCandidates(initialCandidates);
  }, []);

  const handleSave = (candidate) => {
    const exists = candidates.find((c) => c.id === candidate.id);
    if (exists) {
      setCandidates((prev) =>
        prev.map((c) => (c.id === candidate.id ? candidate : c))
      );
    } else {
      setCandidates((prev) => [candidate, ...prev]);
    }
  };

  const handleDeleteRequest = (candidate) => {
    setCandidateToDelete(candidate);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setCandidates((prev) =>
      prev.filter((c) => c.id !== candidateToDelete.id)
    );
    dispatch(clearSelectedCandidate());
    dispatch(setViewMode("list"));
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setCandidateToDelete(null);
  };

  const filtered = candidates.filter((c) => {
    const matchesTab = activeTab === "All" || c.status === activeTab;
    const matchesSearch = c.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // 🔁 EDIT
  if (viewMode === "edit") {
    return (
      <CandidateEditor
        candidate={selectedCandidate}
        onSave={handleSave}
      />
    );
  }

  // 🔁 VIEW
  if (viewMode === "view" && selectedCandidate) {
    return (
      <>
        <CandidateDetail
          candidate={selectedCandidate}
          onDelete={handleDeleteRequest}
        />
        <ConfirmModal
          isOpen={showConfirm}
          title="Delete Candidate"
          message="Are you sure you want to delete this candidate?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      </>
    );
  }

  return (
    <>
      {/* ✅ New Candidate Button */}
      <div className="flex justify-end px-6 pb-4">
        <button
          onClick={() => dispatch(setViewMode("edit"))}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + New Candidate
        </button>
      </div>

      {/* ✅ List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 pb-6">
        {filtered.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onDelete={handleDeleteRequest}
          />
        ))}
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        title="Delete Candidate"
        message="Are you sure you want to delete this candidate?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
}