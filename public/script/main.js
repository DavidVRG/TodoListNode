/* VARIABLE DECLARATION */
const toggleBtn = document.querySelector('.toggleBtn');
const dropdown = document.querySelector('.dropdown');
const addUI = document.querySelector('.addUI');
const showAddUI = document.querySelector('.add');
const exitAddUI = document.querySelector('.exit');

/* TOGGLE NAVBAR */
toggleBtn.addEventListener('click', () => {
    dropdown.classList.toggle('showBlock')
})

/* TOGGLE ADDUI */
showAddUI.addEventListener('click', () => {
    addUI.classList.toggle('showFlex')
})

/* EXIT ADDUI */
exitAddUI.addEventListener('click', () => {
    addUI.classList.remove('showFlex')
})