import { useState } from "react";
import Card from "../UI/Card";
import ExpenseItem from "./ExpenseItem";
import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesChart from "./ExpensesChart";

function Expenses(props) {
  const [filteredYear, setFilteredYear] = useState("2020");

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };
  const filteredExpenses = props.items.filter(expense=>{
       return expense.date.getFullYear().toString() === filteredYear;
  })
  let expenseContent = <p>No Expenses Found,Please Add.</p>
  let oneExpense = <p>Only single Expense here. Please add more...</p>
  if(filteredExpenses.length>0){
    expenseContent = filteredExpenses.map((expense) => (
      <ExpenseItem
        title={expense.title}
        amount={expense.amount}
        key={expense.id}
        date={expense.date}
      />
    ))
  }
  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
       <ExpensesChart expenses={filteredExpenses} />
      {expenseContent}
      {filteredExpenses.length===1?oneExpense:"" }
     
    </Card>
  );
}

export default Expenses;
