const urlParams = new URLSearchParams(window.location.search);
const mealId = parseInt(urlParams.get("id"));

const menu = [
    {
        id: 1,
        name: "Chicken Bowl",
        price: 10.99,
        ingredients: ["Chicken", "Rice", "Broccoli", "Sweet Potatoes", "Sauce"]
    },
    {
        id: 2,
        name: "Beef Bowl",
        price: 10.99,
        ingredients: ["Beef", "Rice", "Sweet Potatoes", "Broccoli", "Sauce"]
    },
    {
        id: 3,
        name: "Salmon Plate",
        price: 13.99,
        ingredients: ["Salmon", "Rice"]
    },
    {
        id: 4,
        name: "Breakfast Plate",
        price: 8.99,
        ingredients: ["Eggs", "Bacon", "Grits", "Toast", "Sausage", "Biscuits", "Pancakes", "Waffles"]
    },
    {
        id: 5,
        name: "Fitness Wrap",
        price: 9.99,
        ingredients: ["Flour Tortilla", "Chicken Breast", "Lean Beef", "Onion", "Tomato", "Lettuce", "Cheese", "Spinach"]
    },
    {
        id: 6,
        name: "Chicken Alfredo",
        price: 12.99,
        ingredients: ["Chicken", "Pasta", "Alfredo Sauce", "Parmesan"]
    },
    {
        id: 7,
        name: "Shrimp Pasta",
        price: 13.49,
        ingredients: ["Shrimp", "Pasta", "Garlic Butter", "Seasoning"]
    },
    {
        id: 8,
        name: "Turkey Burger",
        price: 10.49,
        ingredients: ["Turkey Patty", "Bun", "Lettuce", "Tomato"]
    },
    {
        id: 29,
        name: "Classic Burger",
        price: 8.99,
        ingredients: ["Beef Patty", "Bun", "Lettuce", "Tomato", "Cheese"]
    }
];

const meal = menu.find(item => item.id === mealId);

if (!meal) {
    document.getElementById("meal-name").textContent = "Meal not found";
} else {
    document.getElementById("meal-name").textContent = meal.name;
    document.getElementById("meal-image").src =
        `assets/${meal.name.toLowerCase().replaceAll(" ", "-")}.jpg`;
    document.getElementById("meal-image").alt = meal.name;

    const ingredientsList = document.getElementById("ingredients-list");

    meal.ingredients.forEach((ingredient, index) => {
        const row = document.createElement("div");
        row.classList.add("ingredient-row");
        row.id = `ingredient-${index}`;
        row.dataset.removed = "false";

        row.innerHTML = `
    <span class="ingredient-name">${ingredient}</span>
    <div class="ingredient-actions">
        <button id="keep-${index}" class="ingredient-btn keep-btn active" onclick="keepIngredient(${index})">✓ Keep</button>
        <button id="remove-${index}" class="ingredient-btn remove-btn" onclick="removeIngredient(${index})">✕ Remove</button>
    </div>
`;

        ingredientsList.appendChild(row);
    });
}

function removeIngredient(index) {
    const row = document.getElementById(`ingredient-${index}`);
    const keepBtn = document.getElementById(`keep-${index}`);
    const removeBtn = document.getElementById(`remove-${index}`);

    if (!row || !keepBtn || !removeBtn) return;

    row.dataset.removed = "true";
    row.classList.add("removed");

    removeBtn.classList.add("active");
    keepBtn.classList.remove("active");
}

function keepIngredient(index) {
    const row = document.getElementById(`ingredient-${index}`);
    const keepBtn = document.getElementById(`keep-${index}`);
    const removeBtn = document.getElementById(`remove-${index}`);

    if (!row || !keepBtn || !removeBtn) return;

    row.dataset.removed = "false";
    row.classList.remove("removed");

    keepBtn.classList.add("active");
    removeBtn.classList.remove("active");
}

window.addCustomizedToCart = function() {
    if (!meal) return;

    const rows = document.querySelectorAll(".ingredient-row");
    const customizations = [];

    rows.forEach(row => {
        if (row.dataset.removed === "true") {
            const ingredientName = row.querySelector(".ingredient-name").textContent;
            customizations.push(`No ${ingredientName}`);
        }
    });

    const cartItem = {
        id: meal.id,
        name: meal.name,
        price: meal.price,
        quantity: 1,
        customizations: customizations
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(cartItem);
    console.log("Saving cart:", cart);
    alert("Added to cart");
    localStorage.setItem("cart", JSON.stringify(cart));

    window.location.href = "cart.html";
};
