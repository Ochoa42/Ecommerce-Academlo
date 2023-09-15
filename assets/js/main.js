import loader from './components/loader.js'
import showMenu from './components/showMenu.js'
import showCart from './components/showCart.js'
import products from './components/products.js'
import getProducts from './helpers/getProducts.js'
import cart from './components/cart.js'
import darkMode from './components/darkMode.js'
loader()

//Mostrar menu del costado
showMenu()

//Mostrar el carrito de compras
showCart()

//Products
const {db, printProducts} = products(await getProducts())

//carrito
cart(db, printProducts)

darkMode()

//text carrito vacio

//showCartText()

///ypooooooooooooooooooooooooo