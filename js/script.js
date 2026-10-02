/* FoodieHub - all site logic (vanilla JS + localStorage) */
document.documentElement.dataset.theme = localStorage.getItem('theme') || 'light';
const FOODS = [
  { id: 1, name: 'Margherita Pizza', cat: 'Pizza', price: 249, rating: 4.5, emoji: '🍕', img: 'images/margherita-pizza.png', desc: 'Classic cheese pizza with fresh basil and tomato sauce.' },
  { id: 2, name: 'Paneer Tikka Pizza', cat: 'Pizza', price: 329, rating: 4.7, emoji: '🍕', img: 'images/paneer-tikka-pizza.png', desc: 'Smoky paneer, onions and capsicum on a crisp base.' },
  { id: 3, name: 'Veg Burger', cat: 'Burger', price: 119, rating: 4.2, emoji: '🍔', img: 'images/veg-burger.png', desc: 'Crispy veg patty with lettuce, tomato and mayo.' },
  { id: 4, name: 'Chicken Burger', cat: 'Burger', price: 169, rating: 4.6, emoji: '🍔', img: 'images/chicken-burger.png', desc: 'Juicy grilled chicken patty with cheese and sauce.' },
  { id: 5, name: 'Chicken Biryani', cat: 'Indian Food', price: 259, rating: 4.8, emoji: '🍛', img: 'images/chicken-biryani.png', desc: 'Fragrant basmati rice cooked with spiced chicken.' },
  { id: 6, name: 'Paneer Butter Masala', cat: 'Indian Food', price: 219, rating: 4.6, emoji: '🍲', img: 'images/paneer-butter-masala.png', desc: 'Soft paneer in a rich creamy tomato gravy.' },
  { id: 7, name: 'Masala Dosa', cat: 'Indian Food', price: 99, rating: 4.4, emoji: '🥞', img: 'images/masala-dosa.png', desc: 'Crispy dosa filled with spiced potato, with chutney.' },
  { id: 8, name: 'Veg Hakka Noodles', cat: 'Chinese', price: 149, rating: 4.3, emoji: '🍜', img: 'images/veg-hakka-noodles.png', desc: 'Stir-fried noodles tossed with fresh vegetables.' },
  { id: 9, name: 'Veg Manchurian', cat: 'Chinese', price: 139, rating: 4.4, emoji: '🥘', img: 'images/veg-manchurian.png', desc: 'Crispy veg balls in a tangy Indo-Chinese gravy.' },
  { id: 10, name: 'Fried Rice', cat: 'Chinese', price: 129, rating: 4.1, emoji: '🍚', img: 'images/fried-rice.png', desc: 'Wok-tossed rice with vegetables and soy sauce.' },
  { id: 11, name: 'White Sauce Pasta', cat: 'Pasta', price: 189, rating: 4.5, emoji: '🍝', img: 'images/white-sauce-pasta.png', desc: 'Penne in creamy white sauce with herbs and veggies.' },
  { id: 12, name: 'Red Sauce Pasta', cat: 'Pasta', price: 179, rating: 4.3, emoji: '🍝', img: 'images/red-sauce-pasta.png', desc: 'Spicy tomato arrabbiata pasta with olives.' },
  { id: 13, name: 'French Fries', cat: 'Snacks', price: 79, rating: 4.2, emoji: '🍟', img: 'images/french-fries.png', desc: 'Golden crispy fries with peri-peri seasoning.' },
  { id: 14, name: 'Samosa (2 pcs)', cat: 'Snacks', price: 49, rating: 4.5, emoji: '🥟', img: 'images/samosa.png', desc: 'Crispy pastry with spiced potato filling.' },
  { id: 15, name: 'Veg Sandwich', cat: 'Snacks', price: 89, rating: 4.0, emoji: '🥪', img: 'images/veg-sandwich.png', desc: 'Grilled sandwich with veggies, cheese and chutney.' },
  { id: 16, name: 'Chocolate Brownie', cat: 'Desserts', price: 109, rating: 4.8, emoji: '🍫', img: 'images/chocolate-brownie.png', desc: 'Warm fudgy brownie with chocolate drizzle.' },
  { id: 17, name: 'Gulab Jamun (2 pcs)', cat: 'Desserts', price: 69, rating: 4.6, emoji: '🍮', img: 'images/gulab-jamun.png', desc: 'Soft milk dumplings soaked in sugar syrup.' },
  { id: 18, name: 'Vanilla Ice Cream', cat: 'Desserts', price: 89, rating: 4.3, emoji: '🍨', img: 'images/vanilla-ice-cream.png', desc: 'Creamy vanilla scoops with a cone crunch.' },
  { id: 19, name: 'Cold Coffee', cat: 'Beverages', price: 99, rating: 4.5, emoji: '🧋', img: 'images/cold-coffee.png', desc: 'Chilled coffee blended with milk and ice cream.' },
  { id: 20, name: 'Fresh Lime Soda', cat: 'Beverages', price: 59, rating: 4.1, emoji: '🍹', img: 'images/fresh-lime-soda.png', desc: 'Refreshing sweet and salty lime soda.' },
  { id: 21, name: 'Masala Tea', cat: 'Beverages', price: 29, rating: 4.6, emoji: '🍵', img: 'images/masala-tea.png', desc: 'Hot chai brewed with ginger, cardamom and fresh milk.' },
  { id: 22, name: 'Idli Sambar (3 pcs)', cat: 'Indian Food', price: 35, rating: 4.5, emoji: '🥣', img: 'images/idli-sambar.png', desc: 'Soft steamed idlis served with hot sambar and coconut chutney.' }
];
const CATS = [['Pizza', '🍕'], ['Burger', '🍔'], ['Indian Food', '🍛'], ['Chinese', '🍜'], ['Pasta', '🍝'], ['Snacks', '🍟'], ['Desserts', '🍨'], ['Beverages', '🧋']];
const FREE_ABOVE = 500, DELIVERY = 40;

/* ---------- storage helpers ---------- */
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const getCart = () => load('cart', []);
const inr = n => '₹' + n;
const stars = r => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r)) + ' ' + r;
const foodImg = (img, emoji, name) => img ? `<img src="${img}" alt="${name}" loading="lazy" onerror="this.replaceWith('${emoji}')">` : emoji;
const $ = s => document.querySelector(s);
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 1800); }
function totals(cart) {
  const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const del = sub === 0 || sub >= FREE_ABOVE ? 0 : DELIVERY;
  return { sub, del, total: sub + del };
}

/* ---------- cart actions ---------- */
function addToCart(id) {
  const cart = getCart(), item = cart.find(i => i.id === id);
  if (item) item.qty++; else { const f = FOODS.find(x => x.id === id); cart.push({ id, name: f.name, price: f.price, emoji: f.emoji, img: f.img, qty: 1 }); }
  save('cart', cart); updateBadge(); toast('Added to cart ✔');
}
function changeQty(id, d) {
  let cart = getCart(); const item = cart.find(i => i.id === id);
  if (item) item.qty += d;
  save('cart', cart.filter(i => i.qty > 0)); renderCart(); updateBadge();
}
function removeItem(id) { save('cart', getCart().filter(i => i.id !== id)); renderCart(); updateBadge(); }
function clearCart() { save('cart', []); renderCart(); updateBadge(); }
function updateBadge() { const b = $('#cartCount'); if (b) b.textContent = getCart().reduce((s, i) => s + i.qty, 0); }

/* ---------- shared layout ---------- */
function layout() {
  const page = document.body.dataset.page, user = load('user', null);
  const links = [['index.html', 'Home', 'home'], ['menu.html', 'Menu', 'menu'], ['about.html', 'About Us', 'about'], ['contact.html', 'Contact', 'contact'], ['cart.html', 'Cart <span class="badge" id="cartCount">0</span>', 'cart']];
  $('#header').innerHTML = `<nav class="nav"><a href="index.html" class="logo">Foodie<b>Hub</b> 🍴</a>
   <button class="menu-btn" id="menuBtn" aria-label="Menu">☰</button><ul id="navList">
   ${links.map(l => `<li><a href="${l[0]}" class="${l[2] === page ? 'active' : ''}">${l[1]}</a></li>`).join('')}
   <li>${user ? `<a href="#" id="logout">Logout (${user.name.split(' ')[0]})</a>` : `<a href="login.html" class="${page === 'login' || page === 'signup' ? 'active' : ''}">Login</a>`}</li><li><button class="theme-btn" id="themeBtn" aria-label="Toggle dark mode"></button></li></ul></nav>`;
  $('#footer').innerHTML = `<footer><div class="foot">
   <div><h3>FoodieHub 🍴</h3><p>Delicious food delivered to your door.</p></div>
   <div><h3>Quick Links</h3><a href="index.html">Home</a><a href="menu.html">Menu</a><a href="about.html">About Us</a><a href="contact.html">Contact</a></div>
   <div><h3>Account</h3><a href="login.html">Login</a><a href="signup.html">Sign Up</a><a href="cart.html">Cart</a></div></div>
   <p class="copy">© 2026 FoodieHub – College Project Demo</p></footer>`;
  $('#menuBtn').onclick = () => $('#navList').classList.toggle('open');
  const tb = $('#themeBtn');
  const paint = () => tb.textContent = document.documentElement.dataset.theme === 'dark' ? '☀️' : '🌙';
  paint();
  tb.onclick = () => {
    const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = t;
    localStorage.setItem('theme', t);
    paint();
  };
  const lo = $('#logout'); if (lo) lo.onclick = e => { e.preventDefault(); localStorage.removeItem('user'); location.href = 'index.html'; };
  updateBadge();
}

/* ---------- food cards ---------- */
function foodCard(f) {
  return `<div class="card food"><div class="food-img">${foodImg(f.img, f.emoji, f.name)}</div><div class="food-body">
   <span class="tag">${f.cat}</span><h3>${f.name}</h3><p>${f.desc}</p>
   <div class="stars">${stars(f.rating)}</div>
   <div class="food-foot"><span class="price">${inr(f.price)}</span><button class="btn sm" onclick="addToCart(${f.id})">Add to Cart</button></div></div></div>`;
}

/* ---------- home ---------- */
function initHome() {
  $('#cats').innerHTML = CATS.map(c => `<a class="cat" href="menu.html?cat=${encodeURIComponent(c[0])}"><span>${c[1]}</span>${c[0]}</a>`).join('');
  $('#featured').innerHTML = [...FOODS].sort((a, b) => b.rating - a.rating).slice(0, 4).map(foodCard).join('');
}

/* ---------- menu: search, filter, sort ---------- */
function initMenu() {
  const cat = $('#category');
  cat.innerHTML = '<option value="">All Categories</option>' + CATS.map(c => `<option>${c[0]}</option>`).join('');
  const p = new URLSearchParams(location.search).get('cat'); if (p) cat.value = p;
  const render = () => {
    const q = $('#search').value.trim().toLowerCase(), s = $('#sort').value;
    let list = FOODS.filter(f => f.name.toLowerCase().includes(q) && (!cat.value || f.cat === cat.value));
    if (s) list.sort((a, b) => s === 'asc' ? a.price - b.price : b.price - a.price);
    $('#menuGrid').innerHTML = list.length ? list.map(foodCard).join('') : '<p class="empty">No food found. Try another search.</p>';
  };
  ['input', 'change'].forEach(e => document.querySelectorAll('.filters input,.filters select').forEach(el => el.addEventListener(e, render)));
  render();
}

/* ---------- cart page ---------- */
function renderCart() {
  const cart = getCart(), box = $('#cartItems'), sum = $('#summary');
  if (!cart.length) { box.innerHTML = '<div class="card empty"><div class="big">🛒</div><h3>Your cart is empty</h3><p class="muted">Add something tasty to get started.</p><a href="menu.html" class="btn">Browse Menu</a></div>'; sum.hidden = true; return; }
  sum.hidden = false;
  box.innerHTML = cart.map(i => `<div class="card item"><div class="em">${foodImg(i.img, i.emoji, i.name)}</div>
   <div class="info"><h3>${i.name}</h3><span class="price">${inr(i.price)}</span></div>
   <div class="qty"><button onclick="changeQty(${i.id},-1)">−</button><b>${i.qty}</b><button onclick="changeQty(${i.id},1)">+</button></div>
   <b>${inr(i.price * i.qty)}</b><button class="rm" onclick="removeItem(${i.id})">Remove</button></div>`).join('');
  const t = totals(cart);
  sum.innerHTML = `<h3>Order Summary</h3>
   <div class="sum-row"><span>Subtotal</span><span>${inr(t.sub)}</span></div>
   <div class="sum-row"><span>Delivery</span><span>${t.del ? inr(t.del) : 'FREE'}</span></div>
   <div class="sum-row t"><span>Total</span><span>${inr(t.total)}</span></div>
   <p class="muted">Free delivery on orders above ${inr(FREE_ABOVE)}.</p>
   <button class="btn full" onclick="location.href='checkout.html'">Place Order</button>
   <button class="btn full ghost" onclick="clearCart()">Clear Cart</button>`;
}

/* ---------- form validation helper ---------- */
function validate(form, rules) {
  let ok = true;
  for (const name in rules) {
    const el = form.elements[name], msg = rules[name](el.value.trim(), form);
    el.classList.toggle('bad', !!msg);
    el.parentElement.querySelector('.err').textContent = msg || '';
    if (msg) ok = false;
  }
  return ok;
}
const req = label => v => v ? '' : `${label} is required`;
const emailRule = v => !v ? 'Email is required' : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address';
const passRule = v => !v ? 'Password is required' : v.length < 6 ? 'Password must be at least 6 characters' : '';

/* ---------- checkout + confirmation ---------- */
function initCheckout() {
  const form = $('#checkoutForm'), cart = getCart();
  if (new URLSearchParams(location.search).get('order') && load('lastOrder', null)) return showConfirmation(load('lastOrder'));
  if (!cart.length) { $('#checkoutBox').innerHTML = '<div class="card empty"><div class="big">🛒</div><h3>Your cart is empty</h3><a href="menu.html" class="btn">Browse Menu</a></div>'; return; }
  const t = totals(cart);
  $('#orderTotal').innerHTML = `<span>Total to pay (${cart.length} items)</span><b>${inr(t.total)}</b>`;
  const user = load('user', null); if (user) { form.elements.name.value = user.name; form.elements.email.value = user.email; }
  form.onsubmit = e => {
    e.preventDefault();
    const ok = validate(form, {
      name: req('Full name'),
      mobile: v => /^[6-9]\d{9}$/.test(v) ? '' : 'Enter a valid 10-digit mobile number',
      email: emailRule, address: req('Address'), city: req('City'),
      pincode: v => /^\d{6}$/.test(v) ? '' : 'Enter a valid 6-digit pincode',
      payment: req('Payment method')
    });
    if (!ok) return;
    const order = {
      id: 'FH' + Date.now().toString().slice(-8), name: form.elements.name.value.trim(), items: cart, total: t.total,
      payment: form.elements.payment.value, eta: '30-40 minutes', date: new Date().toLocaleString()
    };
    const all = load('orders', []); all.push(order); save('orders', all); save('lastOrder', order); save('cart', []);
    location.href = 'checkout.html?order=1';
  };
}
function showConfirmation(o) {
  $('#checkoutBox').hidden = true; const c = $('#confirmBox'); c.hidden = false;
  c.innerHTML = `<div class="card pad success"><div style="font-size:4rem">🎉</div><h2>Order Placed Successfully!</h2>
   <p><b>Order ID:</b> ${o.id}<br><b>Customer:</b> ${o.name}<br><b>Payment:</b> ${o.payment}<br><b>Estimated Delivery:</b> ${o.eta}</p>
   <table><tr><th>Item</th><th>Qty</th><th>Price</th></tr>${o.items.map(i => `<tr><td>${i.emoji} ${i.name}</td><td>${i.qty}</td><td>${inr(i.price * i.qty)}</td></tr>`).join('')}</table>
   <h3>Total Amount: ${inr(o.total)}</h3><br><a href="menu.html" class="btn">Order More</a></div>`;
}

/* ---------- login / signup / contact ---------- */
function initLogin() {
  const f = $('#loginForm');
  f.onsubmit = e => {
    e.preventDefault();
    if (!validate(f, { email: emailRule, password: passRule })) return;
    const u = load('users', []).find(x => x.email === f.elements.email.value.trim().toLowerCase() && x.password === f.elements.password.value);
    if (!u) { f.elements.password.parentElement.querySelector('.err').textContent = 'Wrong email or password'; return; }
    save('user', { name: u.name, email: u.email }); location.href = 'index.html';
  };
}
function initSignup() {
  const f = $('#signupForm');
  f.onsubmit = e => {
    e.preventDefault();
    if (!validate(f, {
      name: v => v.length < 3 ? 'Name must be at least 3 characters' : '', email: emailRule, password: passRule,
      confirm: (v, fm) => !v ? 'Please confirm your password' : v !== fm.elements.password.value ? 'Passwords do not match' : ''
    })) return;
    const users = load('users', []), email = f.elements.email.value.trim().toLowerCase();
    if (users.some(u => u.email === email)) { f.elements.email.parentElement.querySelector('.err').textContent = 'This email is already registered'; return; }
    users.push({ name: f.elements.name.value.trim(), email, password: f.elements.password.value }); save('users', users);
    toast('Account created! Please login.'); setTimeout(() => location.href = 'login.html', 1200);
  };
}
function initContact() {
  const f = $('#contactForm');
  f.onsubmit = e => {
    e.preventDefault();
    if (!validate(f, { name: req('Name'), email: emailRule, subject: req('Subject'), message: v => v.length < 10 ? 'Message must be at least 10 characters' : '' })) return;
    const m = load('messages', []); m.push({ name: f.elements.name.value, email: f.elements.email.value, subject: f.elements.subject.value, message: f.elements.message.value }); save('messages', m);
    f.reset(); toast('Message sent. We will reply soon!');
  };
}

/* ---------- start ---------- */
document.addEventListener('DOMContentLoaded', () => {
  layout();
  const init = { home: initHome, menu: initMenu, cart: renderCart, checkout: initCheckout, login: initLogin, signup: initSignup, contact: initContact }[document.body.dataset.page];
  if (init) init();
});