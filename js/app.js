const budgetInput = document.getElementById("budget-input");
const budgetAmount = document.getElementById("budget-amount");
const balanceAmount = document.getElementById("balance-amount");
const budgetBtn = document.getElementById("budget-submit");
const expenseInput = document.getElementById("expense-input");
const expenseAmount = document.getElementById("expense-amount");
const amountInput = document.getElementById("amount-input");
const budgetForm = document.getElementById("budget-form");
const budgetFeedback = document.querySelector(".budget-feedback");
const expenseFeedback = document.querySelector(".expense-feedback");
const expenseBtn = document.getElementById("expense-submit");
const expenseList = document.getElementById("expense-list");
let itemList = [];
let itemId = 0;

//show balance on screen
function showBalance() {
  const spendings = totalExpense(itemList);
  const balance = parseInt(budgetAmount.textContent) - spendings;
  balanceAmount.textContent = balance;
}

//calculate total expense
function totalExpense(itemList) {
  let total = 0;
  for (var i = 0; i < itemList.length; i++) {
    total += parseInt(itemList[i].amount);
  }
  return total;
}

//show expense on screen
function showExpense() {
  const expensess = totalExpense(itemList);
  expenseAmount.textContent = expensess;
}

//delete expense form the expense list
function deleteExpense(element) {
  let parent = element.parentElement.parentElement.parentElement;
  let id = parseInt(element.dataset.id);
  //remove from the dom
  expenseList.removeChild(parent);
  let tempList = itemList.filter(function(item) {
    return item.id !== id;
  })
  itemList = tempList;

}

//edit expense
function editExpense(element) {
  let parent = element.parentElement.parentElement.parentElement;
  let id = parseInt(element.dataset.id);
  //remove from the dom
  expenseList.removeChild(parent);
  //remove from the array of the expenses(itemList)
  let targetExpense = itemList.filter(function (item) {
    return item.id === id;
  })
  let tempList = itemList.filter(function(item) {
    return item.id !== id;
  })
  
  itemList = tempList;

  expenseInput.value = targetExpense[0].reason;
  // console.log(targetExpense);
  amountInput.value = targetExpense[0].amount;

}

//keeps adding another div of expense
function addExpense(expense) {
  const expensee = document.createElement("div");
  expensee.classList.add("expense");
  expensee.innerHTML = `
          <div class="expense-item d-flex justify-content-between align-items-baseline">
      
          <h6 class="expense-title mb-0 text-uppercase list-item">${expense.reason}</h6>
          <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>
      
          <div class="expense-icons list-item">
      
           <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
            <i class="fas fa-edit"></i>
           </a>
           <a href="#" class="delete-icon" data-id="${expense.id}">
            <i class="fas fa-trash"></i>
           </a>
          </div>
         </div>`;
  expenseList.appendChild(expensee);
}

//what happens after clicking submit on budget form
budgetBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const value = budgetInput.value;
  if (value === "" || value < 0) {
    budgetFeedback.classList.add("showItem");
    budgetFeedback.innerHTML = `<p> Value cannot be empty or negative </p>`;
    setTimeout(function () {
      budgetFeedback.classList.remove("showItem");
    }, 2000);
  } else {
    budgetAmount.textContent = value;
    budgetInput.value = "";
    showBalance();
    showExpense();
  }
});

//what happens after clicking submit on expense form
expenseBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const value = expenseInput.value;
  const amount = amountInput.value;

  if (value === "" || amount === "" || amount < 0) {
    expenseFeedback.classList.add("showItem");
    expenseFeedback.innerHTML = `<p> Value cannot be empty or negative </p>`;
    setTimeout(function () {
      expenseFeedback.classList.remove("showItem");
    }, 2000);
  } else {
    expenseInput.value = "";
    amountInput.value = "";

    let expense = {
      id: itemId,
      amount: amount,
      reason: value,
    };
    itemId++;
    itemList.push(expense);
    addExpense(expense);
    showBalance();
    showExpense();
  }
});

expenseList.addEventListener("click", function(event) {
  if(event.target.parentElement.classList.contains('edit-icon')) {
    editExpense(event.target.parentElement);
    // console.log("hello")
    showBalance();
    showExpense();
  }
  else if(event.target.parentElement.classList.contains("delete-icon")) {
    deleteExpense(event.target.parentElement);
    showBalance();
    showExpense();
  }
})

