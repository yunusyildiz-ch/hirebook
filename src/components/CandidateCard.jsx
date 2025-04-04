const CandidateCard = ({ name, position, status }) => {
    const statusColors = {
      Pending: "bg-yellow-200 text-yellow-800",
      Interviewed: "bg-blue-200 text-blue-800",
      Rejected: "bg-red-200 text-red-800",
    };
  
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{position}</p>
        <span className={`text-xs px-2 py-1 rounded ${statusColors[status]}`}>
          {status}
        </span>
      </div>
    );
  };
  
  export default CandidateCard;