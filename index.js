// Check if a new tab is opened
var isNewTab = false;

// Listen for the focus event (tab switch)
window.onfocus = function () {
  if (localStorage.getItem("isTabActive") === null) {
    // This is a new tab
    isNewTab = true;
    localStorage.setItem("isTabActive", "true");
  } else {
    // This is not a new tab
    isNewTab = false;
  }
};

// Function to generate a random tab ID
function generateTabID() {
  return Math.random().toString(36).substr(2, 10);
}

// Function to set the initial values when the page loads
function initializeValues() {
  //   const currentTabID = generateTabID();

  let currentTabID;

  if (isNewTab) {
    currentTabID = generateTabID();
  } else {
    currentTabID = sessionStorage.getItem("tabID");
  }

  if (!currentTabID) {
    currentTabID = generateTabID();
    sessionStorage.setItem("tabID", currentTabID);
  }
  localStorage.setItem("tabID", currentTabID);

  document.getElementById("currentTabID").textContent = currentTabID;

  const openedFromID = getQueryParameter("openedFromID");
  localStorage.setItem(openedFromID, currentTabID);
  document.getElementById("openedFromID").textContent = openedFromID || "N/A";

  // Set the localStorageValue based on openedFromID
  const localStorageValueElement = document.getElementById("localStorageValue");
  localStorageValueElement.textContent = `page loaded from tab ${openedFromID}`;
}

// Function to extract query parameters from the URL
function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Function to update the "openedFromID" element
function updateOpenedFromID() {
  const openedFromID = getQueryParameter("openedFromID") || "N/A";
  document.getElementById("openedFromID").textContent = openedFromID;
}

// Add event listener to the "Open New Tab" button
const newTabButton = document.getElementById("newTabButton");
newTabButton.addEventListener("click", () => {
  const currentTabID = localStorage.getItem("tabID");
  // Open a new tab with the same HTML file (index.html) and pass the currentTabID as openedFromID
  const newTab = window.open("index.html?openedFromID=" + currentTabID);
});

// Call the initializeValues function when the page loads
initializeValues();

// Call the function to update the "openedFromID" element when the new tab loads
updateOpenedFromID();
