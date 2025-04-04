import NoteCard from "../components/NoteCard";

const Notes = () => {
  const dummyNotes = [
    {
      title: "Meeting Notes",
      content: "Discussed candidate pipeline and next week's interviews.",
      date: "April 3, 2025",
    },
    {
      title: "Reminder",
      content: "Prepare test tasks for frontend applicants.",
      date: "April 2, 2025",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Input area */}
      <textarea
        placeholder="Write a new note..."
        className="w-full p-3 mb-6 border rounded resize-none dark:bg-gray-700 dark:text-white"
        rows="4"
      />

      {/* Static Note Cards */}
      {dummyNotes.map((note, index) => (
        <NoteCard key={index} {...note} />
      ))}
    </div>
  );
};

export default Notes;
