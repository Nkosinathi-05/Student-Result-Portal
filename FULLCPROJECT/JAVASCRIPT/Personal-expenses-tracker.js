if (!localStorage.getItem("expensesArray")) {
  const expensesArray = [];
  localStorage.setItem("expensesArray", JSON.stringify(expensesArray));
}
viewExpenses();

function addExpenses() {
  let expensesArrayBack = JSON.parse(
    localStorage.getItem("expensesArray") || "[]",
  );
  let expense = document.getElementById("js-expenses-input").value;
  let amount = Number(document.getElementById("js-amount-input").value);

  if (!expense || !amount) {
    alert("Please enter valid data");
    return;
  }
  expensesArrayBack.push({ expense, amount });
  document.getElementById("js-amount-input").value = "";
  document.getElementById("js-expenses-input").value = "";
  localStorage.setItem("expensesArray", JSON.stringify(expensesArrayBack));
  viewExpenses();
}
function viewExpenses() {
  let expensesArrayBack = JSON.parse(
    localStorage.getItem("expensesArray") || "[]",
  );

  document.querySelector(".js-expenses-list-output").innerHTML = "";
  document.querySelector(".js-expenses-list-output").innerHTML +=
    "<p class='list-grid-heading'>Name</p><p class='list-grid-heading'>Amount</p><p class='list-grid-heading'></p>";
  expensesArrayBack.forEach((expensesDetail, index) => {
    document.querySelector(".js-expenses-list-output").innerHTML +=
      `<div>${expensesDetail.expense}</div><div>R${expensesDetail.amount}</div>  <button onclick= "deleteExpense(${index})" class='delete-expense-button'>DELETE</button>`;
  });

  totalSpending();
}
function deleteExpense(index) {
  let expensesArrayBack = JSON.parse(
    localStorage.getItem("expensesArray") || "[]",
  );
  expensesArrayBack.splice(index, 1);
  localStorage.setItem("expensesArray", JSON.stringify(expensesArrayBack));
  viewExpenses();
  totalSpending();
}
function totalSpending() {
  let totalAmount = 0;
  let expensesArrayBack = JSON.parse(
    localStorage.getItem("expensesArray") || "[]",
  );

  document.querySelector(".js-total-amount-output").innerHTML = "";
  expensesArrayBack.forEach((expensesDetail) => {
    totalAmount += expensesDetail.amount;
  });
  document.querySelector(".js-total-amount-output").innerHTML =
    `Total amount spent is R${totalAmount}`;
}

//ENTER KEY CODE
document.addEventListener("keydown", function (event) {
  if (
    event.key === "Enter" &&
    (event.target.id === "js-expenses-input" ||
      event.target.id === "js-amount-input")
  ) {
    addExpenses();
  }
});
