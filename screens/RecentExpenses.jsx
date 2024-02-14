import ExpensesOutput from "../components/ExpensesOutput";
import { getDateMinusDays } from "../util/date"; 
//context
import { useContext } from "react";
import { ExpensesContext } from "../store/expense-contex";
function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const recentExpensees = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
       const date7DaysAgo = getDateMinusDays(today,7)
       return (expense.date > date7DaysAgo)&& (expense.date <= today)
  });
  return (
    <ExpensesOutput
      expenses={recentExpensees}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}
export default RecentExpenses;
