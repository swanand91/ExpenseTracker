import { useState } from "react";
import { FaEdit } from "react-icons/fa";
function App() {
  const TOTAL_BUDGET = 50000;

  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    category: "",
  });

  const [expenses, setExpenses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = () => {
    if (!expense.name || !expense.amount || !expense.category) return;

    if (editIndex !== null) {
      // Update existing expense
      const updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = {
        name: expense.name,
        amount: Number(expense.amount),
        category: expense.category,
      };

      setExpenses(updatedExpenses);
      setEditIndex(null);
    } else {
      // Add new expense
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

  const handleEdit = (index) => {
    const itemToEdit = expenses[index];

    setExpense({
      name: itemToEdit.name,
      amount: itemToEdit.amount,
      category: itemToEdit.category,
    });

    setEditIndex(index);
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
      <h2 style={{ textAlign: "center" }}>My Expense Tracker App</h2>

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
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "5px",
          }}
        />
      </div>

      {/* Amount */}
      <div style={{ marginBottom: "15px" }}>
        <label>Amount</label>
        <input
          type="number"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "5px",
          }}
        />
      </div>

      {/* Category */}
      <div style={{ marginBottom: "15px" }}>
        <label>Category</label>
        <select
          name="category"
          value={expense.category}
          onChange={handleChange}
          
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "5px",
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
              padding: "10px",
              borderRadius: "6px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <b>{item.name}</b>
            <p style={{ margin: "5px 0" }}>₹{item.amount}</p>
            <small>Category: {item.category}</small>

            <button
  onClick={() => handleEdit(index)}
  style={{
    marginTop: "8px",
    padding: "6px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <FaEdit />
</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;