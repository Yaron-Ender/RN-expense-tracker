import { View, StyleSheet } from "react-native";
import { useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { GlobalStyles } from "../constants/styles";
//context
import { useContext } from "react";
import { ExpensesContext } from "../store/expense-contex";
//firestore
import { useFirestore } from "../hooks/useFirestore";
//Laoding spinner
import LoadingOverlay from "../components/UI/LoadingOverlay";
//Error page
import ErrorOverlay from "../components/UI/ErrorOverlay";
function ManageExpenses({ route, navigation }) {
  const expenseCtx = useContext(ExpensesContext);
  const { addDocument, getDocFromFirestore, updateDocuemt, deleteDocument } =
    useFirestore("expenses");
  const [selectedExpense, setSelectExpense] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  //we have to check witch event navigated to here
  // add expense or edit expense
  // if the id is defined it means that we should display edit expense
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  //fetch the data from the context
  //  let selectedExpense = expenseCtx.expenses.find(
  //    (expense) => expense.id === editedExpenseId
  //  );

  useLayoutEffect(() => {
    //   navigation.setOptions({title:editedExpenseId?'edited Expense':'Add Expense'})
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
    if (editedExpenseId) {
      const getdoc = async () => {
        let data = "";
        data = await getDocFromFirestore(editedExpenseId);
        setSelectExpense((prev) => (prev = data));
      };
      getdoc();
    }
  }, [navigation, isEditing, editedExpenseId, setSelectExpense]);

  function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      expenseCtx.deleteExpense(editedExpenseId);
      deleteDocument(editedExpenseId);
      navigation.goBack();
    } catch (err) {
      setError("Could not delete the document");
      setIsSubmitting(false);
    }
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expenseCtx.updateExpense(editedExpenseId, expenseData);
        //add doc to firestore
        updateDocuemt(editedExpenseId, expenseData);
      } else {
        //add doc to firestore
        addDocument(expenseData);
        expenseCtx.addExpense(expenseData);
      }
      navigation.goBack();
    } catch (err) {
     setError('Could not save the data - please try again')
     isSubmitting(false)
    }
  }
  if (isSubmitting) {
    return <LoadingOverlay />;
  }
  if (error && !isSubmitting) {
    return <ErrorOverlay />;
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        // defaultValues={selectedExpense}
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
