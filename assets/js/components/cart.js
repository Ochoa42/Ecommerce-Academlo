function cart(db, printProducts){
    let cart= JSON.parse(localStorage.getItem('cart')) ||[]

    //Elementos del DOM
    const produsctsDOM = document.querySelector('.products__container')
    const notifyDOM = document.querySelector('.notify')
    const cartDOM = document.querySelector('.cart__body')
    const countDOM = document.querySelector('.cart__count--item')
    const totalDOM = document.querySelector('.cart__total--item')
    const checkoutDOM = document.querySelector('.btn--buy')
    const modal = document.querySelector('.modal')

    checkoutDOM.addEventListener('click', () => {
        if (cart.length === 0) {
            mostrarModalCarritoVacio();
            return
        } else {
            showCartGracias()
        }
    });

    function printCart(){
        let htmlCart = ''
        if(cart.length === 0){
            htmlCart += `
            <div class="cart__empty">
                <i class='bx bx-cart'></i>
                <p class="cart__empty__text">No hay productos en el carrito</p>
            </div>
            `
            notifyDOM.classList.remove('show--notify')
        }else{
            for(const item of cart){
                const product = db.find(p => p.id === item.id)
                htmlCart += `
            <article class="article">
                <div class="article__image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="article__content">
                    <h3 class="article__title">${product.name}</h3>
                    <span class="article__price">$${product.price}</span>
                    <div class="article__quantify">
                        <button type="button" class="article__quantify-btn article--minus" data-id="${item.id}">
                        <i class='bx bx-minus'></i>
                        </button>
                        <span class="article__quantify-text">${item.qty}</span>
                        <button type="button" class="article__quantify-btn article--plus" data-id="${item.id}">
                        <i class='bx bx-plus'></i>
                        </button>
                    </div>
                    <button type="button" class="article--btn remove-from-cart" data-id="${item.id}">
                    <i class='bx bx-trash'></i>
                    </button>
                </div>
            </article>
            `
            //notifyDOM.classList.add('show--notify')
            //notifyDOM.innerHTML = showItemsCount()
            }
            notifyDOM.classList.add('show--notify')
        }
        cartDOM.innerHTML = htmlCart
        localStorage.setItem('cart',JSON.stringify(cart))
        notifyDOM.innerHTML = showItemsCount()
        countDOM.innerHTML = showItemsCount()
        totalDOM.innerHTML = showTotal()
    }

    function addToCart(id, qty = 1){
        const itemFinded = cart.find(i => i.id ===id)
        if(itemFinded){
            if(validarStock(id, (qty + itemFinded.qty))){
                itemFinded.qty +=qty 
            }else{
                return window.alert('Producto agotado')
            }                    
        }else {
            cart.push({id, qty})           
        }
        printCart()
    }
    //elimina uno por uno del carro
    function removeFromCart(id, qty = 1){
        const itemFinded = cart.find(i => i.id === id)
        const result = itemFinded.qty - qty
        if(result > 0){
            itemFinded.qty -= qty 
        }else{
            cart = cart.filter(i => i.id !== id)
        }
        printCart()
    }
    //Elimina todo el producto del carro
    function deleteFromCart(id){
        cart = cart.filter(i => i.id !== id)
        printCart()   
    }
    

    //suma el total de productos a comprar
    function showItemsCount(){
        let suma = 0
        for(const item of cart){
            suma += item.qty
        }
        return suma
    }
    //precio total a pagar de los productos
    function showTotal(){
        let total = 0
        for(const item of cart){
            const productFind = db.find(p => p.id === item.id)
            total += item.qty * productFind.price
        }
        return total
    }

    function checkout(){
        for(const item of cart){
            const productFind = db.find(p => p.id === item.id)
            productFind.quantity -= item.qty 
        }
        cart = []
        printCart()
        printProducts()
    }

    printCart()
    //Eventos

    produsctsDOM.addEventListener('click', function(event){
        if(event.target.closest('.add--to--cart')){
            const id = +event.target.closest('.add--to--cart').dataset.id
            addToCart(id)
            if(!validarStock(id, 1)){
                removeFromCart(id,1)
                window.alert('producto agotado')
            }
        }

    })

    cartDOM.addEventListener('click', function(event){
        if(event.target.closest('.article--minus')){
            const id = +event.target.closest('.article--minus').dataset.id
            removeFromCart(id)
        }

        if(event.target.closest('.article--plus')){
            const id = +event.target.closest('.article--plus').dataset.id
            addToCart(id)
        }

        if(event.target.closest('.remove-from-cart')){
            const id = +event.target.closest('.remove-from-cart').dataset.id
            deleteFromCart(id)
        }

    })

    checkoutDOM.addEventListener('click',checkout)
    
    function validarStock(id, qty){
        const productoEncontrado = db.find(producto => producto.id === id)
        return productoEncontrado.quantity >= qty
    }
    function mostrarModalCarritoVacio() {
        const modalCarritoVacio = document.getElementById('modal--container');
        modalCarritoVacio.classList.add('show--modal--cart');
        setTimeout(() => {
            modalCarritoVacio.classList.remove('show--modal--cart');
        }, 2000);
    }
    
    function ocultarModalCarritoVacio() {
        const modalCarritoVacio = document.getElementById('modal--container');
        modalCarritoVacio.classList.remove('show--modal--cart');
    }

    function showCartGracias(){
            const textGracias = document.querySelector('.container__gracias')
            textGracias.classList.remove('show--modal--cart--hidden')
            setTimeout(() => {
                textGracias.classList.add('show--modal--cart--hidden')
            }, 2000);
        
    }

}

export default cart