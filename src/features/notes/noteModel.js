/**
 * Returns a new empty note object with default values.
 * @param {Object} params - Optional fields to prefill the note.
 * @param {string} params.title - Title of the note.
 * @param {string} params.text - Content of the note.
 * @returns {Object} New note object.
 */
export const createEmptyNote = ({ title = "", text = "" } = {}) => ({
  id: crypto.randomUUID(), // You can override this after Firestore returns an ID
  title,
  text,
  createdAt: new Date().toISOString(),
  updatedAt: null,
});
