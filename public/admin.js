async function main() {

// Retrieve a list of books from the sever.
let Response = await fetch("http://localhost:3001/ListBooks");
let books = await Response.json();
books.forEach(renderBook)
}

//Display listy of book titles to the admin.
//Place a text input next to each book title giving each input qty value. 
//Place a submit Button next to each text input.
//When the submit button is clocked, retrieve the qty from the associated 
//text input and save the uppdated quantity to the server.

function renderBook(book) {
    let root = document.querySelector('#root')

    let li = document.createElement('li')
    li.textContent = book.title

    let quantityInput = document.createElement('input')
    quantityInput.value = book.quantity

    let saveButton = document.createElement('button')
    saveButton.textContent = 'Save'

    saveButton.addEventListener('click', () => {
        fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: book.id,
                quantity: quantityInput.value
            })
        })
    })

   li.append(quantityInput, saveButton)

   root.append(li)


}
main();
