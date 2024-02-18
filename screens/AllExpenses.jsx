import ExpensesOutput from "../components/ExpensesOutput";
//context
import { useContext } from "react";
import { ExpensesContext } from "../store/expense-contex";
import { useCollection } from "../hooks/useCollection";
function AllExpenses(){
 const { documents: AllExpenses } = useCollection("expenses");
 const expensesCtx = useContext(ExpensesContext)
return (
<>
{AllExpenses&&
  <ExpensesOutput
    expensesPeriod="Total"
    expenses={AllExpenses}
    fallbackText="No registered expenses found!"
  />
}
</>
);

}
export default AllExpenses