import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shoppingapp-ead42-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingCartDB = ref(database, "itemCart")

const shoppingCartEL = document.getElementById("shopping-cart")
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")


    addButtonEl.addEventListener("click", function () {
        let inputValue = inputFieldEl.value
        push(shoppingCartDB, inputValue)
        clearInputFieldEL()

        console.log(inputValue)
    })

    onValue (shoppingCartDB, function(snapshot) {
        let cartItemsArray= Object.values(snapshot.val())
        clearShopingCartEL()
 
        for (let i = 0; i < cartItemsArray.length; i++ ) {
         addToCartEL(cartItemsArray[i])
        }
        
     })

    function clearShopingCartEL(){
    shoppingCartEL.innerHTML = ""
    }

    function addToCartEL(itemValue) {
        shoppingCartEL.innerHTML += `<li>${itemValue}</li>`
    }

    function clearInputFieldEL() {
        inputFieldEl.value = ""
    }

   

