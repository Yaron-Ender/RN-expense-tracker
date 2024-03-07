import { useContext, useState,useEffect } from "react";
import ExpensesOutput from "../components/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
//context
import { ExpensesContext } from "../store/expense-contex";
//useCollection
import { useCollection } from "../hooks/useCollection";
//Loading spinner
import LoadingOverlay from "../components/UI/LoadingOverlay";
//Error
import ErrorOverlay from "../components/UI/ErrorOverlay";
function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const { documents:AllExpenses } = useCollection("expenses");
const [isFetching,setIsFetching]=useState(true)
const [error,setError] = useState('')
useEffect(()=>{
  if(AllExpenses){
   setIsFetching(false)
   setError(null)
  }else{
    setError('could not fetch expeses')
 setIsFetching(true);
  }
},[AllExpenses,setError])
 const recentExpensees = AllExpenses?AllExpenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return (
      new Date(expense.date) > date7DaysAgo && new Date(expense.date) <= today
    );
  }):null

  if(error&&!isFetching){
    return <ErrorOverlay message={error} />;
  }
  return (
    <>  
      {isFetching&&
      <LoadingOverlay />
      }
    {AllExpenses&&!isFetching&&
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
