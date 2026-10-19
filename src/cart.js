function addToCart(cart, product, quantity) {
  if (quantity === 0 || quantity > product.stock) {
    throw new RangeError;
  }
  const item = cart.find((p) => p.id === product.id);
  if (!item) {
    cart.push({ ...product, quantity: quantity });
  } else {
    if (item.quantity < item.stock) {
      item.quantity += quantity;
    }
  }
  return cart;
}

function changeQuantity(cart, id, quantity) {
  const item = cart.find((p) => p.id === id);
  if (!item) return cart;
  if (quantity === 0 || quantity > item.stock) {
    throw new RangeError;
  }
  item.quantity = quantity;
  return cart;
}

function removeFromCart(cart, id) {
  const item = cart.find((p) => p.id === id);
  if (!item) return cart;
  cart = cart.filter((item) => item.id !== id);
  return cart;
}

function calculateCartSubtotal(cart) {
  if (cart.length === 0) return 0;
  let subtotal = 0;
  cart.forEach((item) => subtotal += item.price * item.quantity);
  return subtotal;
}

function calculateOrderTotal(cart, promo) {
  const total = {
    subtotal: calculateCartSubtotal(cart),
    discount: 0,
    delivery: 0,
    total: 0,
  }
  if (total.subtotal < 50000) {
    total.delivery = 30000;
  }
  if (total.subtotal >= 20000 && promo === 'SAVE10') {
    total.discount = total.subtotal * 0.1;
  }
  total.total = total.subtotal + total.delivery - total.discount;
  return total;
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
