
const products = [
    { name: "Sexy kay set black", image: "blackset.jpg", price: 550 },
    { name: "Go to soft cycling", image: "cyclingset.jpg", price: 850 },
    { name: "Ready girly set", image: "darkgreenset.jpg", price: 800 },
    { name: "Round sexy set", image: "fitted.jpg", price: 1500 },
    { name: "Fave chic leggings", image: "grayshort.jpg", price: 250 },
    { name: "Kikay set", image: "greenset.jpg", price: 750 },
    { name: "Workout for glam set", image: "gymset.jpg", price: 1250 },
    { name: "All girls set", image: "pinkset.jpg", price: 1500 },
    { name: "Sexy babe set", image: "sexyblackset.jpg", price: 2500 },
    { name: "Fit to fab set", image: "sexyblueset.jpg", price: 1450 }
];

const cart = [];

function displayProducts() {
    const productContainer = document.getElementById("products");
    productContainer.innerHTML = "";

    products.forEach((product, index) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img" onclick="zoomImage('${product.image}')">
            <h3>${product.name}</h3>
            <p>₱${product.price}</p>
            <select id="size-${index}">
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
            </select>
            <button id="btn-${index}" onclick="addToCart(${index})">Add to Cart</button>
        `;

        productContainer.appendChild(productElement);
    });
}

function zoomImage(imageSrc) {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    modal.style.display = "flex";
    modalImg.src = imageSrc;
}

function closeModal() {
    document.getElementById("image-modal").style.display = "none";
}

function addToCart(index) {
    const selectedSize = document.getElementById(`size-${index}`).value;
    const product = products[index];
    cart.push({ ...product, size: selectedSize });

    const btn = document.getElementById(`btn-${index}`);
    btn.classList.add("added-to-cart");
    btn.textContent = "Added 💖";
    updateCart();
}



function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const checkoutItems = document.getElementById("checkout-items");
    const totalPrice = document.getElementById("total-price");
    const checkoutTotal = document.getElementById("checkout-total");

    cartItems.innerHTML = "";
    checkoutItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, i) => {
        total += item.price;

        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-img">
            ${item.name} - ₱${item.price} (Size: ${item.size}) 
            <button class="remove-btn" onclick="removeFromCart(${i})">Remove</button>
        `;
        cartItems.appendChild(listItem);

        const checkoutItem = document.createElement("li");
        checkoutItem.innerHTML = `<img src="${item.image}" alt="${item.name}" class="cart-img">`;
        checkoutItems.appendChild(checkoutItem);
    });

    cartCount.textContent = cart.length;
    totalPrice.textContent = total;
    checkoutTotal.textContent = total;
}


function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}
function closeCheckout() {
    document.getElementById("checkout-form").style.display = "none";
}

function goToCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    document.getElementById("checkout-form").style.display = "block";
}


document.getElementById("order-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page reload

    // Get user input values
    let name = document.querySelector("#order-form input:nth-of-type(1)").value;
    let address = document.querySelector("#order-form input:nth-of-type(2)").value;
    let total = document.getElementById("checkout-total").innerText;

    // Get ordered items
    let items = document.querySelectorAll("#checkout-items li");
    if (items.length === 0) {
        alert("Your cart is empty! Please add items before checkout.");
        return;
    }

    let orderDetails = "";
    items.forEach(item => {
        orderDetails += `<li>${item.innerText}</li>`;
    });

    // Update modal content
    document.getElementById("confirm-name").innerText = name;
    document.getElementById("confirm-address").innerText = address;
    document.getElementById("confirm-total").innerText = total;

    // Show confirmation modal
    document.getElementById("confirmation-modal").style.display = "block";
});

// Function to finalize order and reset everything
function finalizeOrder() {
    // Reset cart and order details
    resetOrderForm();

    // Close confirmation modal
    closeConfirmation();
}

// Close confirmation modal
function closeConfirmation() {
    document.getElementById("confirmation-modal").style.display = "none";
}

// Reset order form, cart, and items
function resetOrderForm() {
    document.getElementById("order-form").reset(); // Reset form fields
    document.getElementById("cart-items").innerHTML = ""; // Clear cart items
    document.getElementById("checkout-items").innerHTML = ""; // Clear checkout list
    document.getElementById("cart-count").innerText = "0"; // Reset cart count
    document.getElementById("total-price").innerText = "0"; // Reset total price
    document.getElementById("checkout-total").innerText = "0"; // Reset checkout total

    // Reset the "Add to Cart" buttons
    let addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.disabled = false; // Re-enable all add-to-cart buttons
        button.innerText = "Add to Cart"; // Reset text to default
        button.classList.remove("added"); // Remove any added class
    });

    // Remove all cart data from localStorage (if used)
    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartTotal");
    localStorage.removeItem("checkoutList");

    // FORCE REFRESH THE PAGE TO ENSURE RESET
    setTimeout(() => {
        location.reload();
    }, 200);
}





document.addEventListener("DOMContentLoaded", displayProducts);

