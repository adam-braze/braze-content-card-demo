// Initialize flags
let isLoggedIn = false;
let isPremium = false;
let isStandard = false;

// Function to simulate customer login
function login() {
  isLoggedIn = true;
  console.log("Customer logged in successfully.");
}

// Function to set premium status
function setPremium() {
  isPremium = true;
  isStandard = false; // Ensure only one membership status is true at a time
  console.log("Customer is now a premium member.");
}

// Function to set standard status
function setStandard() {
  isStandard = true;
  isPremium = false; // Ensure only one membership status is true at a time
  console.log("Customer is now a standard member.");
}

// Function to check flags using if statements
function checkFlags() {
  if (isLoggedIn) {
    console.log("Customer is logged in.");
    if (isPremium) {
      console.log("Customer is premium.");
    } else if (isStandard) {
      console.log("Customer is standard.");
    } else {
      console.log("Membership status not set.");
    }
  } else {
    console.log("Customer is not logged in.");
  }
}
