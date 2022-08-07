const nameError = document.querySelector('.error')
const selectionError = document.querySelector('.selection-error')
const nameInput = document.querySelector('.name')

if (nameInput.value == '') {
    setTimeout(() => {
        nameError.classList.add('hide')
        selectionError.classList.add('hide')
    }, 3000)
}