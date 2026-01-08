import React from "react";
import useFetchApi from "../hooks/useFetchApi";
import { useState } from "react";
import { useEffect } from "react";
import IssueCard from "../components/IssueCard";
import CreateIssue from "../components/CreateIssue";
import { useMemo } from "react";

export default function IssueList() {
  const { fetchApi, loading } = useFetchApi();

  const [issues, setIssues] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [open, setOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriorityFilter(e.target.value);
  };

  useMemo(() => {
    let filtered = [...issues];
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((issue) => issue.status === statusFilter);
    }
    if (priorityFilter !== "ALL") {
      filtered = filtered.filter((issue) => issue.priority === priorityFilter);
    }
    setFilteredData(filtered);
  }, [statusFilter, priorityFilter, issues]);

  const fetchIssues = async () => {
    try {
      fetchApi({
        url: "/api/v1/issue/my-issues",
      }).then((res) => {
        if (res && res.success) {
          setIssues(res.data || []);
          setFilteredData(res.data || []);
        } else {
          setIssues([]);
        }
      });
    } catch (error) {
      console.error("Failed to fetch issues:", error);
    }
  };
  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">🐞 Issue Tracker</h1>
      <div className="flex gap-4 mb-4 justify-between">
        <div className="flex gap-4 ">
          <select onChange={handleStatusChange} className="border p-2 rounded">
            <option value="ALL">All Status</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Done</option>
          </select>

          <select
            onChange={handlePriorityChange}
            className="border p-2 rounded"
          >
            <option value="ALL">All Priority</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="px-3 py-2 bg-blue-500 rounded-md text-white font-bold"
        >
          Create Issue
        </button>
      </div>

      {filteredData && filteredData.length ? (
        filteredData.map((issue) => (
          <IssueCard issue={issue} key={issue._id} fetchIssues={fetchIssues} />
        ))
      ) : (
        <p className="text-black text-center mt-10">
          No Issues Assigned to You !
        </p>
      )}

      {open && <CreateIssue setOpen={setOpen} fetchIssues={fetchIssues} />}
    </div>
  );
}
