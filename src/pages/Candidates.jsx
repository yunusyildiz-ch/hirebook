import CandidateCard from "../components/CandidateCard";

const Candidates = () => {
  const mockCandidates = [
    { name: "Alice Morgan", position: "Frontend Developer", status: "Pending" },
    { name: "Liam Chen", position: "UI/UX Designer", status: "Interviewed" },
    { name: "Noah Müller", position: "Backend Developer", status: "Rejected" },
  ];

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Candidates</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockCandidates.map((candidate, index) => (
          <CandidateCard key={index} {...candidate} />
        ))}
      </div>
    </div>
  );
};

export default Candidates;