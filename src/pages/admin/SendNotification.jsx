import { useState } from "react";
import useSendNotification from "@/hooks/useSendNotification";

export default function SendNotification() {
  const { sendNotification, sending } = useSendNotification();
  const [form, setForm] = useState({
    title: "",
    message: "",
    type: "info",
    to: "all",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.message) return;
    await sendNotification(form);
    setForm({ title: "", message: "", type: "info", to: "all" });
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">📢 Send Notification</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded p-2 dark:bg-gray-800 dark:border-gray-600"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full border rounded p-2 h-24 dark:bg-gray-800 dark:border-gray-600"
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border rounded p-2 dark:bg-gray-800 dark:border-gray-600"
            >
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="error">Error</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block font-medium mb-1">To</label>
            <input
              name="to"
              value={form.to}
              onChange={handleChange}
              placeholder="all or userId"
              className="w-full border rounded p-2 dark:bg-gray-800 dark:border-gray-600"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={sending}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {sending ? "Sending..." : "Send Notification"}
        </button>
      </form>
    </div>
  );
}
