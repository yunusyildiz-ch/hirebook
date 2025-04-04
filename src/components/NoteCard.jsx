const NoteCard = ({ title, content, date }) => {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{content}</p>
        <p className="text-xs text-gray-400 mt-2">{date}</p>
      </div>
    );
  };
  
  export default NoteCard;