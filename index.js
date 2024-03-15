import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
        if (snapshot.exists()) {
        let cartItemsArray= Object.entries(snapshot.val())
        clearShopingCartEL()
        
        
        for (let i = 0; i < cartItemsArray.length; i++ ) {
            let currentItem = cartItemsArray[i] 
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            addToCartEL(currentItem)
        }
    } else {
        shoppingCartEL.innerHTML = "No items have been added to cart..."
    }
     })
    

    function clearShopingCartEL(){
    shoppingCartEL.innerHTML = ""
    }

    function addToCartEL(item) {
        // shoppingCartEL.innerHTML += `<li>${itemValue}</li>`
        let itemID = item[0]
        let itemValue = item[1]
        let newEl = document.createElement("li")
        newEl.textContent = itemValue
        shoppingCartEL.append(newEl)
        newEl.addEventListener("click", function() {
            let exactLocationOfItemInDB = ref (database, `itemCart/${itemID}`)
            remove(exactLocationOfItemInDB)

        })


    }

    function clearInputFieldEL() {
        inputFieldEl.value = ""
    }

   

