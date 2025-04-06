export const formatDate = (isoString) => {
    if (!isoString) return "Unknown";
  
    try {
      const date = new Date(isoString);
      return date.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Invalid date format:", isoString);
      return "Invalid date";
    }
  };