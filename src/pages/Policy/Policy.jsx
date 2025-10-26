import React, { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";
import { getPolicy } from "../../firebase"; // adjust path as needed

export default function Policy() {
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getPolicy();

        // Assuming each document has a "content" field (Markdown text)
        const policies = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log('Policies',policies)

        if (policies.length > 0) {
          setPolicy(policies[0].content || "No content available.");
          console.log('policies', policies[0].content)
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

    fetchPolicy();
  }, []);

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
    <div className="markdown max-w-3xl mx-auto py-16 px-4 text-brand-text">
      <Markdown>{policy}</Markdown>
    </div>
  );
}
