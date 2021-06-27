var myLibrary = [];
/*
    {author: "J. K. Rowling",
    bookName: "Harry Potter Philosopher's Stone",
    isCompleted: true},
    {author: "J. K. Rowling",
    bookName: "Harry Potter Chamber of Secrets",
    isCompleted: false},
    {author: "A. P. J. Kalam",
    bookName: "Wings of Fire",
    isCompleted: true},
    {author: "A. P. J. Kalam",
    bookName: "Turning Points",
    isCompleted: false}
*/
var setid = 0;
checkForLocalData();
/**
 * Constructor for Book object  
 * @param {string} bookName - Name of the current book
 * @param {string} author - Name of author of current book
 * @param {boolean} isCompleted - Weather user has completed reading it or not
 * @param {number} id(optinal) - add id to current Book
 */
function Book(bookName, author, isCompleted,id){
    if(typeof id === "number"){
        this.id = id;
        setid = id;
    }
    else{
        this.id = ++setid;
    }
    this.bookName = bookName;
    this.author = author;
    this.isCompleted = isCompleted;
}

Book.prototype.toggleIsCompleted = function (){
    this.isCompleted = !this.isCompleted;
    this.container.Completed.textContent = this.isCompleted ? "Completed" : "Not Completed"; 
    this.container.btntoggleComplete.textContent = `Mark as ${!this.isCompleted ? "Completed" : "Not Completed"}`;
    updateToDOM();
}

function BookInDOM(Book){
    //Main div Conatiner for Book 
    this.bookContainer = document.createElement("div");
    this.bookContainer.classList.add("book");
    this.bookContainer.dataset.id = Book.id;
    // Div container for Details of book
    this.bookDetails = document.createElement("div");
    this.bookDetails.classList.add("bookdetails");
    //Name of Book
    this.bookName = document.createElement("h2");
    //Complete and Author comtainer
    this.completeAuthor = document.createElement("div");
    this.completeAuthor.classList.add("complete-author");
    //Completed or Not Completed
    this.Completed = document.createElement("p");
    //Author span
    this.author = document.createElement("span");

    this.completeAuthor.append(this.Completed,this.author);

    this.bookDetails.append(this.bookName,this.completeAuthor);

    //Conatiner for Btns
    this.btnContainer = document.createElement("div");
    this.btnContainer.classList.add("btn-container");
    //Edit Button
    this.btnEdit = document.createElement("button");
    this.btnEdit.classList.add("btn","btn-primary");
    //Remove Button
    this.btnRemove = document.createElement("button");
    this.btnRemove.classList.add("btn","btn-danger");
    //Read Unread Button
    this.btntoggleComplete = document.createElement("button");
        this.btntoggleComplete.classList.add("btn","btn-warning");
    this.btnEdit.textContent = "Edit";
    this.btnRemove.textContent = "Remove";
    this.btntoggleComplete.textContent = `Mark as ${!Book.isCompleted ? "Completed" : "Not Completed"}`;
    this.btnContainer.append(this.btnEdit,this.btnRemove,this.btntoggleComplete);
    //Added All elements to bookContainer
    this.bookContainer.append(this.bookDetails,this.btnContainer);

    this.bookName.textContent = Book.bookName;
    this.author.textContent = "~ "+ Book.author;
    this.Completed.textContent = Book.isCompleted ? "Completed" : "Not Completed"; 

    this.btnEdit.addEventListener("click",()=>{
        FormBookModal("edit",Book);
    });
    this.btnRemove.addEventListener("click",()=>{
        let index = myLibrary.indexOf(Book,0)
        myLibrary.splice(index, 1);
        updateToDOM();
        ListDetails();
        saveAllToLocalStorage();
    });
    this.btntoggleComplete.addEventListener("click",()=>{
        Book.toggleIsCompleted();
        updateToDOM();
    });
    Book.container = this;
}
function addNewBooktoLibrary(book){
    let temp = myLibrary.filter((b)=>{
        if(book.bookName === b.bookName && book.author === b.author)
            return true;
    });
    if(temp.length > 0)
        return console.warn("Many Books with same value cannot be added");
    myLibrary.push(book);
    return;
}
function FormBookModal(modalType,BookObj){
    const formContainer = document.querySelector(".form-container");
    const heading = formContainer.children[0];
    const errorsCont = formContainer.children[1];
    const bookName = document.getElementById("bookName");
    const author = document.getElementById("authorName");
    const isCompleted = document.getElementById("isCompleted");
    const btnCancel = document.getElementById("cancel");
    const btnAdd = document.getElementById("addNewBook");
    btnAdd.onclick = function(){}
    if(modalType === "new"){
        heading.textContent = "Add New Book";
        btnAdd.textContent = "Add";
        formContainer.classList.add("in");
        btnAdd.onclick = function(){
            let validate = validateArguments(bookName.value,author.value,isCompleted.value);
            if(validate){
                const book = new Book(bookName.value,author.value,isCompleted.value === "Yes" ? true : false);
                new BookInDOM(book);
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
        author.value = BookObj.author;
        isCompleted.value = BookObj.isCompleted ? "Yes" : "No";
        btnAdd.textContent = "Edit";
        formContainer.classList.add("in");
        btnAdd.onclick = function(){
            let validate = validateArguments(bookName.value,author.value,isCompleted.value);
            if(validate){
                if(BookObj.bookName !== bookName.value){
                    BookObj.bookName = bookName.value;
                }
                if(BookObj.author !== author.value){
                    BookObj.author = author.value;
                }
                if((BookObj.isCompleted ? "Yes" : "No") !== isCompleted.value){
                    BookObj.toggleIsCompleted();
                }
                delete BookObj.container;
                new BookInDOM(BookObj);
                formContainer.classList.remove("in");
                updateToDOM();
                bookName.value = "";
                author.value = "";
                isCompleted.value = "No";
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
            booksCont.append(book.container.bookContainer);
        });
    }
    else {
        search = search.toLowerCase();
        let temp = myLibrary.filter((book)=>{
            if(book.bookName.toLowerCase().includes(search))
                return true;
            else if(book.author.toLowerCase().includes(search))
                return true;
            else if((book.isCompleted ? "completed" : "not completed").includes(search))
                return true;
        });
        if(temp.length <= 0) return booksCont.append(notFound);
        temp.forEach((book)=>{
            booksCont.append(book.container.bookContainer);
        });
    }
    ListDetails();
    saveAllToLocalStorage();
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
/** Event Listeners **/
document.getElementById("newBook").addEventListener("click",()=>{
    FormBookModal("new");
});
document.getElementById("deleteall").addEventListener("click",()=>{
  myLibrary = [];
  updateToDOM();
  localStorage.clear();
});
document.getElementById("search").addEventListener("keydown",()=>{
    setTimeout(()=>{
        updateToDOM(document.getElementById("search").value);
    },400); 
});
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
                let BOOK = new Book(book.bookName,book.author,book.isCompleted,book.id);
                new BookInDOM(BOOK);
                myLibrary.push(BOOK);
            });
            updateToDOM();
        }

    }
    else{
        console.warn("No Local Storage Availability");
    }
}