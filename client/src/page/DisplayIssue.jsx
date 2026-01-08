import { useState } from "react";

const DisplayIssue = () => {
  const [issues, setIssues] = useState([
    {
      id: 1,
      title: "Login button not working",
      description: "Login button does nothing on click",
      priority: "High",
      status: "Open",
      assignedTo: "dev1@gmail.com",
      createdBy: "tester@gmail.com",
      createdAt: "2026-01-08 10:30",
    },
  ]);

  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">🐞 Issue Tracker</h1>

      <div className="flex gap-4 mb-4 justify-between">
        <div className="flex gap-4 ">
          <select className="border p-2 rounded">
            <option>All Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          <select className="border p-2 rounded">
            <option>All Priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="px-3 py-2 bg-blue-500 rounded-md text-white font-bold"
        >
          Create Issue
        </button>
      </div>

      {issues.map((issue) => (
        <div key={issue.id} className="bg-white p-5 rounded-xl shadow mb-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">{issue.title}</h3>
            <span className="text-sm text-gray-500">{issue.createdAt}</span>
          </div>

          <p className="text-gray-700 mt-2">{issue.description}</p>

          <div className="mt-3 text-sm text-gray-600">
            <span className="mr-4">
              <b>Status:</b> {issue.status}
            </span>
            <span>
              <b>Priority:</b> {issue.priority}
            </span>
          </div>

          <div className="mt-1 text-sm text-gray-600">
            <b>Assigned:</b> {issue.assignedTo} | <b>Created By:</b>{" "}
            {issue.createdBy}
          </div>

          <p className="text-xs text-blue-600 mt-2">
            ℹ Issue must move from Open → In Progress → Done
          </p>

          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1 bg-yellow-500 text-white rounded">
              In Progress
            </button>
            <button className="px-3 py-1 bg-green-600 text-white rounded">
              Done
            </button>
          </div>
        </div>
      ))}
      
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
            
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Create Issue</h2>

            <div className="grid gap-4">
              <input className="border p-3 rounded" placeholder="Title" />

              <textarea
                className="border p-3 rounded"
                placeholder="Description"
              />

              <div className="flex gap-3">
                <select className="border p-3 rounded w-1/3">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>

                <select className="border p-3 rounded w-1/3">
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>

                <input
                  className="border p-3 rounded w-1/3"
                  placeholder="Assigned To"
                />
              </div>

              {/* <input className="border p-3 rounded" placeholder="Created By" /> */}

              <p className="text-sm text-yellow-600">
                ⚠ Similar issues may already exist
              </p>

              <div className="flex gap-3">
                <button className="flex-1 bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700">
                  Create Issue
                </button>

                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 border py-3 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayIssue;
