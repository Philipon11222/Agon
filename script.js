// База товарів
let products = [
    { id: 1, name: "Смартфон", price: 8000 },
    { id: 2, name: "Ноутбук", price: 25000 },
    { id: 3, name: "Навушники", price: 1500 }
];

let cart = [];
let productIdCounter = 4;

// 1. Відображення товарів на сторінці
function renderProducts() {
    const list = document.getElementById('product-list');
    list.innerHTML = '';
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

// 2. Додавання нового товару (З лабораторної №10)
function addProduct(event) {
    event.preventDefault();
    
    document.getElementById('product-name-error').textContent = '';
    document.getElementById('product-price-error').textContent = '';

    const name = document.getElementById('product-name').value.trim();
    const price = document.getElementById('product-price').value.trim();
    let isValid = true;

    // Перевірка назви: літери, цифри, пробіли, символи -, _
    const nameRegex = /^[a-zA-Z0-9а-яА-ЯіІїЇєЄґҐ\s\-_]+$/;
    if (!nameRegex.test(name) || name.length === 0) {
        document.getElementById('product-name-error').textContent = 'Назва: лише літери, цифри, пробіли, "-", "_".';
        isValid = false;
    }

    // Перевірка ціни: додатні числа (можливі 2 знаки після коми)
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    if (!priceRegex.test(price)) {
        document.getElementById('product-price-error').textContent = 'Ціна має бути додатнім числом (напр. 150 або 150.50).';
        isValid = false;
    }

    if (isValid) {
        products.push({ id: productIdCounter++, name: name, price: parseFloat(price) });
        renderProducts();
        document.getElementById('add-product-form').reset();
        alert('Товар успішно додано!');
    }
}

// 3. Додавання в кошик
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
}

// 4. Оновлення кошика
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

// 5. Видалення з кошика
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// 6. Відкриття/закриття кошика
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
}

// 7. Оформлення замовлення (Валідація полів)
function placeOrder(event) {
    event.preventDefault(); 
    
    document.getElementById('name-error').textContent = '';
    document.getElementById('phone-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('address-error').textContent = '';

    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    const email = document.getElementById('customer-email').value.trim();
    const address = document.getElementById('customer-address').value.trim();
    let isValid = true;

    // Ім'я: тільки літери та пробіли
    const nameRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s]{2,50}$/;
    if (!nameRegex.test(name)) {
        document.getElementById('name-error').textContent = 'Введіть коректне ім\'я (лише літери).';
        isValid = false;
    }

    // Телефон: формат +380XXXXXXXXX
    const phoneRegex = /^(\+?38)?0\d{9}$/;
    if (!phoneRegex.test(phone)) {
        document.getElementById('phone-error').textContent = 'Формат: +380991234567';
        isValid = false;
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('email-error').textContent = 'Введіть коректний Email.';
        isValid = false;
    }

    // Адреса (мін. 5 символів)
    if (address.length < 5) {
        document.getElementById('address-error').textContent = 'Адреса занадто коротка.';
        isValid = false;
    }

    if (!isValid) return;
    if (cart.length === 0) { alert("Ваш кошик порожній!"); return; }

    alert(`Дякуємо, ${name}! Замовлення на суму ${document.getElementById('cart-total').innerText} грн оформлено.`);
    cart = [];
    updateCart();
    document.getElementById('order-form').reset();
    toggleCart();
}

// Запуск
renderProducts();
