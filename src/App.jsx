import { useState } from "react";

function App() {
  const TOTAL_BUDGET = 50000;

  const [expense, setExpense] = useState({
    name: "",
    amount: "",
  });

  const [expenses, setExpenses] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = () => {
    if (!expense.name || !expense.amount) return;

    setExpenses([
      ...expenses,
      {
        name: expense.name,
        amount: Number(expense.amount),
      },
    ]);

    setExpense({ name: "", amount: "" });
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
      <h2 style={{ textAlign: "center" }}>My Expense Tracker App in React</h2>

      <h3
        style={{
          textAlign: "center",
          color: remainingBudget < 0 ? "red" : "green",
        }}
      >
        Total Budget: ₹{remainingBudget}
      </h3>

      <hr />

      {/* Input Section */}
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

      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Expense
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
