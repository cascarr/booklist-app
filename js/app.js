// Book Class: Represents a Book
class Book {

    constructor(title, author, isbn) {

        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }

}

// UI Class: Handle UI Tasks
class UI {

    static displayBook() { //the displaybook method

        const books = Store.getBooks();

        // list the books
        books.forEach(function(book) {
            
            UI.addBook(book);

        }); 

    } //close the displaybook method

    static addBook(book) {

        const listDisplay = document.querySelector('#book-list');
        const crtTr = document.createElement('tr');
            
        let shbook = `

            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>
            <a href="#" class="btn btn-danger btn-sm 
            delete">
            X
            </a>
            </td>

        `;

        crtTr.innerHTML = shbook;

        //console.log(crtTr.innerHTML);
        listDisplay.appendChild(crtTr);

    }//close addBook method

    // method to display alert to the screen
    static showAlert(message, className) {

        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const gbcontainer = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        gbcontainer.insertBefore(div, form);

        // clear message in few seconds using setTimeout
        setTimeout(function() {

            const alertClas = document.querySelector('.alert');
            alertClas.remove();

        }, 3000);

    }//close showAlert method

    // method to clear UI form input
    static clearFields() {

        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';

    }//close clearFields method

    //deleteBook method
    static deleteBook(e) {

        e.target.parentElement.parentElement.remove();
        console.log('row has been deleted!');

    }//close deleteBook method

} //close class UI


// Store Class: Handles Storage
class Store {

    static getBooks() {

        let books;

        if (localStorage.getItem('books') === null) {

            books = [];

        } else {

            books = JSON.parse(localStorage.getItem('books'));

        }

        return books;

    }

    static addBook(book) {

        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));

    }

    static removeBook(isbn) {

        const books = Store.getBooks();

        books.forEach(function(book, index) {

            if (book.isbn === isbn) {

                books.splice(index, 1);

            }

        });

        localStorage.setItem('books', JSON.stringify(books));

    }

}


// Event: Display Books
window.addEventListener('DOMContentLoaded', UI.displayBook());

// message && className declaration
let message = '';

let className = '';

// Event: Add a Book
const bkform = document.querySelector('#book-form');

bkform.addEventListener('submit', function(e) {

    // prevent form default submission
    e.preventDefault();

    // target UI inputs
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;


    // carry out form validation
    if (title === '' || author === '' || isbn === '') {

        message += `
          Please fill in the fields...
        `;

        className += 'danger';

        //call show alert method
        UI.showAlert(message, className);

        console.log(message);

    } else {

        // instantiate book
        const book1 = new Book();
        book1.title = title;
        book1.author = author;
        book1.isbn = isbn;

        console.log(book1);

        // call the UI method for add books
        UI.addBook(book1);

        // store book in localStorage
        Store.addBook(book1);

        // message && className on book add success
        message += `
          Book Added Successfully...
        `;

        className += 'success';

        //call show alert method
        UI.showAlert(message, className);

        // clear up the form fields
        UI.clearFields();

    }

});


const bklistTag = document.querySelector('#book-list');


// Event: Remove a Book
bklistTag.addEventListener('click', function(e) {

    if (e.target.classList.contains('delete')) {

        // Remove book from UI
        UI.deleteBook(e);

        // Remove book from localStorage()
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

        // message && className on book remove success
        message += `
          Book Has Been Removed Successfully...
        `;

        className += 'success';

        //call show alert method
        UI.showAlert(message, className);

    }

});