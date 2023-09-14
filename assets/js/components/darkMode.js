const containerDark = document.getElementById('toggle')
function darkMode(){
    containerDark.addEventListener('click',function(event){
            document.body.classList.toggle('dark')
    })
}

export default darkMode