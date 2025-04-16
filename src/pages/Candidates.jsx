import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CandidateCard from "@/features/candidates/components/CandidateCard";
import CandidateDetail from "@/features/candidates/components/CandidateDetail";
import CandidateEditor from "@/features/candidates/components/CandidateEditor";
import ConfirmModal from "@modals/ConfirmModal";
import {
  selectActiveTab,
  selectSearchTerm,
  selectSelectedCandidate,
  selectViewMode,
  selectAllCandidates,
} from "@features/candidates/candidatesSelectors";
import {
  setViewMode,
  clearSelectedCandidate,
} from "@features/candidates/candidatesUI.slice";
import {
  loadCandidates,
  addCandidateThunk,
  updateCandidateThunk,
  deleteCandidateThunk,
} from "@features/candidates/candidatesThunks";

export default function Candidates() {
  const dispatch = useDispatch();
  const candidates = useSelector(selectAllCandidates);
  const activeTab = useSelector(selectActiveTab);
  const viewMode = useSelector(selectViewMode);
  const selectedCandidate = useSelector(selectSelectedCandidate);
  const searchTerm = useSelector(selectSearchTerm);

  const [showConfirm, setShowConfirm] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState(null);

  useEffect(() => {
    dispatch(loadCandidates());
  }, [dispatch]);

  const filtered = candidates.filter((c) => {
    const matchesTab = activeTab === "All" || c.status === activeTab;
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleSave = (candidate) => {
    if (candidate.id) {
      dispatch(updateCandidateThunk(candidate));
    } else {
      dispatch(addCandidateThunk(candidate));
    }
  };

  const handleDeleteRequest = (candidate) => {
    setCandidateToDelete(candidate);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (candidateToDelete) {
      dispatch(deleteCandidateThunk(candidateToDelete.id));
      dispatch(clearSelectedCandidate());
      dispatch(setViewMode("list"));
    }
    setShowConfirm(false);
    setCandidateToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setCandidateToDelete(null);
  };

  if (viewMode === "edit") {
    return <CandidateEditor candidate={selectedCandidate} onSave={handleSave} />;
  }

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
      <div className="flex justify-end px-6 pb-4">
        <button
          onClick={() => dispatch(setViewMode("edit"))}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + New Candidate
        </button>
      </div>

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