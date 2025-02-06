document.addEventListener("DOMContentLoaded", function () {
function updateTotals(){
    let subtotal = 0;
    const discount = 20.00;
    const tax = 14.00;

    document.querySelectorAll(".cart-product").forEach((product)=>{
        const price = parseFloat(product.dataset.price);
        const quantityInput = product.querySelector('input[type="number"]');
        const quantity = parseInt(quantityInput.value) || 0; 
        subtotal += price * quantity;
    });

    document.getElementById("Subtotal").innerText = `$${subtotal.toFixed(2)}`;
    const total = subtotal - discount + tax;
    document.getElementById("total").innerText = `$${total.toFixed(2)}`
}
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', updateTotals);
});


// removing 1 product
function removeProduct(event) {
    const productElement = event.target.closest(".cart-product");

    if (productElement) {
        productElement.remove();
        updateTotals();
    }
}

//remove all products
function removeAllProducts() {
    const allProducts = document.querySelectorAll(".cart-product");
    if (allProducts.length > 0) {
        allProducts.forEach((product) => product.remove());
        updateTotals();
    }
}

document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', updateTotals);
});

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove")) {
        removeProduct(event);
    }
});


// **Event Listener for "Remove All" Button**
const removeAllBtn = document.querySelector(".remove-btn");
    if (removeAllBtn) {
        removeAllBtn.addEventListener("click", removeAllProducts);
    }

    function moveToCart(event) {
        const savedItem = event.target.closest(".product-card");

        if (!savedItem) return;

        // Extract product details
        const imageSrc = savedItem.querySelector(".product-image").src;
        const productTitle = savedItem.querySelector(".product-title").textContent;
        const priceText = savedItem.querySelector(".price").textContent.replace("$", "");
        const price = parseFloat(priceText);

        // Create a new cart item
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-product");
        cartItem.dataset.price = price;
        cartItem.innerHTML = `
            <div class="cart-product-info">
                <img src="${imageSrc}" alt="Product">
                <div class="cart-product-details">
                    <span class="cart-product-name">${productTitle}</span>
                    <span class="cart-product-meta">
                        <label for="size">Choose Size:</label>
                        <select name="size" id="size">
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select> <br> 
                        Color: blue, Material: Plastic <br> 
                        Seller: Artel Market
                    </span>
                    <div class="action-buttons">
                        <button class="remove">Remove</button>
                        <button class="save">Save for later</button>
                    </div>
                </div>
            </div>
            <div class="buttons">
                <div class="price">$${price.toFixed(2)}</div>
                <input type="number" min="0" value="1" placeholder="Qty :" max="15">
            </div>
        `;

        // Insert cart item at the top, before the "Remove All" button
        const cartContainer = document.querySelector(".cart");
        const firstProduct = cartContainer.querySelector(".cart-product");
        if (firstProduct) {
            cartContainer.insertBefore(cartItem, firstProduct);
        } else {
            cartContainer.appendChild(cartItem);
        }

        // Remove from "Saved for Later"
        savedItem.remove();

        // Attach event listeners to the new cart item
        cartItem.querySelector(".remove").addEventListener("click", function () {
            cartItem.remove();
            updateTotals();
        });

        cartItem.querySelector(".save").addEventListener("click", function () {
            moveToSavedForLater(cartItem);
        });

        cartItem.querySelector('input[type="number"]').addEventListener("input", updateTotals);

        updateTotals();
    }

    function moveToSavedForLater(cartItem) {
        // Extract product details
        const imageSrc = cartItem.querySelector(".cart-product-info img").src;
        const productTitle = cartItem.querySelector(".cart-product-name").textContent;
        const priceText = cartItem.querySelector(".price").textContent.replace("$", "");
        const price = parseFloat(priceText);

        // Create saved product card
        const savedItem = document.createElement("div");
        savedItem.classList.add("product-card");
        savedItem.innerHTML = `
            <img src="${imageSrc}" alt="Product" class="product-image">
            <div class="product-details">
                <div class="price">$${price.toFixed(2)}</div>
                <div class="product-title">${productTitle}</div>
                <button class="move-to-cart">
                    <img src="assets/shopping_cart.png" alt="cart" class="cart-icon">
                    Move to cart
                </button>
            </div>
        `;

        // Append to "Saved for Later"
        document.querySelector(".product-grid").appendChild(savedItem);

        // Remove from cart
        cartItem.remove();

        // Attach event listener to move back to cart
        savedItem.querySelector(".move-to-cart").addEventListener("click", function () {
            moveToCart({ target: savedItem.querySelector(".move-to-cart") });
        });

        updateTotals();
    }

    // Event listener for "Move to Cart" buttons
    document.addEventListener("click", function (event) {
        if (event.target.closest(".move-to-cart")) {
            moveToCart(event);
        }
    });

    // Event listener for "Save for Later" buttons
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("save")) {
            moveToSavedForLater(event.target.closest(".cart-product"));
        }
    });

    updateTotals();
});