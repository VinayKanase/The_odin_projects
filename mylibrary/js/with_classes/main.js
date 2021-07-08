let myLibrary = [];
let setId = 0;

/**
 * Book is Class for Each Book
 */
class Book{
    /**
     * Book is Class for Each Book
     * @param {string} bookName - Name of New Book
     * @param {string} bookAuthor - Name of Author of Book
     * @param {boolean} isCompleted - Is this book completed reading
     * @param {number} id(optional) - Number to track books
     */
    constructor(bookName, bookAuthor, isCompleted, id){
        this.bookName = bookName;
        this.bookAuthor = bookAuthor;
        this.isCompleted = isCompleted;
        if(typeof id === "number"){
            this.id = id;
            setId = id;
        }else
            this.id = ++setId;
    }

    toggleIsCompleted(){
        this.isCompleted = !this.isCompleted;
    }
}

/**
 * Connects HTML and Book Object and inherits Book Class
 */
class BookInDOM extends Book{
    /**
     * Connects HTML and Book Object and inherits Book Class
     * @param {string} bookName - Name of New Book
     * @param {string} bookAuthor - Name of Author of Book
     * @param {boolean} isCompleted - Is this book completed reading
     * @param {number} id(optional) - Number to track books
     */
    constructor(bookName, bookAuthor, isCompleted, id){
        super(bookName, bookAuthor, isCompleted, id);
        this.HTML = this.createDOMElements();
    }
    /**
     * Creates all required DOM/HTML elements
     */
    createDOMElements(){
        // Main Book Container Div
        let bookContainer = document.createElement("div");
        bookContainer.classList.add("book");
        bookContainer.dataset.id = this.id;
        //Details Div
        let bookDetailsContainer = document.createElement("div");
        bookDetailsContainer.classList.add("bookdetails");
        //Book Name Heading
        let bookNameH2 = document.createElement("h2");
        // Complete/Incomplete and Author name Container
        let completeAuthorContainer = document.createElement("div");
        completeAuthorContainer.classList.add("complete-author");
        // Completed or Not Completed text Content
        let compIncompPara = document.createElement("p");
        //Author name textContent
        let authorSpan = document.createElement("span");
        
        // Container for Buttons
        let btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-container");
        //Edit Book Btn
        let btnEdit = document.createElement("button");
        btnEdit.classList.add("btn","btn-primary");
        //Remove Book Btn
        let btnRemove = document.createElement("button");
        btnRemove.classList.add("btn","btn-danger");
        //Toggle Complete and Incomplete Reading Book Btn
        let btnToggleComplete = document.createElement("button");
        btnToggleComplete.classList.add("btn","btn-warning");

        //Adding TextContents
        bookNameH2.textContent = this.bookName;
        compIncompPara.textContent = this.isCompleted ? "Completed" : "Not Completed";
        authorSpan.textContent = "~ "+ this.bookAuthor;
        btnEdit.textContent = "Edit";
        btnRemove.textContent = "Remove";
        btnToggleComplete.textContent = `Mark as ${this.isCompleted ? "Completed" : "Not Completed"}`;
        
        //Apending Content to Main Containers
        completeAuthorContainer.append(compIncompPara,authorSpan);
        bookDetailsContainer.append(bookNameH2,completeAuthorContainer);
        btnContainer.append(btnEdit,btnRemove,btnToggleComplete);
        bookContainer.append(bookDetailsContainer,btnContainer);
        //Event Listeners
        btnEdit.addEventListener("click",()=>{
            FormBookModal("edit",this);
        });
        btnRemove.addEventListener("click",()=>{
            let index = myLibrary.filter((book)=>{
                if(book.id === this.id)
                    return true;
            });
            myLibrary.splice(index.id-1,1);
            updateToDOM();
            saveAllToLocalStorage();
        });
        btnToggleComplete.addEventListener("click",()=>{
            this.toggleIsCompleted();
            btnToggleComplete.textContent = `Mark as ${this.isCompleted ? "Completed" : "Not Completed"}`;
            compIncompPara.textContent = this.isCompleted ? "Completed" : "Not Completed";
            updateToDOM();
            saveAllToLocalStorage();
        });
        return bookContainer;
    }
}

checkForLocalData();


function addNewBooktoLibrary(book){
    let temp = myLibrary.filter((b)=>{
        if(book.bookName === b.bookName && book.author === b.author)
            return true;
    });
    if(temp.length > 0)
        return console.warn("Many Books with same value cannot be added");
    myLibrary.push(book);
    saveAllToLocalStorage();
    return;
}
/**
 * Form for creating new or editing books
 * @param {string} modalType - Enter new If new Book is added or enter edit for editing book
 * @param {Object} BookObj - (optional required only on edit)
 */
function FormBookModal(modalType,BookObj){
    const formContainer = document.querySelector(".form-container");
    const heading = formContainer.children[0];
    const errorsCont = formContainer.children[1];
    const bookName = document.getElementById("bookName");
    const author = document.getElementById("authorName");
    const isCompleted = document.getElementById("isCompleted");
    const btnCancel = document.getElementById("cancel");
    const btnAdd = document.getElementById("addNewBook");
    bookName.value = "";
    author.value = "";
    isCompleted.value = "No";
    btnAdd.onclick = function(){}
    if(modalType === "new"){
        heading.textContent = "Add New Book";
        btnAdd.textContent = "Add";
        formContainer.classList.add("in");
        btnAdd.onclick = function(){
            let validate = validateArguments(bookName.value,author.value,isCompleted.value);
            if(validate){
                const book = new BookInDOM(bookName.value,author.value,isCompleted.value === "Yes" ? true : false);
                console.log(book);
                addNewBooktoLibrary(book);
                formContainer.classList.remove("in");
                updateToDOM();
                bookName.value = "";
                author.value = "";
                isCompleted.value = "No";
            }
        }
    }
    else if(modalType === "edit"){
        heading.textContent = "Edit Book";
        bookName.value = BookObj.bookName;
        author.value = BookObj.bookAuthor;
        isCompleted.value = BookObj.isCompleted ? "Yes" : "No";
        btnAdd.textContent = "Edit";
        formContainer.classList.add("in");
        btnAdd.onclick = function(){
            let validate = validateArguments(bookName.value,author.value,isCompleted.value);
            if(validate){
                if(BookObj.bookName !== bookName.value || BookObj.author !== author.value ){
                    // Value Edited
                    BookObj.bookName = bookName.value;
                    BookObj.bookAuthor = author.value;
                    // updateToDOM();
                    bookName.value = "";
                    author.value = "";
                    isCompleted.value = "No";
                }
                if((BookObj.isCompleted ? "Yes" : "No") !== isCompleted.value)
                BookObj.toggleIsCompleted();
                BookObj.HTML = BookObj.createDOMElements();
                formContainer.classList.remove("in");
                updateToDOM();
                saveAllToLocalStorage();
            }
        }
    }
    btnCancel.addEventListener("click",()=>{
        formContainer.classList.remove("in");
            bookName.value = "";
            author.value = "";
            isCompleted.value = "No";
            errorsCont.children[0].innerHTML = "";
            errorsCont.classList.add("errors-inactive");
    });
}

function ListDetails(){
    let total = document.getElementById("total");
    let completed = document.getElementById("completed");
    let incomplete = document.getElementById("incomplete");
    // console.log(myLibrary.length);
    total.textContent = myLibrary.length;
    let temp = myLibrary.filter((book)=>{
        if(book.isCompleted)
            return true;
    });
    completed.textContent = temp.length;
    incomplete.textContent = myLibrary.length - temp.length;
}

updateToDOM();
function updateToDOM(search){
    // console.log(myLibrary);
    let booksCont = document.querySelector(".books");
    booksCont.innerHTML = "";
    const notFound = document.createElement("h2");
    notFound.classList.add("notfound");
    notFound.textContent = "No Book Found In Library";
    if(search == undefined){
        if(myLibrary.length <= 0) return booksCont.append(notFound);
        myLibrary.forEach((book)=>{
            booksCont.append(book.HTML);
        });
    }
    else {
        search = search.toLowerCase();
        let temp = myLibrary.filter((book)=>{
            if(book.bookName.toLowerCase().includes(search))
                return true;
            else if(book.bookAuthor.toLowerCase().includes(search))
                return true;
            else if((book.isCompleted ? "completed" : "not completed").includes(search))
                return true;
        });
        if(temp.length <= 0) return booksCont.append(notFound);
        temp.forEach((book)=>{
            booksCont.append(book.HTML);
        });
    }
    ListDetails();
    // saveAllToLocalStorage();
}

function validateArguments(bookName, author,isCompleted){
    let errors = [];
    const errorsCont = document.querySelector(".errors");
    if(bookName.length <= 0)
        errors.push("Book Name Cannot be Empty");
    if(author.length <= 0)
        errors.push("Author Name Cannot be Empty");
    if(isCompleted !== "Yes" && isCompleted !== "No")
        errors.push("Enter Yes if Completed Reading Book or No if not");
    if(bookName.length > 50)
        errors.push("Book Name should not exceed 50 characters");
    if(author.length > 50)
        errors.push("Author Name should not exceed 50 characters");
        if(errors.length > 0){
            errorsCont.classList.remove("errors-inactive");
            errorsCont.children[0].innerHTML = "";
            errors.forEach((error)=>{
                errorsCont.children[0].innerHTML += `<li>${error}</li>`;
            });
        return false;
    }
    else{
        errorsCont.children[0].innerHTML = "";
        errorsCont.classList.add("errors-inactive");
        return true;
    }
}

//Check for Local Storage
function checkLocalStorageAvailability(type){
    let storage;
    try {
        storage = window[type];
        storage.setItem("__storage_test__","__test__");
        storage.removeItem("__storage_test__");
        return true;
    } catch (error) {
      console.log("No LocalStorage Availability",error);
      return false;   
    }
}
function saveAllToLocalStorage(){
    if(myLibrary.length <= 0) localStorage.clear();
    if(checkLocalStorageAvailability('localStorage')){
        let temp = JSON.stringify(myLibrary);
        localStorage.setItem("myLibrary",temp);
    }
    else{
        console.warn("No Local Storage Availability");
    }
}

function checkForLocalData(){
    if(checkLocalStorageAvailability('localStorage')){
        let temp = JSON.parse(localStorage.getItem("myLibrary"));
        if(temp != null){
            temp.forEach((book)=>{
                let BOOK = new BookInDOM(book.bookName,book.bookAuthor,book.isCompleted,book.id);
                myLibrary.push(BOOK);
            });
            updateToDOM();
        }

    }
    else{
        console.warn("No Local Storage Availability");
    }
}

/** Event Listeners **/
document.getElementById("newBook").addEventListener("click",()=>{
    FormBookModal("new");
});
document.getElementById("search").addEventListener("keydown",()=>{
    setTimeout(()=>{
        updateToDOM(document.getElementById("search").value);
    },400); 
});
document.getElementById("deleteall").addEventListener("click",()=>{
    myLibrary = [];
    updateToDOM();
    localStorage.clear();
});