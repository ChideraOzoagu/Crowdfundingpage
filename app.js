const menuBtn = document.querySelector(".menu-btn");
const menuOpen = document.querySelector(".menu-open");
const menuClose = document.querySelector(".menu-close");
const navContainer = document.querySelector(".nav-container");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", navToggle);
menuClose.style.display = "none";

// NAV TOGGLE FUNCTION
function navToggle() {
  const navContainerHeight = navContainer.getBoundingClientRect().height;
  if (navContainerHeight === 0) {
    navContainer.classList.add("toggle-nav");
    menuOpen.style.display = "none";
    menuClose.style.display = "inline";
    menuBtn
      .closest("body")
      .querySelector(".overlay")
      .classList.add("show-overlay");
  } else {
    navContainer.classList.remove("toggle-nav");
    menuOpen.style.display = "inline";
    menuClose.style.display = "none";
    menuBtn
      .closest("body")
      .querySelector(".overlay")
      .classList.remove("show-overlay");
  }
}

// SHOW MODAL
const projectBtn = document.querySelector(".project-button");
projectBtn.addEventListener("click", () => {
  const modalContainer =
    projectBtn.parentElement.closest(".main-container").nextElementSibling;
  modalContainer.style.display = "grid";
  projectBtn
    .closest("body")
    .querySelector(".overlay")
    .classList.add("show-overlay");
  const closeModal = modalContainer.querySelector(".modal-close");
  closeModal.addEventListener("click", () => {
    closeModal.closest(".modal-container").style.display = "none";
    closeModal
      .closest("body")
      .querySelector(".overlay")
      .classList.remove("show-overlay");
  });
});

// SHOW PLEDGES
const pledgeBtns = document.querySelectorAll(".flex-product-head");
pledgeBtns.forEach((pledgeBtn) => {
  pledgeBtn.addEventListener("click", () => {
    pledgeBtns.forEach((btns) => {
      btns.parentElement.parentElement.lastElementChild.classList.add(
        "pledge-container"
      );
    });
    pledgeBtn.parentElement.parentElement.lastElementChild.classList.remove(
      "pledge-container"
    );
  });
});

const blackStand = document.querySelector(".dollar75");

// UPDATE AMOUNT PLEDGED
// FIRST INPUT
const rewardless = document.querySelector(".dollar10");

let rewardlessValue;
rewardless.addEventListener("input", rewardlessFunc);
function rewardlessFunc() {
  rewardlessValue = parseFloat(rewardless.value);
  const continueBtn = rewardless.nextElementSibling;
  if (rewardlessValue < 10 || isNaN(rewardlessValue)) {
    errorFunc(rewardless, "Minimum pledge of $10");
    continueBtn.addEventListener("click", () => {
      const btn = continueBtn
        .closest("body")
        .querySelector(".appreciation-container");
      btn.classList.remove("show-appreciation-container");
      const closeModal = continueBtn.closest(".modal-container");
      closeModal.style.display = "grid";
    });
  } else {
    successFunc(rewardless, calculatePledge());
    continueBtn.addEventListener("click", () => {
      const btn = continueBtn
        .closest("body")
        .querySelector(".appreciation-container");
      btn.classList.add("show-appreciation-container");
      const closeModal = continueBtn.closest(".modal-container");
      closeModal.style.display = "none";
    });
  }
}
// SECOND INPUT
const bambooStand = document.querySelector(".dollar25");

// let bambooStandValue;
// bambooStand.addEventListener("change", bambooStandFunc);
// function bambooStandFunc() {
//   bambooStandValue = parseFloat(bambooStand.value);
//   const continueBtn = rewardless.nextElementSibling;
//   if (bambooStandValue < 10 || isNaN(bambooStandValue)) {
//     errorFunc(bambooStand, "Minimum pledge of $25");
//     continueBtn.addEventListener("click", () => {
//       const btn = continueBtn
//         .closest("body")
//         .querySelector(".appreciation-container");
//       btn.classList.remove("show-appreciation-container");
//       const closeModal = continueBtn.closest(".modal-container");
//       closeModal.style.display = "grid";
//     });
//   } else {
//     successFunc(bambooStand, calculatePledge());
   
//     continueBtn.addEventListener("click", () => {
//       const btn = continueBtn
//         .closest("body")
//         .querySelector(".appreciation-container");
//       btn.classList.add("show-appreciation-container");
//       const closeModal = continueBtn.closest(".modal-container");
//       closeModal.style.display = "none";
//     });
//   }
// }



// CALCULATE AND UPDATE PLEDGE
function calculatePledge() {
  if(rewardless  ) {
    let totalAmount = document.querySelector(".total-amount-raised").textContent;
    totalAmount = totalAmount.replace("$", "");
    totalAmount = totalAmount.replace(",", "");
    totalAmount = parseFloat(totalAmount);
    let amount = totalAmount + rewardlessValue;
    document.querySelector(".total-amount-raised").textContent =
      "$" + amount.toLocaleString();
  } 

  let totalPeople = document.querySelector('.total-people').textContent;
  totalPeople = totalPeople.replace(',', '')
  totalPeople = parseInt(totalPeople);
  let people = totalPeople + 1;
  document.querySelector('.total-people').textContent = people.toLocaleString();
 
}

// HOME BTUTTON
const homeBtn = document.querySelector(".home-btn");
homeBtn.addEventListener("click", homeFunc);

function homeFunc() {
  const home = homeBtn.closest(".appreciation-container");
  home.classList.remove("show-appreciation-container");
  home
    .closest("body")
    .querySelector(".overlay")
    .classList.remove("show-overlay");
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
  errorText.innerHTML = '';
}
