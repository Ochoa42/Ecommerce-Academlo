
const containerDark = document.getElementById('toggle')
const btnDarkMode = document.querySelector('.toggle')
function darkMode(){
    containerDark.addEventListener('click',function(event){
            document.body.classList.toggle('dark')
    })
}

export default darkMode
