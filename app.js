function loadMenu() {
    const menu = [
        { id: 1, name: "Chicken Bowl", price: 10.99, description: "Grilled chicken with rice and vegetables", category: "Main" },
        { id: 2, name: "Beef Bowl", price: 11.99, description: "Seasoned beef with rice and toppings", category: "Main" },
        { id: 3, name: "Salmon Plate", price: 13.99, description: "Grilled salmon with sides", category: "Main" },
        { id: 4, name: "Breakfast Plate", price: 8.99, description: "Eggs, toast, sausage, bacon, biscuits, and pancakes", category: "Main" },
        { id: 5, name: "Fitness Wrap", price: 9.99, description: "Low calorie wrap with lean protein", category: "Main" },
        { id: 6, name: "Chicken Alfredo", price: 12.99, description: "Creamy pasta with grilled chicken", category: "Main" },
        { id: 7, name: "Shrimp Pasta", price: 13.49, description: "Shrimp with garlic butter pasta", category: "Main" },
        { id: 8, name: "Turkey Burger", price: 10.49, description: "Lean turkey burger with toppings", category: "Main" },
        { id: 9, name: "French Fries", price: 3.99, description: "Crispy golden fries", category: "Side" },
        { id: 10, name: "Sweet Potato Fries", price: 4.49, description: "Sweet and crispy fries", category: "Side" },
        { id: 11, name: "Steamed Broccoli", price: 3.49, description: "Fresh steamed broccoli", category: "Side" },
        { id: 12, name: "Corn", price: 2.99, description: "Buttery corn", category: "Side" },
        { id: 13, name: "Green Beans", price: 3.49, description: "Seasoned green beans", category: "Side" },
        { id: 14, name: "Mashed Potatoes", price: 3.99, description: "Creamy mashed potatoes", category: "Side" },
        { id: 15, name: "Side Salad", price: 4.99, description: "Fresh greens with dressing", category: "Side" },
        { id: 16, name: "Chocolate Cake", price: 5.99, description: "Rich chocolate layered cake", category: "Dessert" },
        { id: 17, name: "Cheesecake", price: 5.99, description: "Classic creamy cheesecake", category: "Dessert" },
        { id: 18, name: "Brownie", price: 3.99, description: "Fudgy chocolate brownie", category: "Dessert" },
        { id: 19, name: "Ice Cream", price: 3.49, description: "Vanilla or chocolate ice cream", category: "Dessert" },
        { id: 20, name: "Apple Pie", price: 4.99, description: "Warm apple pie", category: "Dessert" },
        { id: 21, name: "Water", price: 1.49, description: "Bottled water", category: "Drink" },
        { id: 22, name: "Coke", price: 2.49, description: "Classic Coca-Cola", category: "Drink" },
        { id: 23, name: "Sprite", price: 2.49, description: "Lemon-lime soda", category: "Drink" },
        { id: 24, name: "Orange Juice", price: 3.49, description: "Fresh orange juice", category: "Drink" },
        { id: 25, name: "Iced Tea", price: 2.99, description: "Sweet iced tea", category: "Drink" },
        { id: 26, name: "Protein Shake", price: 4.99, description: "High protein shake", category: "Drink" },
        { id: 27, name: "Smoothie", price: 5.49, description: "Fruit blended smoothie", category: "Drink" },
        { id: 28, name: "Steak Plate", price: 18.99, description: "Grilled steak served with sides", category: "Main" },
        { id: 29, name: "Classic Burger", price: 8.99, description: "Juicy beef burger with lettuce, tomato, and cheese", category: "Main" },
        { id: 30, name: "Chicken Tenders", price: 7.99, description: "Crispy fried chicken tenders with dipping sauce", category: "Main" },
        { id: 31, name: "Chicken Legs", price: 6.99, description: "Seasoned baked chicken legs", category: "Main" },
        { id: 32, name: "BBQ Ribs", price: 16.99, description: "Slow cooked ribs with BBQ sauce", category: "Main" }
    ];

    const mainMenu = document.getElementById("main-menu");
    const sideMenu = document.getElementById("side-menu");
    const dessertMenu = document.getElementById("dessert-menu");
    const drinkMenu = document.getElementById("drink-menu");

    mainMenu.innerHTML = "";
    sideMenu.innerHTML = "";
    dessertMenu.innerHTML = "";
    drinkMenu.innerHTML = "";

    menu.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("menu-card");

        card.innerHTML = `
            <img src="assets/${item.name.toLowerCase().replaceAll(' ', '-')}.jpg"
                 onerror="this.src='assets/default.jpg'"
                 alt="${item.name}">
            <div class="menu-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-bottom">
                    <span class="menu-price">$${item.price.toFixed(2)}</span>
                    ${isCustomizable(item)
                        ? `<button onclick="goToCustomize(${item.id})">Customize</button>`
                        : `<button onclick="addToCart(${item.id})">Add</button>`}
                </div>
            </div>
        `;

        if (item.category === "Main") {
            mainMenu.appendChild(card);
        } else if (item.category === "Side") {
            sideMenu.appendChild(card);
        } else if (item.category === "Dessert") {
            dessertMenu.appendChild(card);
        } else if (item.category === "Drink") {
            drinkMenu.appendChild(card);
        }
    });
}

function addToCart(id) {
    const menu = [
        { id: 1, name: "Chicken Bowl", price: 10.99, description: "Grilled chicken with rice and vegetables", category: "Main" },
        { id: 2, name: "Beef Bowl", price: 11.99, description: "Seasoned beef with rice and toppings", category: "Main" },
        { id: 3, name: "Salmon Plate", price: 13.99, description: "Grilled salmon with sides", category: "Main" },
        { id: 4, name: "Breakfast Plate", price: 8.99, description: "Eggs, toast, sausage, bacon, biscuits, and pancakes", category: "Main" },
        { id: 5, name: "Fitness Wrap", price: 9.99, description: "Low calorie wrap with lean protein", category: "Main" },
        { id: 6, name: "Chicken Alfredo", price: 12.99, description: "Creamy pasta with grilled chicken", category: "Main" },
        { id: 7, name: "Shrimp Pasta", price: 13.49, description: "Shrimp with garlic butter pasta", category: "Main" },
        { id: 8, name: "Turkey Burger", price: 10.49, description: "Lean turkey burger with toppings", category: "Main" },
        { id: 9, name: "French Fries", price: 3.99, description: "Crispy golden fries", category: "Side" },
        { id: 10, name: "Sweet Potato Fries", price: 4.49, description: "Sweet and crispy fries", category: "Side" },
        { id: 11, name: "Steamed Broccoli", price: 3.49, description: "Fresh steamed broccoli", category: "Side" },
        { id: 12, name: "Corn", price: 2.99, description: "Buttery corn", category: "Side" },
        { id: 13, name: "Green Beans", price: 3.49, description: "Seasoned green beans", category: "Side" },
        { id: 14, name: "Mashed Potatoes", price: 3.99, description: "Creamy mashed potatoes", category: "Side" },
        { id: 15, name: "Side Salad", price: 4.99, description: "Fresh greens with dressing", category: "Side" },
        { id: 16, name: "Chocolate Cake", price: 5.99, description: "Rich chocolate layered cake", category: "Dessert" },
        { id: 17, name: "Cheesecake", price: 5.99, description: "Classic creamy cheesecake", category: "Dessert" },
        { id: 18, name: "Brownie", price: 3.99, description: "Fudgy chocolate brownie", category: "Dessert" },
        { id: 19, name: "Ice Cream", price: 3.49, description: "Vanilla or chocolate ice cream", category: "Dessert" },
        { id: 20, name: "Apple Pie", price: 4.99, description: "Warm apple pie", category: "Dessert" },
        { id: 21, name: "Water", price: 1.49, description: "Bottled water", category: "Drink" },
        { id: 22, name: "Coke", price: 2.49, description: "Classic Coca-Cola", category: "Drink" },
        { id: 23, name: "Sprite", price: 2.49, description: "Lemon-lime soda", category: "Drink" },
        { id: 24, name: "Orange Juice", price: 3.49, description: "Fresh orange juice", category: "Drink" },
        { id: 25, name: "Iced Tea", price: 2.99, description: "Sweet iced tea", category: "Drink" },
        { id: 26, name: "Protein Shake", price: 4.99, description: "High protein shake", category: "Drink" },
        { id: 27, name: "Smoothie", price: 5.49, description: "Fruit blended smoothie", category: "Drink" },
        { id: 28, name: "Steak Plate", price: 18.99, description: "Grilled steak served with sides", category: "Main" },
        { id: 29, name: "Classic Burger", price: 8.99, description: "Juicy beef burger with lettuce, tomato, and cheese", category: "Main" },
        { id: 30, name: "Chicken Tenders", price: 7.99, description: "Crispy fried chicken tenders with dipping sauce", category: "Main" },
        { id: 31, name: "Chicken Legs", price: 6.99, description: "Seasoned baked chicken legs", category: "Main" },
        { id: 32, name: "BBQ Ribs", price: 16.99, description: "Slow cooked ribs with BBQ sauce", category: "Main" }
    ];

    const item = menu.find(food => food.id === id);
    if (!item) return;

    const cartItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        customizations: []
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${item.name} added to cart!`);
}

function isCustomizable(item) {
    const customizableMeals = [
        "Chicken Bowl",
        "Beef Bowl",
        "Salmon Plate",
        "Fitness Wrap",
        "Chicken Alfredo",
        "Shrimp Pasta",
        "Turkey Burger",
        "Classic Burger",
        "Breakfast Plate"
    ];

    return customizableMeals.includes(item.name);
}

function goToCustomize(id) {
    window.location.href = `customize.html?id=${id}`;
}

function scrollMenuLeft(id) {
    const container = document.getElementById(id);
    container.scrollBy({ left: -300, behavior: "smooth" });
}

function scrollMenuRight(id) {
    const container = document.getElementById(id);
    container.scrollBy({ left: 300, behavior: "smooth" });
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(".fade-on-scroll").forEach(el => {
    observer.observe(el);
});

loadMenu();
