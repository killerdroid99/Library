let myLibrary = [];

function Book(id, title, author, totalPages, readStatus) {
	this.id = id;
	this.title = title;
	this.author = author;
	this.totalPages = totalPages;
	this.readStatus = readStatus;
}
Book.prototype.toggleReadStatus = function () {
	return (this.readStatus = !this.readStatus);
};

function addBookToLibrary() {
	return 0;
}

const addBook = document.getElementById("addbtn");
const submit = document.getElementById("submit");
const titleName = document.getElementById("titleName");
const authorName = document.getElementById("authorName");
const totalPages = document.getElementById("totalPages");
const completed = document.getElementById("completed");
const bookHolder = document.querySelector(".book-holder");
const close = document.getElementById("close");

close.addEventListener("click", () => {
	document.querySelector(".overlay").style.cssText = "visibility: hidden";
});

addBook.addEventListener("click", () => {
	document.querySelector(".overlay").style.cssText = "visibility: visible";
});

let id = 0;

submit.addEventListener("click", () => {
	let book;
	if (titleName.value === "" || authorName.value === "") {
		alert("Title and author fields cannot be left empty");
	} else if (totalPages.value > 10000 || totalPages.value < 1) {
		alert("Total number of pages should lie between 1 to 10,000");
	} else {
		book = new Book(
			id++,
			titleName.value,
			authorName.value,
			totalPages.value,
			completed.checked
		);
		myLibrary.push(book);

		myLibrary.map((book) => {
			if (book.id === myLibrary.length - 1) {
				let outCard = document.createElement("div");
				outCard.className = "book-card";
				outCard.id = `card-${book.id}`;

				let img = document.createElement("img");
				img.src = "./images/trash-can.svg";
				img.className = "delete";
				img.id = `delete-${book.id}`;

				let h2 = document.createElement("h2");
				h2.innerText = book.title;

				let strong1 = document.createElement("strong");
				strong1.innerText = "Author: " + book.author;

				let strong2 = document.createElement("strong");
				strong2.innerText = "Total Pages: " + book.totalPages;

				let span = document.createElement("span");
				span.className = "toggle";

				let toggleInput = document.createElement("input");
				toggleInput.type = "checkbox";
				toggleInput.id = `${book.id}`;
				book.readStatus
					? (toggleInput.checked = true)
					: (toggleInput.checked = false);

				let toggleLabel = document.createElement("label");
				toggleLabel.htmlFor = `${book.id}`;

				let para = document.createElement("p");

				span.appendChild(toggleInput);
				span.appendChild(toggleLabel);
				span.appendChild(para);

				outCard.appendChild(img);
				outCard.appendChild(h2);
				outCard.appendChild(strong1);
				outCard.appendChild(strong2);
				outCard.appendChild(span);

				bookHolder.appendChild(outCard);

				document.getElementById(book.id).addEventListener("click", () => {
					book.toggleReadStatus();
				});

				document
					.getElementById("delete-" + book.id)
					.addEventListener("click", () => {
						document.getElementById("card-" + book.id).style.display = "none";
						myLibrary = myLibrary.filter((obj) => obj.id !== book.id);
					});
			}
		});

		document.querySelector(".overlay").style.cssText = "visibility: hidden";
	}
});
