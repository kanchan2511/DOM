const toggleBtn = document.getElementById("toggle");
const formSection = document.querySelector(".add-book");
const bookForm = document.getElementById("book-form");
const typeSelect = document.getElementById("type");
const ebookDetails = document.getElementById("ebook-details");
const bookList = document.getElementById("book-list");

// Toggle Add Book form
toggleBtn.addEventListener("click", () => {
  const isVisible = formSection.style.display === "block";
  formSection.style.display = isVisible ? "none" : "block";
  toggleBtn.textContent = isVisible ? "Add New Book" : "Hide Form";
});

// Show/hide file size for e-books
typeSelect.addEventListener("change", () => {
  ebookDetails.style.display = typeSelect.value === "ebook" ? "block" : "none";
});

// Add book to list
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const type = typeSelect.value;
  const fileSize = document.getElementById("fileSize").value;

  if (!title || !author || (type === "ebook" && !fileSize)) {
    alert("Please fill all required fields.");
    return;
  }

  // Create book card
  const card = document.createElement("div");
  card.className = `book-card ${type === "ebook" ? "ebook" : ""}`;
  card.setAttribute("data-id", `id-${Date.now()}`);

  card.innerHTML = `
    <h3 class="book-title">${title}</h3>
    <div class="book-meta">Author: ${author}</div>
    ${type === "ebook" ? `<div class="book-meta">File Size: ${fileSize} MB</div>` : ""}
    <div class="book-meta status">Status: Available</div>
    <div class="book-actions">
      <button class="btn btn-borrow">${type === "ebook" ? "Download" : "Borrow"}</button>
      <button class="btn btn-remove">Remove</button>
    </div>
  `;

  bookList.appendChild(card);
  bookForm.reset();
  ebookDetails.style.display = "none";
});

// Listen for button actions in the book list
bookList.addEventListener("click", (e) => {
  const btn = e.target;
  const card = btn.closest(".book-card");

  // If Remove button clicked
  if (btn.classList.contains("btn-remove")) {
    if (confirm("Are you sure you want to remove this book?")) {
      card.remove();
    }
  }

  // If Borrow/Download button clicked
  if (btn.classList.contains("btn-borrow")) {
    const isEbook = card.classList.contains("ebook");
    const statusElement = Array.from(card.querySelectorAll(".book-meta"))
      .find(meta => meta.textContent.includes("Status:"));

    if (!statusElement) {
      alert("Error: Status field not found.");
      return;
    }

    if (isEbook) {
      alert("Download started for: " + card.querySelector(".book-title").textContent);
    } else {
      const currentStatus = statusElement.textContent;
       if(currentStatus.includes("Available")){
        const name = prompt("enter your name:")
         if (name && name.trim() !== "") {
        statusElement.textContent = `Status: Borrowed by ${name.trim()}`;
        btn.textContent = "Return";
        btn.style.backgroundColor = "#f39c12";
      } else {
        alert("Name is required to borrow the book.");
      }
    } else {
      // Return the book
      statusElement.textContent = "Status: Available";
      btn.textContent = "Borrow";
      btn.style.backgroundColor = "#2ecc71";
    }
  }
}
});
