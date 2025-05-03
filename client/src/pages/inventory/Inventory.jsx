import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/InventoryPage.css";

axios.defaults.baseURL = "http://localhost:5000"; 

const InventoryPage = ({ charityId }) => {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({
    item_name: "",
    quantity: "",
    beneficiary_name: "",
  });

  useEffect(() => {
    if (charityId) {
      fetchInventory();
    }
  }, [charityId]);

  const fetchInventory = async () => {
    try {
      const res = await axios.get(`/charities/${charityId}/inventory`);
      setInventory(res.data);
    } catch (error) {
      console.error("Failed to fetch inventory", error);
    }
  };

  const handleAddItem = async () => {
    if (!newItem.item_name || !newItem.quantity) return;
    try {
      await axios.post(`/charities/${charityId}/inventory`, {
        ...newItem,
        quantity: parseInt(newItem.quantity),
      });
      fetchInventory();
      setNewItem({ item_name: "", quantity: "", beneficiary_name: "" });
    } catch (error) {
      console.error("Add item failed", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`/charities/${charityId}/inventory/${id}`);
      fetchInventory();
    } catch (error) {
      console.error("Delete item failed", error);
    }
  };

  return (
    <div className="inventory-container">
      <h2 className="inventory-title">Inventory Page</h2>

      <div className="inventory-table">
        <div className="inventory-header">
          <div>Item</div>
          <div>Quantity</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {inventory.map((item) => (
          <div key={item.id} className="inventory-row">
            <div>{item.item_name}</div>
            <div>{item.quantity}</div>
            <div>{item.quantity > 0 ? "Sent" : "Waiting"}</div>
            <div>
              <button
                className="delete-button"
                onClick={() => handleDeleteItem(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="input-section">
        <input
          type="text"
          placeholder="Item Name"
          className="input-field"
          value={newItem.item_name}
          onChange={(e) =>
            setNewItem({ ...newItem, item_name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Quantity"
          className="input-field"
          value={newItem.quantity}
          onChange={(e) =>
            setNewItem({ ...newItem, quantity: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Beneficiary Name (optional)"
          className="input-field"
          value={newItem.beneficiary_name}
          onChange={(e) =>
            setNewItem({ ...newItem, beneficiary_name: e.target.value })
          }
        />
        <div className="button-group">
          <button className="action-button" onClick={handleAddItem}>
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
