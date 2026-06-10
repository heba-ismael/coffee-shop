
// ===== NAV =====
function showSection(id){
    document.querySelectorAll(".section")
    .forEach(sec => sec.classList.remove("active"));

    document.getElementById(id).classList.add("active");
}


// ===== LOAD ORDERS =====
function loadOrders(){
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    let list = document.getElementById("ordersList");
    list.innerHTML = "";

    orders.forEach((o,i)=>{

        let itemsText = "";

        if(o.items){
            itemsText = o.items.map(it => it.name).join(", ");
        }else{
            itemsText = o.name;
        }

        let total = o.total ? o.total : o.price;

        let phone = o.phone || "No phone";
        let address = o.address || "No address";
        let status = o.status || "Pending";
        let orderType = o.orderType || "Not selected";

        list.innerHTML += `
            <div class="item-box">

                <span>
                    👤 ${o.name || "Unknown"} <br>
                    📱 ${phone} <br>
                    🚚 ${orderType} <br>
                    📍 ${address} <br>
                    🛒 ${itemsText} <br>
                    💰 ${total} EGP <br>
                    🔔 Status: ${status}
                </span>

                <button onclick="toggleStatus(${i})">Toggle Status</button>
                <button onclick="deleteOrder(${i})">Delete</button>

            </div>
        `;
    });

    document.getElementById("ordersCount").innerText = orders.length;
}


// ===== LOAD BOOKINGS =====
function loadBookings(){
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    let list = document.getElementById("bookingsList");
    list.innerHTML = "";

    bookings.forEach((b,i)=>{
        list.innerHTML += `
    <div class="item-box">
        <span>
            👤 ${b.name} <br>
            📅 ${b.date} <br>
            ⏰ ${b.time}
        </span>

        <button onclick="deleteBooking(${i})">Delete</button>
    </div>
`;
    });

    document.getElementById("bookingsCount").innerText = bookings.length;
}


// ===== DELETE ORDER =====
function deleteOrder(i){
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.splice(i,1);
    localStorage.setItem("orders", JSON.stringify(orders));
    loadOrders();
}


// ===== DELETE BOOKING =====
function deleteBooking(i){
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.splice(i,1);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    loadBookings();
}


// ===== TOGGLE STATUS =====
function toggleStatus(i){

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    if(!orders[i].status){
        orders[i].status = "Pending";
    }

    orders[i].status =
        orders[i].status === "Pending" ? "Done" : "Pending";

    localStorage.setItem("orders", JSON.stringify(orders));
    loadOrders();
}


// ===== CLEAR ALL ORDERS =====
function clearOrders(){
    localStorage.removeItem("orders");
    loadOrders();
}


// ===== INIT =====
loadOrders();
loadBookings();