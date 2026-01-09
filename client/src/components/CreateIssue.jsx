import { toast } from "react-toastify";
import useFetchApi from "../hooks/useFetchApi";
import { useState } from "react";

export default function CreateIssue({ setOpen, fetchIssues }) {
  const [similarIssues, setSimilarIssues] = useState([]);
  const [pendingIssue, setPendingIssue] = useState(null);

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

    const payload = { title, description, priority, status, assigned };

    fetchApi({
      url: "/api/v1/issue/create-issue",
      method: "POST",
      data: payload,
    }).then((res) => {
      // ✅ Created
      if (res?.success) {
        e.target.reset();
        fetchIssues?.();
        toast.success(res.message || "Issue created successfully");
        setOpen(false);
      }

      // ⚠ Duplicate found (409)
      else if (res?.statusCode === 409) {
        setSimilarIssues(res.data.similarIssues);
        setPendingIssue(payload);
      }

      // ❌ Other error
      else {
        toast.error(res?.message || "Failed to create issue");
      }
    });
  };
  const handleForceCreate = () => {
    fetchApi({
      url: "/api/v1/issue/create-issue",
      method: "POST",
      data: { ...pendingIssue, forceCreate: true },
    }).then((res) => {
      if (res?.success) {
        toast.success("Issue created despite duplicates");
        fetchIssues?.();
        setOpen(false);
        setSimilarIssues([]);
        setPendingIssue(null);
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
      {similarIssues.length > 0 && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70">
          <div className="bg-white w-[90%] max-w-md rounded-xl p-5 shadow-xl">
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              ⚠ Similar Issues Found
            </h3>

            <p className="text-sm text-gray-600 mb-3">
              These issues look similar to the one you’re creating:
            </p>

            <div className="max-h-48 overflow-auto border rounded mb-4">
              {similarIssues.map((issue) => (
                <div key={issue._id} className="p-2 border-b">
                  <p className="font-medium">{issue.title}</p>
                  <p className="text-xs text-gray-500">{issue.description}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSimilarIssues([])}
                className="flex-1 border py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleForceCreate}
                className="flex-1 bg-red-600 text-white py-2 rounded"
              >
                Create Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
