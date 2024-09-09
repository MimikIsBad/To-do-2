import "./styles.css";
import { loadHomePage } from "./homePage";
import { loadProjectPage } from "./projectPage";

document.addEventListener("DOMContentLoaded", () => {
  handlePageChange(loadHomePage, "todayBtn");

  document.getElementById("todayBtn").addEventListener("click", () => {
    console.log("Today button clicked");
    handlePageChange(loadHomePage, "todayBtn");
  });

  document.getElementById("projectBtn").addEventListener("click", () => {
    console.log("Project button clicked");
    handlePageChange(loadProjectPage, "projectBtn");
  });
});

function handlePageChange(loadPageFunction, activeButtonId) {
  // Hide all content containers
  document.getElementById("homePage").style.display = "none";
  document.getElementById("projectPage").style.display = "none";
  document.getElementById("listDisplay").style.display = "none";
  document.getElementById("projectDisplay").style.display = "none";

  // Show the relevant content container
  loadPageFunction();

  // Manage button styles
  const buttons = document.querySelectorAll(".nav-button");
  buttons.forEach((button) => button.classList.remove("selectedMenu"));
  document.getElementById(activeButtonId).classList.add("selectedMenu");
}
