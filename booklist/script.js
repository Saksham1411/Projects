//book class to represnt a book
class Book {
    constructor(title, author, bookId) {
        this.author = author;
        this.title = title;
        this.bookId = bookId
    }
}

//  UI class to handle task sare function
class UI {
    static displayBooks() {
        const StoredBooks = Store.getbooks();
        // const StoredBooks = [
        //     {
        //         title: 'Book one',
        //         author: 'john doe',
        //         bookId: '1215'

        //     },
        //     {
        //         title: 'Book two',
        //         author: 'john doe',
        //         bookId: '12125'

        //     }

        // ];
        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));

    }
    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.bookId}</td>
            <td><a href="#" class ="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message,className){
        const div = document.createElement('div');
        div.className = `alert-box ${className}`;
        div.innerHTML = message;
        const main = document.querySelector('.main');
        const form = document.querySelector('.form');
        main.insertBefore(div,form);

        setTimeout(()=> document.querySelector('.alert-box').remove(),3000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#auth').value = '';
        document.querySelector('#book-id').value = '';
    }
}

//store class local storage se connect krega

class Store{
    static getbooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books=[];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book){
        const books = Store.getbooks();

        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(bookId){
        const books = Store.getbooks();

        books.forEach((book , index)=>{
            if(book.bookId === bookId){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}




// event for display book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// event add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#auth').value;
    const bookId = document.querySelector('#book-id').value;

    //validation
    if (title === '' || author === '' || bookId === '') {
        UI.showAlert('please fill all the fields','red');
    } else {
        const book = new Book(title, author, bookId);//EK NEW BOOK BNAYI HAII
        // console.log(book);
        UI.addBookToList(book);//ADD BOOKS to table

        Store.addBook(book);//ADDING TO THE LOCAL STORAGE

        UI.showAlert('Book is Added' , 'green');

        UI.clearFields();//CLEAR FIELDS
    }
});

//event to remove a book

document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);//REMOVE BOOK FROM TABLE OR DISPLAY

    Store.removeBook(e.target.parentElement.previousElementSibling.innerHTML);


})