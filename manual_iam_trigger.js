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

braze.subscribeToInAppMessage(function(inAppMessage) {
// control group messages should always be "shown" - this will log an impression and not show a visible message
    if (inAppMessage instanceof braze.ControlMessage) {
        return braze.showInAppMessage(inAppMessage);
        console.log("Control Group IAM");
    }
  
    if (inAppMessage instanceof braze.InAppMessage) {
        const extras = inAppMessage.extras;
        if (extras && extras.user_type) {
            if (extras.user_type === 'standard' & isStandard = true) {
                console.log("User type is standard");
                braze.showInAppMessage(inAppMessage);
            } else if (extras.user_type === 'premium'& isPremium = true) {
                console.log("User type is premium");
                braze.showInAppMessage(inAppMessage);
            } else {
                console.log("User type is not standard or premium");
            }
        } else {
            console.log("No user type information found");
        }
    }
});
