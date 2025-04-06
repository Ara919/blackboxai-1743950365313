// Cart functionality
const cart = {
  items: [],
  total: 0,

  // Add item to cart
  addItem(item) {
    const existingItem = this.items.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({...item, quantity: 1});
    }
    this.updateTotal();
    this.saveToLocalStorage();
  },

  // Remove item from cart
  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.updateTotal();
    this.saveToLocalStorage();
  },

  // Update item quantity
  updateQuantity(id, quantity) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.quantity = quantity;
      this.updateTotal();
      this.saveToLocalStorage();
    }
  },

  // Calculate total price
  updateTotal() {
    this.total = this.items.reduce(
      (sum, item) => sum + (item.price * item.quantity), 0
    );
  },

  // Save cart to localStorage
  saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  },

  // Load cart from localStorage
  loadFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
      this.updateTotal();
    }
  }
};

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
  cart.loadFromLocalStorage();
  
  // Add event listeners for cart functionality
  if (document.querySelector('.add-to-cart')) {
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', (e) => {
        const item = {
          id: e.target.dataset.id,
          name: e.target.dataset.name,
          price: parseFloat(e.target.dataset.price),
          image: e.target.dataset.image
        };
        cart.addItem(item);
        alert(`${item.name} added to cart!`);
      });
    });
  }
});