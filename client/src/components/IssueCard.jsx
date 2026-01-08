import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function IssueCard({ issue, fetchIssues }) {
  const [status, setStatus] = useState(issue.status);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const newStatus = e.target.value;

    if (status === "OPEN" && newStatus === "RESOLVED") {
      toast.info(
        "Please move the issue to In Progress before marking it as Done"
      );
      return;
    }

    if (newStatus === status) return;

    setStatus(newStatus);
    setLoading(true);

    try {
      const res = await fetch(
        `${BASE_URL}/api/v1/issue/update-status/${issue._id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to update status");
      }
      if (result && result.success) {
        if (fetchIssues) fetchIssues();
        toast.success("Status updated successfully");
      } else {
        throw new Error(result.message || "Failed to update status");
      }
    } catch (error) {
      toast.error(error.message);
      setStatus(issue.status); 
    } finally {
      setLoading(false);
    }
  };
  if (!issue) {
    return null;
  }
  return (
    <div key={issue._id} className="bg-white p-5 rounded-xl shadow mb-4">
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
        <b>Assigned:</b> {issue?.assigned?.email} | <b>Created By:</b>{" "}
        {issue.createdBy}
      </div>

      <p className="text-xs text-blue-600 mt-2">
        ℹ Issue must move from Open → In Progress → Done
      </p>

      <div className="mt-3">
        <select
          value={status}
          disabled={loading}
          onChange={handleChange}
          className="px-3 py-2 rounded border bg-white text-sm font-medium cursor-pointer disabled:opacity-60"
        >
          <option value="OP">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESOLVED">Done</option>
        </select>
      </div>
    </div>
  );
}
