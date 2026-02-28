import { useState, useEffect } from "react";
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

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    category: "",
  });

  const [expenses, setExpenses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#aa46be",
    "#ff6666",
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = () => {
    if (!expense.name || !expense.amount || !expense.category) return;

    if (editIndex !== null) {
      const updated = [...expenses];
      updated[editIndex] = {
        ...updated[editIndex],
        name: expense.name,
        amount: Number(expense.amount),
      };
      setExpenses(updated);
      setEditIndex(null);
    } else {
      setExpenses([
        ...expenses,
        {
          ...expense,
          amount: Number(expense.amount),
          date: new Date().toISOString(),
        },
      ]);
    }

    setExpense({ name: "", amount: "", category: "" });
  };

  const handleEdit = (index) => {
    const item = expenses[index];
    setExpense({
      name: item.name,
      amount: item.amount,
      category: item.category,
    });
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (!window.confirm("Delete this expense?")) return;

    const updated = [...expenses];
    updated.splice(index, 1);
    setExpenses(updated);
  };

  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const remainingBudget = TOTAL_BUDGET - totalSpent;

  const categoryData = Object.values(
    expenses.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = { name: item.category, value: 0 };
      }
      acc[item.category].value += item.amount;
      return acc;
    }, {})
  );

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
        maxWidth: "1200px",
        margin: "0 auto",
        padding: isMobile ? "10px" : "20px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? "15px" : "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* LEFT SIDE - FORM */}
      <div
        style={{
          width: isMobile ? "100%" : "50%",
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

        <div style={{ marginBottom: "15px" }}>
          <label>Category</label>
          <select
            name="category"
            value={expense.category}
            onChange={handleChange}
            disabled={editIndex !== null}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
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

        {expenses.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              marginBottom: "10px",
            }}
          >
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Amount:</strong> ₹{item.amount}</p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(item.date).toLocaleDateString("en-IN")}
            </p>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => handleEdit(index)}
                style={{
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "4px",
                }}
              >
                <FaEdit />
              </button>

              <button
                onClick={() => handleDelete(index)}
                style={{
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "4px",
                }}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE - CHARTS */}
      <div style={{ width: isMobile ? "100%" : "50%" }}>
        <h2>Analytics</h2>

        {!hasData ? (
          <div
            style={{
              marginTop: "40px",
              padding: "30px",
              textAlign: "center",
              backgroundColor: "#f5f5f5",
              borderRadius: "10px",
              color: "#777",
            }}
          >
            📊 No data available. Add expenses to see charts.
          </div>
        ) : (
          <>
            <h3>Spending by Category</h3>
            <ResponsiveContainer
              width="100%"
              height={isMobile ? 200 : 300}
            >
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={isMobile ? 70 : 100}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <h3 style={{ marginTop: "30px" }}>
              Monthly Spending Trend
            </h3>
            <ResponsiveContainer
              width="100%"
              height={isMobile ? 200 : 300}
            >
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
    </div>
  );
}

export default App;