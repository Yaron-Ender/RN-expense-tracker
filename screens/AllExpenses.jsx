import ExpensesOutput from "../components/ExpensesOutput";
//context
import { useContext } from "react";
import { ExpensesContext } from "../store/expense-contex";
function AllExpenses(){
 const expensesCtx = useContext(ExpensesContext)
return (
  <ExpensesOutput
    expensesPeriod="Total"
    expenses={expensesCtx.expenses}
    fallbackText="No registered expenses found!"
  />
);

}
export default AllExpenses