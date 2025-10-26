import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { getPolicy, updatePolicy } from "../../firebase";

export default function PolicyManager() {
  const [policy, setPolicy] = useState(null);
  const [policyId, setPolicyId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPolicyData();
  }, []);

  const fetchPolicyData = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getPolicy();

      // Assuming each document has a "content" field (Markdown text)
      const policies = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log('Policies', policies);

      if (policies.length > 0) {
        setPolicy(policies[0].content || "No content available.");
        setPolicyId(policies[0].id);
        setEditedContent(policies[0].content || "");
      } else {
        setPolicy("No privacy policy found in the database.");
      }
    } catch (err) {
      console.error("Error fetching policy:", err);
      setError("Failed to load privacy policy.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(policy);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(policy);
  };

  const handleSave = async () => {
    if (!policyId) {
      setError("No policy ID found. Cannot save.");
      return;
    }

    try {
      setSaving(true);
      const result = await updatePolicy(policyId, { content: editedContent });

      if (result.success) {
        setPolicy(editedContent);
        setIsEditing(false);
        setError(null);
      } else {
        setError("Failed to save policy: " + result.error);
      }
    } catch (err) {
      console.error("Error saving policy:", err);
      setError("Failed to save policy.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-300">
        Loading privacy policy...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-400 py-20">
        {error}
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Header with Edit/Save/Cancel buttons */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-100">Privacy Policy Manager</h1>
        <div className="flex gap-3">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              Edit Policy
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                disabled={saving}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content Area */}
      {isEditing ? (
        <div className="space-y-4">
          <div className="text-sm text-gray-400 mb-2">
            Edit your policy content using Markdown syntax
          </div>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full h-[600px] p-4 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            placeholder="Enter your privacy policy content here (Markdown supported)..."
          />
          <div className="text-xs text-gray-500">
            Tip: Use Markdown formatting. Preview will be shown after saving.
          </div>
        </div>
      ) : (
        <div className="prose prose-invert max-w-none bg-gray-900 p-8 rounded-lg border border-gray-800">
          <ReactMarkdown>{policy}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
