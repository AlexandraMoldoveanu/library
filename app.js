let libraryGrid = document.querySelector(".library-grid");
let submitButton = document.querySelector(".submit-form");


// All book objects are stored in this array
let myLibrary = [
    {title: 'Rules of Civility', author: 'Amor Towles', pages: 300, isRead: 'read'},
    {title: 'A Gentleman in Moscow', author: 'Amor Towles', pages: 450, isRead: 'read'}
];

// This is the constructor function for a book object
function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
    this.info = function(){
        return `${title} by ${author} has ${pages} pages, ${isRead}`;
    }
}

Book.prototype.toggleStatus = function(){
    if(this.isRead){
        this.isRead = false;   
    } else {
        this.isRead =  true;
    }
}

submitButton.addEventListener("click", addBookToLibrary);
function addBookToLibrary(e){
    e.preventDefault();
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let readStatus = document.querySelector("#is-read").checked;
    let newBook = new Book(title, author, pages, readStatus);
    newBook.prototype = Object.create(Book.prototype);
    myLibrary.push(newBook);
    createCard(newBook);
    
}


myLibrary.forEach( book => {
    createCard(book);  
 })

 function createCard(book){
    let card = document.createElement('div');
    card.classList.add("card");
    libraryGrid.appendChild(card);

    let cardTitle = document.createElement('p');
    cardTitle.innerHTML = book.title;
    card.appendChild(cardTitle);

    let cardAuthor = document.createElement('p');
    cardAuthor.innerHTML = book.author;
    card.appendChild(cardAuthor);

    let cardPages = document.createElement('p');
    cardPages.innerHTML = book.pages;
    card.appendChild(cardPages);

    let isReadStatus = document.createElement('button');
    if(book.isRead){
        isReadStatus.innerHTML = "Read";
        isReadStatus.classList.add("btn-success");
    } else {
        isReadStatus.innerHTML = "Not read";
        isReadStatus.classList.add("btn-danger");
    }
    card.appendChild(isReadStatus);
    isReadStatus.addEventListener("click", () => {

        
       
        if( isReadStatus.classList.contains("btn-success")) {

            isReadStatus.classList.remove("btn-success");
            isReadStatus.classList.add("btn-danger");
            isReadStatus.innerHTML = "Not read";
            book.isRead = false;

        } else if( isReadStatus.classList.contains("btn-danger")) {
            
            isReadStatus.classList.remove("btn-danger");
            isReadStatus.classList.add("btn-success");
            isReadStatus.innerHTML = "Read";
            book.isRead = true;
        }
    
    })

    let removeButton = document.createElement('button');
    removeButton.innerHTML = "Remove";
    card.appendChild(removeButton);
    removeButton.addEventListener("click", () => {
        card.remove();
        myLibrary.splice(myLibrary.indexOf(book), 1);
        console.log(myLibrary);
    } );
}






  