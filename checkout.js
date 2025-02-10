document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItemsContainer = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart-message");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");
    const checkoutBtn = document.getElementById("checkout-btn");
    const proceedBtn = document.getElementById("proceedBtn"); //   Fixed reference
    const paymentResult = document.getElementById("payment-result");

    //   Check if `proceedBtn` exists before adding event listener
    if (!proceedBtn) {
        console.error("Error: proceedBtn not found!");
        return;
    }

    function updateCartUI() {
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            emptyCartMessage.style.display = "block";
            checkoutBtn.disabled = true;
            subtotalElement.innerText = "$0.00";
            totalElement.innerHTML = "<b>$0.00</b>";
            return;
        }

        emptyCartMessage.style.display = "none";
        checkoutBtn.disabled = false;

        let subtotal = 0;

        cart.forEach((item, index) => {
            let itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            let itemHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="Product" class="product-image">
                    <div class="item-details">
                        <p class="product-name"><b>${item.title || "..loading"}</b></p>
                        <p class="product-meta">Size: ${item.size}</p>
                        <p class="price"><b>$${item.price.toFixed(2)}</b> × ${item.quantity} = <b>$${itemTotal.toFixed(2)}</b></p>
                    </div>
                </div>
            `;

            cartItemsContainer.innerHTML += itemHTML;
        });

        let shipping = cart.length > 0 ? 5 : 0;
        let total = subtotal + shipping;

        subtotalElement.innerText = `$${subtotal.toFixed(2)}`;
        totalElement.innerHTML = `<b>$${total.toFixed(2)}</b>`;
    }

    updateCartUI();

    checkoutBtn.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty! Please add items before proceeding.");
        } else {
            window.location.href = "payment.html";
        }
    });

    //   Payment method selection
    const paymentRadios = document.querySelectorAll("input[name='payment']");
    const cardFields = document.getElementById("cardFields");
    const paypalInfo = document.getElementById("paypalInfo");

    // Initialize Stripe
  const stripe = Stripe('pk_test_51PPP3fDHbsOjzbr060QfwGL2CG40RY0yOrjwfWI3aCrJIY8c2LU6f6MSqqYmbaRI3RJL3W8SE6O7kHFPDTgP3y4900UTjlnfSs'); // Replace with your Stripe test key
  const elements = stripe.elements();
  const cardElement = elements.create('card');
  cardElement.mount('#card-element'); // Mount Stripe card element

  // Replace the existing card fields with Stripe's card element
  const cardNumberField = document.getElementById("cardNumber");
  const expiryDateField = document.getElementById("expiryDate");
  const cvvField = document.getElementById("cvv");

  if (cardNumberField && expiryDateField && cvvField) {
    cardNumberField.style.display = "none";
    expiryDateField.style.display = "none";
    cvvField.style.display = "none";
  }
    paymentRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            if (this.value === "card") {
                cardFields.style.display = "block";
                paypalInfo.style.display = "none";
            } else if (this.value === "paypal") {
                cardFields.style.display = "none";
                paypalInfo.style.display = "block";
            } else {
                cardFields.style.display = "none";
                paypalInfo.style.display = "none";
            }
        });
    });
    

    //   Proceed button click event
    proceedBtn.addEventListener("click", function (event) {
        event.preventDefault(); //   Prevent default form submission

        let isValid = true;
        const requiredFields = ["firstName", "lastName", "address", "phone", "email"];

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.style.borderColor = "red";
                isValid = false;
            } else {
                field.style.borderColor = "";
            }
        });

        if (!isValid) {
            alert("Please fill out all required fields.");
            return;
        }

        //   Show loading spinner
        proceedBtn.disabled = true;
        proceedBtn.innerHTML = `<span class="spinner"></span> Processing...`;

        const selectedPayment = document.querySelector("input[name='payment']:checked").value;

        if (selectedPayment === "card") {
            //   Simulate payment processing (Stripe)
            setTimeout(() => {
                paymentResult.innerHTML = `<p class="success">  Payment successful! Your order is being processed.</p>`;
                proceedBtn.innerHTML = "Payment Successful";
                setTimeout(() => {
                    window.location.href = "confirmation.html"; //   Redirect after success
                }, 2000);
            }, 2000);
        } else if (selectedPayment === "paypal") {
            //   Redirect to PayPal
            paymentResult.innerHTML = `<p class="loading">🔄 Redirecting to PayPal...</p>`;
            setTimeout(() => {
                window.location.href = "https://www.paypal.com/";
            }, 2000);
        } else if (selectedPayment === "cod") {
            //   Cash on Delivery
            paymentResult.innerHTML = `<p class="success">  Cash on Delivery selected. Your order will be processed.</p>`;
            proceedBtn.innerHTML = "Order Placed";
            setTimeout(() => {
                window.location.href = "confirmation.html"; //   Redirect after success
            }, 2000);
        }
    });
});
