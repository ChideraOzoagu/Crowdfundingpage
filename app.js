const menuBtn = document.querySelector(".menu-btn");
const menuOpen = document.querySelector(".menu-open");
const menuClose = document.querySelector(".menu-close");
const navContainer = document.querySelector(".nav-container");
const navLinks = document.querySelector(".nav-links");
const projectBtn = document.querySelector(".project-button");
const pledgeBtns = document.querySelectorAll(".flex-product-head");
const continueBtns = document.querySelectorAll(".continue-btn");
const overlay = document.querySelector('.overlay');

menuBtn.addEventListener("click", navToggle);
menuClose.style.display = "none";

// NAV TOGGLE FUNCTION
function navToggle() {
  const navContainerHeight = navContainer.getBoundingClientRect().height;
  if (navContainerHeight === 0) {
    navContainer.classList.add("toggle-nav");
    menuOpen.style.display = "none";
    menuClose.style.display = "inline";
    overlay.classList.add('show-overlay')
  
  } else {
    navContainer.classList.remove("toggle-nav");
    menuOpen.style.display = "inline";
    menuClose.style.display = "none";
    overlay.classList.remove('show-overlay')
  }

}
// BOOKMARK
let bookmarked = false;
const bookmark = document.querySelector(".bookmark p");
const circle = document.querySelector("circle");
const path = document.querySelector('path');
bookmark.addEventListener("click", () => {
  bookmarked = !bookmarked;
  if (bookmarked) {
    bookmark.textContent = `Bookmarked`;
    bookmark.style.color = "hsl(176, 72%, 28%)";
    circle.style.fill = 'hsl(176, 72%, 28%)';
    path.style.fill = 'white';
  } else {
    bookmark.textContent = `Bookmark`;
    bookmark.style.color = "hsl(0, 0%, 48%)";
    circle.style.fill = 'black';
    path.style.fill = 'hsl(0, 0%, 48%)';
  }
});

// SHOW MODAL
projectBtn.addEventListener("click", () => {
  const modalContainer =
    projectBtn.parentElement.closest(".main-container").nextElementSibling;
  modalContainer.style.display = "grid";
  overlay.classList.add('show-overlay')
  const closeModal = modalContainer.querySelector(".modal-close");
  closeModal.addEventListener("click", () => {
    closeModal.closest(".modal-container").style.display = "none";
    overlay.classList.remove('show-overlay')
  });
});

// SHOW PLEDGES
pledgeBtns.forEach((pledgeBtn) => {
  pledgeBtn.addEventListener("click", () => {
    pledgeBtns.forEach((btns) => {
      btns.parentElement.parentElement.lastElementChild.classList.add(
        "pledge-container"
      );
      btns.closest('.modal-inner').style.border = '1px solid hsl(0, 0%, 48%)';
    });
    pledgeBtn.parentElement.parentElement.lastElementChild.classList.remove(
      "pledge-container"
      );
      pledgeBtn.closest('.modal-inner').style.border = '2px solid hsl(176, 72%, 28%)'
  });
});

// UPDATE AMOUNT PLEDGED
// FIRST INPUT
let rewardlessValue;
continueBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const rewardless = btn.previousElementSibling;
    rewardlessValue = parseFloat(rewardless.value);
    if (rewardlessValue < 25 || isNaN(rewardlessValue)) {
      errorFunc(rewardless, "Minimum pledge of $25");
      const page = btn.closest("body").querySelector(".appreciation-container");
      page.classList.remove("show-appreciation-container");
      const closeModal = btn.closest(".modal-container");
      closeModal.style.display = "grid";
    } else {
      successFunc(rewardless);
      calculatePledge();
      const page = btn.closest("body").querySelector(".appreciation-container");
      page.classList.add("show-appreciation-container");
      const closeModal = btn.closest(".modal-container");
      closeModal.style.display = "none";
    }
    
  });
});

// CALCULATE AND UPDATE PLEDGE
function calculatePledge() {
  let totalAmount = document.querySelector(".total-amount-raised").textContent;
  totalAmount = totalAmount.replace("$", "");
  totalAmount = totalAmount.replace(",", "");
  totalAmount = parseFloat(totalAmount);
  totalAmount += rewardlessValue;
  document.querySelector(".total-amount-raised").textContent =
    "$" + totalAmount.toLocaleString();

  let totalPeople = document.querySelector(".total-people").textContent;
  totalPeople = totalPeople.replace(",", "");
  totalPeople = parseInt(totalPeople);
  totalPeople += 1;
  document.querySelector(".total-people").textContent =
    totalPeople.toLocaleString();
}

// HOME BTUTTON
const homeBtn = document.querySelector(".home-btn");
homeBtn.addEventListener("click", homeFunc);

function homeFunc() {
  const home = homeBtn.closest(".appreciation-container");
  home.classList.remove("show-appreciation-container");
 overlay.classList.remove('show-overlay')
}
// ERROR AND SUCCESS FUNCTION BASED ON INPUT
// error function
function errorFunc(input, message) {
  input.style.border = "2px solid red";
  const errorText = input.parentElement.parentElement.querySelector("small");
  errorText.innerHTML = message;
}

// success function
function successFunc(input) {
  input.style.border = "1px solid hsl(0, 0%, 48%)";
  const errorText = input.parentElement.parentElement.querySelector("small");
  errorText.innerHTML = "";
}

