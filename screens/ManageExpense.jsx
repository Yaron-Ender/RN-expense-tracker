import { View, StyleSheet } from "react-native";
import { useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { GlobalStyles } from "../constants/styles";
//context
import { useContext } from "react";
import { ExpensesContext } from "../store/expense-contex";
//firestore
import { useFirestore } from "../hooks/useFirestore";
function ManageExpenses({ route, navigation }) {
  const expenseCtx = useContext(ExpensesContext);
  const {addDocument} = useFirestore('expenses');
  //we have to check witch event navigated to here
  // add expense or edit expense
  // if the id is defined it means that we should display edit expense
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  //fetch the data
   const selectedExpense = expenseCtx.expenses.find(
     (expense) => expense.id === editedExpenseId
   );

  useLayoutEffect(() => {
    //   navigation.setOptions({title:editedExpenseId?'edited Expense':'Add Expense'})
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);
  function deleteExpenseHandler() {
    expenseCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler(expenseData) {
    if (isEditing) {
      expenseCtx.updateExpense(editedExpenseId,expenseData);
    } else {
      addDocument(expenseData)
      expenseCtx.addExpense(expenseData);
    }
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}
export default ManageExpenses;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
