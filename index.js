import {menuArray} from "/data.js"

const paymentForm = document.getElementById("payment-form")
const menu = document.getElementById("menu")
const order = document.getElementById("order")
const orderBtn = document.getElementById("order-btn")
const modal = document.getElementById("modal")
const orderContainer = document.getElementById("order-container")

let selectedItemsArray = []

menu.addEventListener("click", function(e){
    if (e.target.id) {
        addToOrder(menuArray[e.target.id])
        orderContainer.style.display = "block"
        renderCheckout(selectedItemsArray)
    }
})

order.addEventListener("click", function(e){
    if (e.target.id) {
        const changedArray = selectedItemsArray.filter(function(selectedItem){
            return !(`remove-${selectedItem.id}` === e.target.id)
        })
        selectedItemsArray = changedArray
        renderCheckout(selectedItemsArray)
    }
})

orderBtn.addEventListener("click", function(){
    modal.style.display = "block"
})

paymentForm.addEventListener("submit", function(e){
    e.preventDefault()
    const paymentFormData = new FormData(paymentForm)
    const name = paymentFormData.get("full-name")
    document.getElementById("message").innerHTML = `<p class="message">Thanks ${name}! Your order is on it's way!</p>`
    modal.style.display = "none"
    orderContainer.style.display = "none"
    selectedItemsArray = []
})

function renderMenu() {
    let menuString = ``
    menuArray.forEach(function(menuItem){
        menuItem.count = 1
        menuString += `
        <div class="menu-item">
            <p class="emoji">${menuItem.emoji}</p>
            <div class="menu-item-description">
                <h2 class="item-name">${menuItem.name}</h2>
                <p class="item-ingredients">${menuItem.ingredients}</p>
                <p class="item-price">$${menuItem.price}</p>
            </div>
            <button class="add-btn" id="${menuItem.id}">+</button>
        </div>`
    })
    menu.innerHTML = menuString
}

function addToOrder (item) {
    if (selectedItemsArray.includes(item)) {
        item.count++
        item.price = item.price * item.count
    } else {
        selectedItemsArray.push(item)
    }
}

function renderCheckout(array) {
    if (array.length > 0) {
        let checkoutString = ``
        array.forEach(function(selectedItem){
            checkoutString += `
            <div class="ordered-item">
                <h2 class="item-name">${selectedItem.name} x${selectedItem.count}</h2>
                <button id="remove-${selectedItem.id}" class="remove-btn">remove</button>
                <p class="item-price-checkout">$${selectedItem.price}</p>
            </div>`
        })
        order.innerHTML = checkoutString
        const totalPrice = array.reduce(function(total, currentItem){
            return total + currentItem.price
        }, 0)
        document.getElementById("total-price").innerHTML = `$${totalPrice}`
    } else {
        selectedItemsArray = []
        orderContainer.style.display = "none"
    }
}

renderMenu()