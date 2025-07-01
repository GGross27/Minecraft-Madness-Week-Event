/*** Dark Mode ***

  Purpose:
  - Use this starter code to add a dark mode feature to your website.
***/

// Step 1: Select the theme button
let themeButton  = document.getElementById("theme-button");
// Step 2: Write the callback function
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
  const currentSrc = document.body.classList.contains("dark-mode") ? '.\\img\\logo with background_darkmode.png' : './img/logo with background.png';
  document.getElementById('header-img').src = currentSrc;
    // This section will run whenever the button is clicked
}

// Step 3: Register a 'click' event listener for the theme button,
//          and tell it to use toggleDarkMode as its callback function
themeButton.addEventListener("click", toggleDarkMode);

/*** Form Handling ***

  Purpose:
  - When the user submits the RSVP form, the name and state they
    entered should be added to the list of participants.
***/

// Step 1: Add your query for the submit RSVP button here
const submitButton = document.getElementById("rsvp-button");

const addParticipant = (person) => {
  // Step 2: Write your code to manipulate the DOM here
  const newParticipant = document.createElement("p");
  newParticipant.textContent = `🧱 ${person.name} (${person.gamertag}) places their RSVP block!`;

  const participantsDiv = document.querySelector(".rsvp-participants");
  participantsDiv.appendChild(newParticipant);
};

/*** Form Validation ***

  Purpose:
  - Prevents invalid form submissions from being added to the list of participants.
***/

// Step 1: We actually don't need to select the form button again -- we already did it in the RSVP code above.

// Step 2: Write the callback function
const validateForm = (event) => {
  let containsErrors = false;
  var rsvpInputs = document.getElementById("rsvp-form").elements;

  event.preventDefault();

  const person = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    gamertag: document.getElementById("gamertag").value.trim(),
  };


  for (let i = 0; i < rsvpInputs.length; i++) {
    const input = rsvpInputs[i]; // Reference the current input element
    if (input.value.length < 2 && input.type !== 'button') { // Exclude the button from validation
      containsErrors = true;
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
  }

  if (!person.email.includes("@") && person.email.length > 0) {
    containsErrors = true;
    document.getElementById("email").classList.add('error');
    alert("Please enter a valid email address.");
  } else if (person.email.length >= 2) {
    document.getElementById("email").classList.remove('error');
  }

  if (containsErrors === false) {
    addParticipant(person);
    toggleModal(person);

    for (let i = 0; i < rsvpInputs.length; i++) {
      if (rsvpInputs[i].type !== 'button') {
        rsvpInputs[i].value = "";
      }
    }
  }
};

// Step 3: Replace the form button's event listener with a new one that calls validateForm()
submitButton.addEventListener("click", validateForm);

/*** Modal ***

  Purpose:
  - Use this starter code to add a pop-up modal to your website.
***/
const modal = document.getElementById("success-modal");
const modalText = document.getElementById("modal-text");
const closeModalButton = document.querySelector("#success-modal #close-modal-button");
let rotateFactor = 0;
const modalImage = document.querySelector("#success-modal img");
let intervalId;

const toggleModal = (person) => {
  modal.style.display = "flex";
  modalText.textContent = `Thanks for RSVPing, ${person.name} (${person.gamertag})! Get ready for some Minecraft Madness!`;

  if (!reduceMotion) {
    intervalId = setInterval(animateImage, 500);
  }

  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 5000);
};

const hideModal = () => {
  modal.style.display = "none";
  clearInterval(intervalId);
};

if (closeModalButton) {
  closeModalButton.addEventListener("click", hideModal);
}

const animateImage = () => {
  if (rotateFactor === 0) {
    rotateFactor = -10;
  } else {
    rotateFactor = 0;
  }
  modalImage.style.transform = `rotate(${rotateFactor}deg)`;
};

/*** Reduce Motion ***

  Purpose:
  - Adds a button to toggle reduced motion on the website.
***/
const reduceMotionButton = document.getElementById("reduce-motion-button");
let reduceMotion = false;

const reduceMotionPreference = () => {
  reduceMotion = !reduceMotion;
  if (reduceMotion) {
    reduceMotionButton.textContent = "Enable Motion";
    clearInterval(intervalId);
  } else {
    reduceMotionButton.textContent = "Reduce Motion";
    intervalId = setInterval(animateImage, 500);
  }
};

if (reduceMotionButton) {
  reduceMotionButton.addEventListener("click", reduceMotionPreference);
}
