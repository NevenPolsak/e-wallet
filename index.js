//5)FORMATTED TIME FUNCTION
function getFormattedTime() {
  //4)DATE VARIABLE
  const now = new Date().toLocaleTimeString("en-us", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  //console.log(now)
  const date = now.split(",")[0].split(" ");
  const time = now.split(",")[1];
  return `${date[1]} ${date[0]},${time}`;
  //console.log(formattedTime)
  //console.log(date)
}

//1) FORM SUBMIT ADD EVENT
document
  .querySelector("#ewallet-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    //console.log("Form submited");

    const type = document.querySelector(".add-type").value;
    const desc = document.querySelector(".add-description").value;
    const value = document.querySelector(".add-value").value;
    //console.log(type,desc,value)

    if (desc.length > 0 && value.length) {
      addItems(type, desc, value);
      resetForm();
    }
  });

showItems();

//8)SHOW ITEMS FUNCTION
function showItems() {
  let items = getItemsFromLS();
  const collection = document.querySelector(".collection");

  for (let item of items) {
    const newHtml = `
    
    <div class="item">
    <div class="item-description-time">
      <div class="item-description">
        <p>${item.desc}</p>
      </div>
      <div class="item-time">
        <p>${item.time}</p>
      </div>
    </div>
    <div class="item-amount ${
      item.type === "+" ? "income-amount" : "expense-amount"
    }"> 
      <p>${item.type}$${sep(item.value)}</p>
    </div>
  </div>
    `;

    collection.insertAdjacentHTML("afterbegin", newHtml);
  }
}

//3)FUNCTIONS ADD ITEMS 3-1
function addItems(type, desc, value) {
  const time = getFormattedTime();
  const newHtml = `

    <div class="item">
    <div class="item-description-time">
      <div class="item-description">
        <p>${desc}</p>
      </div>
      <div class="item-time">
        <p>${time}</p>
      </div>
    </div>
    <div class="item-amount ${
      type === "+" ? "income-amount" : "expense-amount"
    }"> 
      <p>${type}$${sep(value)}</p>
    </div>
  </div>
    `;
  //  console.log(newHtml)

  const collection = document.querySelector(".collection");
  collection.insertAdjacentHTML("afterbegin", newHtml);

  addItemToLS(type, desc, value, time);

  showTotalIncome();
  showTotalExpense();
  showTotalBalance();
}

//2)REST FORM FUNCTION
function resetForm() {
  document.querySelector(".add-type").value = "+";
  document.querySelector(".add-description").value = "";
  document.querySelector(".add-value").value = "";
}

//7)GET ITEMS FROM LOCAL STORAGE FUNCTION 
function getItemsFromLS() {
  let items = localStorage.getItem("items");
  
  if (items) {
    items = JSON.parse(items);
  } else {
    items = [];
  }

  return items;
}

//6)ADD ITEM TO LOCAL STORAGE FUNCTION 
function addItemToLS(type, desc, value, time) {
  let items = getItemsFromLS();
  
  items.push({
    desc,
    time,
    type,
    value,
  });
  localStorage.setItem("items", JSON.stringify(items));
}


showTotalIncome();

//9)SHOW TOTAL INCOME 
function showTotalIncome() { 
  let items = getItemsFromLS();
  let totalIncome = 0;

  for (let item of items) {
    if (item.type === "+") {
      totalIncome += parseInt(item.value);
    }
  }

  //console.log(totalIncome)
  document.querySelector(".income-amount p").innerText = `$${sep(totalIncome)}`;
}


showTotalExpense();
//10)SHOW TOTAL EXPENSE FUNCTION 
function showTotalExpense() {
  let items = getItemsFromLS();
  let totalExpense = 0;
  
  for (let item of items) {
    if (item.type === "-") {
      totalExpense += parseInt(item.value);
    }
  }

  // console.log(totalExpense)
  document.querySelector(".expense-amount p").innerText = `$${sep(
    totalExpense
  )}`;
}


showTotalBalance();
//11)SHOW TOTAL BALANCE FUNCTION 
function showTotalBalance() {
  let items = getItemsFromLS();
  let balance = 0;
  
  for (let item of items) {
    if (item.type === "+") {
      balance += parseInt(item.value);
    } else {
      balance -= parseInt(item.value);
    }
  }

  document.querySelector(".balance-amount p").innerText = sep(balance);

  /*
  if (balance >= 0) {
    document.querySelector("header").className = "green";
  } else {
    document.querySelector("header").className = "red";
  }
*/
  document.querySelector("header").className = balance >= 0 ? "green" : "red";
}

//12)FUNCTION SEPARATOR 
function sep(amount) {
  amount = parseInt(amount);
  return amount.toLocaleString();
}

/**
   * <div class="item">
          <div class="item-description-time">
            <div class="item-description">
              <p>Salary</p>
            </div>
            <div class="item-time">
              <p>24 Feb, 09:45 AM</p>
            </div>
          </div>
          <div class="item-amount income-amount">
            <p>+$1000</p>
          </div>
        </div>
   */
