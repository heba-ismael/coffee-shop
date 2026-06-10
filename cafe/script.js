// ================= DARK MODE =================
document.querySelector(".mode-btn")
.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});


// ================= FILTER =================
document.querySelectorAll(".filter-buttons button")
.forEach(btn => {

    btn.onclick = () => {
        const f = btn.dataset.filter;

        document.querySelectorAll(".item").forEach(item => {
            item.style.display =
                (f === "all" || item.classList.contains(f))
                    ? "block"
                    : "none";
        });
    };

});


// ================= CART =================
const cartIcon = document.querySelector(".cart");
const cartBox = document.getElementById("cart-box");
const overlay = document.querySelector(".overlay");

function openCart(){
    cartBox.style.display = "block";
    overlay.style.display = "block";
}

function closeCart(){
    cartBox.style.display = "none";
    overlay.style.display = "none";
}

cartIcon.onclick = () => {
    cartBox.style.display === "block" ? closeCart() : openCart();
};

overlay.onclick = closeCart;


// ================= DATA =================
let cart = [];

const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalPrice = document.getElementById("total-price");


// ================= TOAST =================
const toast = document.getElementById("toast");

function showToast(){
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1200);
}


// ================= FLY =================
function fly(img){

    const flying = img.cloneNode(true);
    flying.classList.add("flying-item");
    document.body.appendChild(flying);

    const r = img.getBoundingClientRect();
    const c = document.querySelector(".cart").getBoundingClientRect();

    flying.style.left = r.left + "px";
    flying.style.top = r.top + "px";

    setTimeout(() => {
        flying.style.left = c.left + "px";
        flying.style.top = c.top + "px";
        flying.style.opacity = "0";
    }, 10);

    setTimeout(() => flying.remove(), 800);
}


// ================= ADD =================
document.addEventListener("click", (e) => {

    const btn = e.target.closest(".add-cart");
    if(!btn) return;

    cart.push({
        name: btn.dataset.name,
        price: Number(btn.dataset.price)
    });

    updateCart();
    showToast();

    const img = btn.parentElement.querySelector("img");
    if(img) fly(img);
});


// ================= UPDATE =================
function updateCart(){

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, i) => {

        total += item.price;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <span>${item.name}</span>
            <span>${item.price} EGP</span>
            <button onclick="removeItem(${i})">x</button>
        `;

        cartItems.appendChild(div);
    });

    cartCount.textContent = cart.length;
    totalPrice.textContent = total;
}


// ================= REMOVE =================
window.removeItem = function(i){
    cart.splice(i, 1);
    updateCart();
};


// ================= CHECKOUT (FULL UPDATED) =================
function checkout(){

    if(cart.length === 0){
        alert("Cart is empty");
        return;
    }

    let name = document.getElementById("customerName").value;
    let phone = document.getElementById("customerPhone").value;
    let address = document.getElementById("customerAddress").value;
    let orderType = document.getElementById("orderType").value;

    if(!name || !phone){
        alert("Please enter name and phone");
        return;
    }

    let total = cart.reduce((sum, item) => sum + item.price, 0);

    let order = {
        name,
        phone,
        address: address || "No address",
        orderType,
        items: cart,
        total,
        status: "Pending",
        date: new Date().toLocaleString()
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));

    cart = [];
    updateCart();

    showToast();

    alert("Order placed successfully ✔");
}

function makeBooking(){

    let name = document.getElementById("bookName").value;
    let date = document.getElementById("bookDate").value;
    let time = document.getElementById("bookTime").value;

    if(!name || !date || !time){
        alert("Please fill all booking fields");
        return;
    }

    let booking = {
        name,
        date,
        time
    };

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.push(booking);

    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("Table booked successfully ✔");

    document.getElementById("bookName").value = "";
    document.getElementById("bookDate").value = "";
    document.getElementById("bookTime").value = "";
}