// Popular Games in India
const games = [
    { id: 1, name: "GTA V (Grand Theft Auto V)", price: 1499, image: "https://cdn1.epicgames.com/offer/b0cd075465c44f87be3b505ac04a2e46/EGS_GrandTheftAutoVEnhanced_RockstarNorth_S1_2560x1440-906d8ae76a91aafc60b1a54c23fab496" },
    { id: 2, name: "Fantasy Quest Online", price: 49.99, image: "https://www.brueckenkopf-online.com/wp-content/uploads/2024/06/opr-quest-release-1.jpg" },
    { id: 3, name: "Racing Legends", price: 39.99, image: "https://play-lh.googleusercontent.com/182MHezS8rfFkJ2VhIHHsduNzVkRT_t04oKjiseAlIVjmkfgO2oa691XEP5M3VVjdA=w526-h296-rw" },
    { id: 4, name: "Space Odyssey", price: 54.99, image: "https://i.ytimg.com/vi/qk_ZlcbdDSI/maxresdefault.jpg" },
    { id: 5, name: "Zombie Survival", price: 44.99, image: "https://i.ytimg.com/vi/uYy6teFied0/maxresdefault.jpg" },
    { id: 6, name: "Medieval Kingdoms", price: 64.99, image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/499660/capsule_616x353.jpg?t=1771360794" },
    { id: 7, name: "Battle Royale Arena", price: 29.99, image: "https://i.ytimg.com/vi/p5rtf3Q2HgQ/maxresdefault.jpg" },
    { id: 8, name: "Dragon's Legacy", price: 69.99, image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2520410/header.jpg?t=1726064636" },
    { id: 9, name: "Free Fire", price: 54.99, image: "https://images.sftcdn.net/images/t_app-cover-s,f_auto/p/075556d5-d706-4d17-a76e-1f403be46b3b/151916978/free-fire-gameloop-FF-1%20(1).png" },
    { id: 10, name: "ETS 2", price: 59.99, image: "https://i.ytimg.com/vi/xlTuC18xVII/maxresdefault.jpg" },
    { id: 11, name: "Horror Mansion", price: 34.99, image: "https://s3.amazonaws.com/twbmarketingprod/files/local/721/2f1dd20856/addams-family-haunted-mansion-scenic-backdrop-lightbox-23cc57.jpg" },
    { id: 12, name: "GTA V ", price: 49.99, image: "https://img.gta5-mods.com/q95/images/save-game-44/a82937-v_trunk_1920x1080.jpg" },];

let cart = [];
let filteredGames = [...games];

document.addEventListener('DOMContentLoaded', () => {
    displayGames();
    setupEventListeners();
    setupSearch();
    setupFilter();
});

function setupSearch() {
    const searchBox = document.getElementById('searchBox');
    searchBox.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filteredGames = games.filter(game => 
            game.name.toLowerCase().includes(searchTerm)
        );
        displayGames();
    });
}

function setupFilter() {
    const filterSelect = document.getElementById('filterCategory');
    filterSelect.addEventListener('change', (e) => {
        const category = e.target.value;
        if (category === 'all') {
            filteredGames = [...games];
        } else if (category === 'free') {
            filteredGames = games.filter(game => game.price === 0);
        } else {
            filteredGames = games.filter(game => game.category === category);
        }
        displayGames();
    });
}

function displayGames() {
    const gamesList = document.getElementById('gamesList');
    gamesList.innerHTML = filteredGames.map(game => {
        const discount = game.originalPrice > game.price ? 
            Math.round(((game.originalPrice - game.price) / game.originalPrice) * 100) : 0;
        
        return `
        <div class="game-card">
            ${game.price === 0 ? '<div class="free-badge">FREE</div>' : ''}
            ${discount > 0 ? `<div class="discount-badge">-${discount}%</div>` : ''}
            <img src="${game.image}" alt="${game.name}" class="game-image">
            <div class="game-info">
                <div class="game-name">${game.name}</div>
                <div class="rating">
                    ${'⭐'.repeat(Math.floor(game.rating))} ${game.rating}
                </div>
                <div class="game-price">
                    ${game.price === 0 ? 'FREE' : '$' + game.price}
                    ${discount > 0 ? `<span style="text-decoration: line-through; color: #999; font-size: 14px; margin-left: 10px;">₹${game.originalPrice}</span>` : ''}
                </div>
                <button class="btn-add" onclick="addToCart(${game.id})">Add to Cart</button>
            </div>
        </div>
    `}).join('');
}

function addToCart(gameId) {
    const game = games.find(g => g.id === gameId);
    const existingItem = cart.find(item => item.id === gameId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...game, quantity: 1 });
    }
    
    updateCartCount();
    showNotification('Added to cart!');
}

function removeFromCart(gameId) {
    cart = cart.filter(item => item.id !== gameId);
    updateCartCount();
    displayCart();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align:center;padding:20px;color:#999;">Your cart is empty</p>';
        totalPrice.textContent = '0';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong><br>
                <span>${item.price === 0 ? 'FREE' : '₹' + item.price} x ${item.quantity}</span>
            </div>
            <button class="btn-remove" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPrice.textContent = total;
}

function setupEventListeners() {
    const modal = document.getElementById('cartModal');
    const cartBtn = document.getElementById('cartBtn');
    const closeBtn = document.querySelector('.close');
    const generateQRBtn = document.getElementById('generateQR');
    
    cartBtn.onclick = () => {
        modal.style.display = 'block';
        displayCart();
    };
    
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };
    
    window.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };
    
    generateQRBtn.onclick = generateQRCode;
}

function generateQRCode() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const customerName = document.getElementById('customerName').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    
    if (!customerName) {
        alert('Please enter your name!');
        return;
    }
    
    if (!customerPhone) {
        alert('Please enter your phone number!');
        return;
    }
    
    const paymentMethod = document.getElementById('paymentMethod').value;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderId = 'ORD-' + Date.now();
    
    // Prepare bill data
    const billData = {
        customerName: customerName,
        customerPhone: customerPhone,
        orderId: orderId,
        paymentMethod: paymentMethod,
        items: cart,
        total: total
    };
    
    // Redirect to bill page with data
    const dataString = encodeURIComponent(JSON.stringify(billData));
    window.location.href = `bill.html?data=${dataString}`;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}
