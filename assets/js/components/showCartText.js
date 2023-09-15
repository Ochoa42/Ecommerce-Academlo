function showCartText(){
    const btnCartBuy = document.getElementById('modal--container')
    const modal = document.querySelector('.modal')

    btnCartBuy.addEventListener('click', function(event){
        modal.classList.toggle('show--modal--cart')
        console.log('brrrrrrrr')
    })
}

export default showCartText