import React, { useEffect, useState } from "react";
import "../../styles/DeleteCharities.css";

const DeleteCharities = () => {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/charities")
      .then((res) => res.json())
      .then((data) => {
        setCharities(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching charities:", error));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this charity?"))
      return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/charities/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCharities(charities.filter((charity) => charity.id !== id));
      } else {
        const errorData = await response.json();
        alert(`Failed to delete: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error deleting charity:", error);
    }
  };

  if (loading) return <p>Loading charities...</p>;

  return (
    <div className="delete-charities-container">
      <h2>Delete Registered Charities</h2>
      {charities.length === 0 ? (
        <p>No charities available.</p>
      ) : (
        <ul className="charity-list">
          {charities.map((charity) => (
            <li key={charity.id} className="charity-item">
              <span>{charity.full_name}</span>
              <button
                onClick={() => handleDelete(charity.id)}
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
