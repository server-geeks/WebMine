import React from 'react';

import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import './ExpenseItemCss.css';

const ExpenseItem = (props) => {
  // function clickHandler() {}
  // const [title, setTitle] = useState(props.title);
  // // console.log('ExpenseItem evaluated by React');
  
  // const clickHandler = () => {
  //   setTitle('Updated!');
  //   console.log(title);
  // };
  // const [amount,setAmount]=useState(props.amount);
  //   const incrAmount = ()=>{
  //     setAmount(amount+100);
  //   }

  return (
    <Card className='expense-item'>
      <ExpenseDate date={props.date} />
      <div className='expense-item__description'>
        <h2>{props.title}</h2>
        <div className='expense-item__price'>${props.amount}</div>
      </div>
      {/* <button onClick={clickHandler}>Change Title</button>
      <button onClick = {incrAmount}>Amount+100</button> */}
    </Card>
  );
}

export default ExpenseItem;