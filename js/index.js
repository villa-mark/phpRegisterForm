const formSubmittion = document.getElementById("submit_btn");
const contactInput = document.getElementById("contact_number");
const modal = document.getElementById("confirmationModal");
const modalData = document.getElementById("modalData");

// Field IDs to validate
const fieldIds = [
  "first_name",
  "middle_name",
  "last_name",
  "email",
  "contact_number",
  "batch",
  "id_number",
  "technology"
];

// Regex patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactFormatRegex = /^\d{4}-\d{3}-\d{4}$/;

// Utility: Format contact number as xxxx-xxx-xxxx
function formatContactNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11); // Limit to 11 digits
  if (digits.length > 4 && digits.length <= 7) {
    return digits.replace(/(\d{4})(\d{1,3})/, '$1-$2');
  } else if (digits.length > 7) {
    return digits.replace(/(\d{4})(\d{3})(\d{1,4})/, '$1-$2-$3');
  }
  return digits;
}

// Format while typing
contactInput.addEventListener("input", function () {
  this.value = formatContactNumber(this.value);
});

// Validation and formatting cleanup on blur
contactInput.addEventListener("blur", function () {
  const rawDigits = this.value.replace(/\D/g, '');
  if (rawDigits.length !== 11) {
    this.classList.add("invalid");
  }
});

// Remove invalid class on focus for all inputs
fieldIds.forEach(id => {
  const input = document.getElementById(id);
  input.addEventListener("focus", function () {
    input.classList.remove("invalid");

    if(id == "email"){
      document.getElementById("email_warning").style.display = "none";
    }else if(id = "contact_number"){
      document.getElementById("number_warning").style.display = "none";
    }
  });
});

// Handle form submission
formSubmittion.addEventListener("click", function (e) {
  e.preventDefault();
  let isValid = true;

  const formValues = {};

  fieldIds.forEach(id => {
    const input = document.getElementById(id);
    const value = input.value.trim();

    if (!value) {
      input.classList.add("invalid");
      isValid = false;
      return;
    }

    // Email format check
    if (id === "email" && !emailRegex.test(value)) {
      input.classList.add("invalid");
      document.getElementById("email_warning").style.display = "block";
      isValid = false;
      return;
    }

    // Contact number format check
    if (id === "contact_number" && !contactFormatRegex.test(value)) {
      input.classList.add("invalid");
      document.getElementById("number_warning").style.display = "block";
      isValid = false;
      return;
    }

    formValues[id] = value;
  });

  if (!isValid) return;

  // Populate modal with data
  modalData.innerHTML = `
    <p><strong>First Name:</strong> ${formValues.first_name}</p>
    <p><strong>Middle Name:</strong> ${formValues.middle_name}</p>
    <p><strong>Last Name:</strong> ${formValues.last_name}</p>
    <p><strong>Email:</strong> ${formValues.email}</p>
    <p><strong>Contact Number:</strong> ${formValues.contact_number}</p>
    <p><strong>Batch:</strong> ${formValues.batch}</p>
    <p><strong>ID Number:</strong> ${formValues.id_number}</p>
    <p><strong>Technology:</strong> ${formValues.technology}</p>
  `;

  modal.style.display = "block";
});

// Modal functionality
document.getElementById("closeModal").addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
