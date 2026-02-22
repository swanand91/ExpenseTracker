import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function App() {
  const TOTAL_BUDGET = 50000;

  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    category: "",
  });

  const [expenses, setExpenses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  // Add or Update Expense
  const handleSubmit = () => {
    if (!expense.name || !expense.amount) return;

    if (editIndex !== null) {
      // Update only name and amount (category remains same)
      const updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = {
        name: expense.name,
        amount: Number(expense.amount),
        category: expenses[editIndex].category,
      };

      setExpenses(updatedExpenses);
      setEditIndex(null);
    } else {
      if (!expense.category) return;

      setExpenses([
        ...expenses,
        {
          name: expense.name,
          amount: Number(expense.amount),
          category: expense.category,
        },
      ]);
    }

    setExpense({ name: "", amount: "", category: "" });
  };

  // Edit Expense
  const handleEdit = (index) => {
    const item = expenses[index];

    setExpense({
      name: item.name,
      amount: item.amount,
      category: item.category,
    });

    setEditIndex(index);
  };

  // Delete Expense
  const handleDelete = (index) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) {
      return;
    }

    const newExpenses = [...expenses];
    newExpenses.splice(index, 1);
    setExpenses(newExpenses);

    // Reset edit mode if deleting same item
    if (editIndex === index) {
      setEditIndex(null);
      setExpense({ name: "", amount: "", category: "" });
    }
  };

  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const remainingBudget = TOTAL_BUDGET - totalSpent;

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Expense Tracker</h2>

      <h3
        style={{
          textAlign: "center",
          color: remainingBudget < 0 ? "red" : "green",
        }}
      >
        Remaining Budget: ₹{remainingBudget}
      </h3>

      <hr />

      {/* Expense Name */}
      <div style={{ marginBottom: "15px" }}>
        <label>Expense Name</label>
        <input
          type="text"
          name="name"
          value={expense.name}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>
        {/* Category */}
      <div style={{ marginBottom: "15px" }}>
        <label>Category</label>
        <select
          name="category"
          value={expense.category}
          onChange={handleChange}
          disabled={editIndex !== null}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "5px",
            backgroundColor: editIndex !== null ? "#eee" : "white",
          }}
        >
          <option value="">Select Category</option>
          <option value="Travel">Travel</option>
          <option value="Food">Food</option>
          <option value="Loan">Loan</option>
          <option value="Shopping">Shopping</option>
          <option value="Rent">Rent</option>
          <option value="Others">Others</option>
        </select>
      </div>

      {/* Amount */}
      <div style={{ marginBottom: "15px" }}>
        <label>Amount</label>
        <input
          type="number"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      

      {/* Add / Update Button */}
      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: editIndex !== null ? "#ff9800" : "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {editIndex !== null ? "Update Expense" : "Add Expense"}
      </button>

      <h3 style={{ marginTop: "25px" }}>Expense List</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "10px",
        }}
      >
        {expenses.map((item, index) => (
  <div
    key={index}
    style={{
      border: "1px solid #ddd",
      padding: "15px",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
    }}
  >
    <p><strong>Name:</strong> {item.name}</p>
    <p><strong>Category:</strong> {item.category}</p>
    <p><strong>Amount:</strong> ₹{item.amount}</p>
    {/* Buttons Row */}
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginTop: "10px",
      }}
    >
      <button
        onClick={() => handleEdit(index)}
        style={{
          padding: "6px 12px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        <FaEdit />
      </button>

      <button
        onClick={() => handleDelete(index)}
        style={{
          padding: "6px 12px",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        <FaTrash />
      </button>
    </div>
  </div>
  ))}
      </div>
    </div>
  );
}

export default App;