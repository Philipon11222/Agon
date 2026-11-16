// База товарів
const products = [
    { id: 1, name: "Смартфон", price: 8000 },
    { id: 2, name: "Ноутбук", price: 25000 },
    { id: 3, name: "Навушники", price: 1500 },
    { id: 4, name: "Розумний годинник", price: 4500 }
];

let cart = [];

// 1. Відображення товарів на сторінці
function renderProducts() {
    const list = document.getElementById('product-list');
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.price} грн</p>
            <button class="btn" onclick="addToCart(${product.id})">Додати в кошик</button>
        `;
        list.appendChild(card);
    });
}

// 2. Додавання в кошик
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
}

// 3. Оновлення кошика
function updateCart() {
    document.getElementById('cart-count').innerText = cart.length;
    
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name}</span>
            <span>${item.price} грн <button onclick="removeFromCart(${index})" style="color:red; border:none; background:none; cursor:pointer;">✖</button></span>
        `;
        cartItems.appendChild(li);
    });

    document.getElementById('cart-total').innerText = total;
}

// 4. Видалення з кошика
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// 5. Відкриття/закриття кошика (Обробка події кліку)
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
}

// 6. Оформлення замовлення (Обробка події форми)
function placeOrder(event) {
    event.preventDefault(); // Зупиняємо перезавантаження сторінки
    
    if (cart.length === 0) {
        alert("Ваш кошик порожній!");
        return;
    }

    const name = document.getElementById('customer-name').value;
    
    // Отримуємо дані з полів введення і виводимо повідомлення
    alert(`Дякуємо, ${name}! Ваше замовлення на суму ${document.getElementById('cart-total').innerText} грн успішно оформлено.`);
    
    // Очищаємо кошик та форму
    cart = [];
    updateCart();
    document.getElementById('order-form').reset();
    toggleCart();
}

// Запуск відображення товарів при завантаженні сторінки
renderProducts();
