/* VARIABLE DECLARATION */
const toggleBtn = document.querySelector('.toggleBtn');
const dropdown = document.querySelector('.dropdown');

/* TOGGLE NAVBAR */
toggleBtn.addEventListener('click', () => {
    dropdown.classList.toggle('showBlock')
})