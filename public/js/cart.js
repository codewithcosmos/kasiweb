document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadCart();

    // Function to load products (mockup example)
    function loadProducts() {
        fetch('/products')
            .then(response => response.json())
            .then(products => {
                const productList = document.getElementById('product-list');
                products.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.innerHTML = `
                        <p>${product.name} - $${product.price}</p>
                        <button onclick="addToCart('${product._id}')">Add to Cart</button>
                    `;
                    productList.appendChild(productDiv);
                });
            })
            .catch(err => console.error('Error loading products:', err));
    }

    // Function to add items to the cart
    window.addToCart = function(productId) {
        fetch('/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId, quantity: 1 }) // Example with quantity 1
        })
        .then(response => response.json())
        .then(cart => {
            console.log('Item added to cart:', cart);
            loadCart();
        })
        .catch(err => console.error('Error adding to cart:', err));
    };

    // Function to load the cart content
    function loadCart() {
        fetch('/cart')
            .then(response => response.json())
            .then(cart => {
                const cartDiv = document.getElementById('cart');
                cartDiv.innerHTML = `
                    <p>Total Quantity: ${cart.totalQuantity}</p>
                    <p>Total Price: $${cart.totalPrice}</p>
                    <ul>
                        ${cart.items.map(item => `
                            <li>${item.productId.name} - Quantity: ${item.quantity}</li>
                        `).join('')}
                    </ul>
                `;
            })
            .catch(err => console.error('Error loading cart:', err));
    }
});
// Add your JavaScript functionality for the cart here
document.addEventListener('DOMContentLoaded', function() {
    // Example: Load cart items from local storage or server
    console.log('Cart script loaded');
});
