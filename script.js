const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function removeBook(id) {
  const bookIndex = myLibrary.findIndex(book => book.id === id);
  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1);
    displayBooks();
  }
}

function toggleBookReadStatus(id) {
  const book = myLibrary.find(book => book.id === id);
  if (book) {
    book.toggleReadStatus();
    displayBooks();
  }
}

function displayBooks() {
  const libraryContainer = document.getElementById('library-container');

  // Clear previous display
  libraryContainer.innerHTML = '';

  myLibrary.forEach(book => {

    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.setAttribute('data-id', book.id);

    const bookInfo = document.createElement('h3');
    bookInfo.textContent = `${book.title} by ${book.author}`;
    const bookDetails = document.createElement('p');
    bookDetails.textContent = `${book.pages} pages, ${book.read ? 'read' : 'not read yet'}`;

    const buttonsContainer = document.createElement('div');

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      removeBook(book.id);
    });

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle Read';
    toggleBtn.addEventListener('click', () => {
      toggleBookReadStatus(book.id);
    });

    buttonsContainer.appendChild(removeBtn);
    buttonsContainer.appendChild(toggleBtn);

    bookCard.appendChild(bookInfo);
    bookCard.appendChild(bookDetails);
    bookCard.appendChild(buttonsContainer);

    libraryContainer.appendChild(bookCard);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const newBookBtn = document.getElementById('new-book-btn');
  const dialog = document.getElementById('new-book-dialog');
  const newBookForm = document.getElementById('new-book-form');
  const cancelBtn = document.getElementById('cancel-btn');

  newBookBtn.addEventListener('click', () => {
    dialog.showModal();
  });

  cancelBtn.addEventListener('click', () => {
    dialog.close();
  });

  newBookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value; 
    const pages = document.getElementById('pages').value;
    const readValue = document.getElementById('read').value;
    const read = (readValue === 'true');

    addBookToLibrary(title, author, pages, read);
    newBookForm.reset();
    dialog.close();
  });

  addBookToLibrary('The Hunger Games (The Hunger Games, #1)', 'Suzanne Collins', 374, true);
  addBookToLibrary('Harry Potter and the Order of the Phoenix (Harry Potter, #5)', 'J.K. Rowling', 912, true);
  addBookToLibrary('Pride and Prejudice', 'Jane Austen', 279, true);
  addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 323, true);
  addBookToLibrary('The Book Thief', 'Markus Zusak', 592, false);
  addBookToLibrary('Twilight (The Twilight Saga, #1)', 'Stephenie Meyer', 498, false);
});