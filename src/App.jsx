import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function App() {
  const TOTAL_BUDGET = 50000;

  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    category: "",
  });

  const [expenses, setExpenses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#aa46be", "#ff6666"];

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  // Add or Update Expense
  const handleSubmit = () => {
    if (!expense.name || !expense.amount || !expense.category) return;

    if (editIndex !== null) {
      const updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = {
        name: expense.name,
        amount: Number(expense.amount),
        category: expenses[editIndex].category,
        date: expenses[editIndex].date,
      };
      setExpenses(updatedExpenses);
      setEditIndex(null);
    } else {
      setExpenses([
        ...expenses,
        {
          name: expense.name,
          amount: Number(expense.amount),
          category: expense.category,
          date: new Date().toISOString(),
        },
      ]);
    }

    setExpense({ name: "", amount: "", category: "" });
  };

  // Edit
  const handleEdit = (index) => {
    const item = expenses[index];
    setExpense({
      name: item.name,
      amount: item.amount,
      category: item.category,
    });
    setEditIndex(index);
  };

  // Delete
  const handleDelete = (index) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;

    const newExpenses = [...expenses];
    newExpenses.splice(index, 1);
    setExpenses(newExpenses);

    if (editIndex === index) {
      setEditIndex(null);
      setExpense({ name: "", amount: "", category: "" });
    }
  };

  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const remainingBudget = TOTAL_BUDGET - totalSpent;

  // 🔹 Category Chart Data
  const categoryData = Object.values(
    expenses.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = { name: item.category, value: 0 };
      }
      acc[item.category].value += item.amount;
      return acc;
    }, {})
  );

  // 🔹 Monthly Chart Data
  const monthlyData = Object.values(
    expenses.reduce((acc, item) => {
      const month = new Date(item.date).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      if (!acc[month]) {
        acc[month] = { name: month, amount: 0 };
      }

      acc[month].amount += item.amount;
      return acc;
    }, {})
  );

  const hasData = expenses.length > 0;

  return (
    <div
      style={{
        display: "flex",
        gap: "30px",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* ================= LEFT SIDE - CHARTS ================= */}
      <div style={{ width: "50%" }}>
        <h2>Analytics</h2>

        {!hasData ? (
          <div
            style={{
              marginTop: "60px",
              padding: "50px",
              textAlign: "center",
              backgroundColor: "#f5f5f5",
              borderRadius: "10px",
              color: "#777",
              fontSize: "18px",
            }}
          >
             No data available. <br />
            Please add expenses to see charts.
          </div>
        ) : (
          <>
            {/* Pie Chart */}
            <h3>Spending by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* Bar Chart */}
            <h3 style={{ marginTop: "40px" }}>Monthly Spending Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
      </div>

      {/* ================= RIGHT SIDE - YOUR OLD UI ================= */}
      <div
        style={{
          width: "50%",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
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

        {/* Button */}
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
              <p>
                <strong>Date:</strong>{" "}
                {new Date(item.date).toLocaleDateString("en-IN")}
              </p>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
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
    </div>
  );
}

export default App;