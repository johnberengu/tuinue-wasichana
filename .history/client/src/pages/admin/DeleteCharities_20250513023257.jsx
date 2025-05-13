import React, { useEffect, useState } from "react";
import "../../styles/DeleteCharities.css";

const DeleteCharities = () => {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all registered charities
  useEffect(() => {
    const fetchCharities = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/charities");
        const data = await res.json();
        setCharities(data);
      } catch (error) {
        console.error("Error fetching charities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharities();
  }, []);

  // Handle delete action
  const handleDelete = async (id, full_name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${full_name}"? This cannot be undone.`
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/admin/${id}/delete`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCharities((prev) => prev.filter((charity) => charity.id !== id));
      } else {
        const errorData = await response.json();
        alert(`Failed to delete: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error deleting charity:", error);
    }
  };

  return (
    <div className="delete-charities-container">
      <h2>Delete Registered Charities</h2>

      {loading ? (
        <p>Loading charities...</p>
      ) : charities.length === 0 ? (
        <p>No charities found.</p>
      ) : (
        <ul className="charity-list">
          {charities.map((charity) => (
            <li key={charity.id} className="charity-item">
              <div className="charity-info">
                <strong>{charity.full_name || "Unnamed Charity"}</strong>
                <span className="charity-type">
                  {charity.type === "individual"
                    ? "Individual"
                    : "Organization"}
                </span>
              </div>
              <button
                onClick={() => handleDelete(charity.id, charity.full_name)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeleteCharities;
