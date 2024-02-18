import { useContext, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
//context
import { ExpensesContext } from "../store/expense-contex";
//useCollection
import { useCollection } from "../hooks/useCollection";
function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const { documents:AllExpenses } = useCollection("expenses");
  const [recentExpenseesState,setRecentExpenseesState]=useState('')
  // const recentExpensees = expensesCtx.expenses.filter((expense) => {
  //   const today = new Date();
  //   const date7DaysAgo = getDateMinusDays(today, 7);
  //   return expense.date > date7DaysAgo && expense.date <= today;
  // });
 const recentExpensees = AllExpenses?AllExpenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return (
      new Date(expense.date) > date7DaysAgo && new Date(expense.date) <= today
    );
  }):null
  return (
    <>  
    {AllExpenses&&
      <ExpensesOutput
        expenses={recentExpensees}
        expensesPeriod="Last 7 Days"
        fallbackText="No expenses registered for the last 7 days."
      />
    }
    </>
  );
}
export default RecentExpenses;
