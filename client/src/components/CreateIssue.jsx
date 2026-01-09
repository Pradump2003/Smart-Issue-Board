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
      data: { title, description, priority, status, assigned },
    }).then((res) => {
      if (res?.success) {
        e.target.reset();
        fetchIssues?.();
        toast.success(res.message || "Issue created successfully");
        setOpen(false);
      } else {
        toast.error(res?.message || "Failed to create issue");
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-4">
      <div className="relative bg-white w-[90vw] sm:w-full sm:max-w-lg min-h-[55vh] sm:min-h-fit rounded-xl shadow-lg p-4 sm:p-6">
        
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-lg sm:text-xl font-semibold mb-4">Create Issue</h2>

        <form onSubmit={handleSubmit} className="grid gap-4">
          
          <input
            name="title"
            className="border p-3 rounded text-base w-full"
            placeholder="Title"
          />

          
          <textarea
            name="description"
            className="border p-3 rounded text-base min-h-[100px] w-full resize-none"
            placeholder="Description"
          />

          
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              name="priority"
              defaultValue="MEDIUM"
              className="border p-3 rounded w-full sm:w-1/2"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>

            <input
              name="assigned"
              className="border p-3 rounded w-full sm:w-1/2"
              placeholder="Assigned To (email)"
            />
          </div>

          
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:flex-1 bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 disabled:opacity-60 transition"
            >
              {loading ? "Creating..." : "Create Issue"}
            </button>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full sm:flex-1 border py-3 rounded hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
