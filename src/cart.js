function addToCart(cart, product, quantity) {
  if (quantity === 0 || quantity > product.stock) {
    throw new RangeError;
  }
  const item = cart.find((p) => p.id === product.id);
  if (!item) {
    cart.push({ ...product, quantity: quantity });
  } else {
    item.quantity += quantity;
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

function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
