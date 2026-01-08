import { toast } from "react-toastify";
import useFetchApi from "../hooks/useFetchApi";

export default function CreateIssue({ setOpen, fetchIssues }) {
  const { fetchApi, loading } = useFetchApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title")?.trim();
    const description = formData.get("description")?.trim();
    const priority = formData.get("priority");
    const status = formData.get("status");
    const assigned = formData.get("assigned")?.trim();

    if (!title || !description) {
      toast.error("Title and description are required");
      return;
    }

    if (title.length < 3) {
      toast.error("Title must be at least 3 characters");
      return;
    }

    fetchApi({
      url: "/api/v1/issue/create-issue",
      method: "POST",
      data: {
        title,
        description,
        priority,
        status,
        assigned,
      },
    }).then((res) => {
      if (res && res.success) {
        e.target.reset();
        if (fetchIssues) fetchIssues();
        toast.success(res.message || "Issue created successfully");
        setOpen(false);
      } else {
        toast.error(res.message || "Failed to create issue");
      }
    });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Create Issue</h2>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            name="title"
            className="border p-3 rounded"
            placeholder="Title"
          />

          <textarea
            name="description"
            className="border p-3 rounded"
            placeholder="Description"
          />

          <div className="flex gap-3">
            <select
              name="priority"
              defaultValue="MEDIUM"
              className="border p-3 rounded w-1/2"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>

            {/* <select
              name="status"
              defaultValue="OPEN"
              className="border p-3 rounded w-1/3"
            >
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Done</option>
            </select> */}

            <input
              name="assigned"
              className="border p-3 rounded w-1/2"
              placeholder="Assigned To (email)"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Issue"}
            </button>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 border py-3 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
