// Variables
let monthlyBudget = 0;
let expenses = [];

// DOM elements
const budgetInput = document.getElementById('budget-input');
const budgetBtn = document.getElementById('budget-btn');
const descriptionInput = document.getElementById('description-input');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const expenseBtn = document.getElementById('expense-btn');
const tableBody = document.getElementById('table-body');
const remainingBudgetValue = document.getElementById('remaining-budget-value');
let tAmount = document.getElementById("t_amount");
let expenseCost = document.getElementById("expense-cost")
let balanceCost = document.getElementById("balance-cost")

// Event listeners
budgetBtn.addEventListener('click', addBudget);
expenseBtn.addEventListener('click', addExpense);

// Functions
function addBudget() {
  const budget = parseFloat(budgetInput.value);

  if (isNaN(budget) || budget <= 0) {
    alert('Please enter a valid monthly budget.');
    return;
  }

  monthlyBudget = budget;
  remainingBudgetValue.textContent = monthlyBudget.toFixed(2);
  budgetInput.value = '';
}

function addExpense() {
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const date = dateInput.value;

  if (description === '' || isNaN(amount) || amount <= 0 || date === '') {
    alert('Please enter valid expense details.');
    return;
  }

  const expense = {
    description: description,
    amount: amount,
    date: date

  };


  expenses.push(expense);
  displayExpense(expense);
  updateRemainingBudget();

  descriptionInput.value = '';
  amountInput.value = '';
  dateInput.value = '';
}





function displayExpense(expense) {
  const row = document.createElement('tr');
  const descriptionCell = document.createElement('td');
  descriptionCell.textContent = expense.description;
  const amountCell = document.createElement('td');
  amountCell.textContent = expense.amount.toFixed(2);
  const dateCell = document.createElement('td');
  dateCell.textContent = expense.date;

  const deleteCell = document.createElement('td');
  const deleteButton = document.createElement('td'); 
  deleteButton.textContent ='❌';

  deleteButton.addEventListener('click', function () {
  deleteExpense(row);
  updateRemainingBudget();

  });

  deleteCell.appendChild(deleteButton);

  row.appendChild(descriptionCell);
  row.appendChild(amountCell);
  row.appendChild(dateCell);
  row.appendChild(deleteCell);

  tableBody.appendChild(row);
}

function deleteExpense(row) {
  tableBody.removeChild(row);
}


function updateRemainingBudget() {
  let totalExpenses = 0;

  const rows = tableBody.getElementsByTagName('tr');
  for (let i = 0; i < rows.length; i++) {
    const amountCell = rows[i].getElementsByTagName('td')[1];
    const amount = parseFloat(amountCell.textContent);
    totalExpenses += amount;
  }
  

  const remainingBudget = monthlyBudget - totalExpenses;

  remainingBudgetValue.textContent = remainingBudget.toFixed(2);
}

