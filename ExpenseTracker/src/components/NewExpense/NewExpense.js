import { useState } from 'react';
import Form from './ExpenseForm';
import './NewExpense.css';

const NewExpense = (props)=>{
  const [isFormShow,setFormShow] = useState(false)
  const saveExpenseDataHandler = (enteredExpenseData)=>{
    const expenseData = {
      ...enteredExpenseData,
      id:new Date().getTime()
    };
    props.onAddExpense(expenseData)
    setFormShow(false);
  }
  const formShowingHandler = ()=>{
    setFormShow(true);
  } 
  const stopFormShowingHandler = ()=>{
    setFormShow(false);
  }

  return (
    <div className='new-expense'>
      {!isFormShow && <button onClick={formShowingHandler}>Add Expenses</button>}
      {isFormShow && <Form onSaveExpenseDate={saveExpenseDataHandler} onCancel={stopFormShowingHandler} />}
    </div>
  );
};

export default NewExpense;