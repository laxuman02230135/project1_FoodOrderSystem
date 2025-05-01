// Toggle cart overlay
const cartIcon = document.getElementById('cart-icon');
const cartOverlay = document.getElementById('cart-overlay');
const cartClose = document.getElementById('cart-close');
const overlay = document.getElementById('overlay');

if (cartIcon && cartOverlay && cartClose && overlay) {
    cartIcon.addEventListener('click', () => {
        cartOverlay.classList.add('active');
        overlay.style.display = 'block';
    });

    cartClose.addEventListener('click', () => {
        cartOverlay.classList.remove('active');
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', () => {
        cartOverlay.classList.remove('active');
        mobileMenu.classList.remove('active');
        overlay.style.display = 'none';
    });
}

// Toggle mobile menu
const menuIcon = document.getElementById('menu-icon');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');
// const overlay = document.getElementById('overlay'); 

if (menuIcon && mobileMenu && mobileMenuClose && overlay) {
    menuIcon.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        overlay.style.display = 'block';
    });

    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        overlay.style.display = 'none';
    });
}



/*--- FAQ section ----*/
document.addEventListener('DOMContentLoaded', function() {
    // FAQ toggle functionality
    const questions = document.querySelectorAll('.faq-question');
    
    questions.forEach(question => {
      question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');
      });
    });
    
    // Tag filtering
    const tags = document.querySelectorAll('.tag');
    const items = document.querySelectorAll('.faq-item');
    
    tags.forEach(tag => {
      tag.addEventListener('click', () => {
        // Update active tag
        tags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        
        const filter = tag.getAttribute('data-filter');
        
        // Filter items
        items.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchFaq');
    const searchBtn = document.getElementById('searchBtn');
    
    const performSearch = () => {
      const searchTerm = searchInput.value.toLowerCase();
      
      items.forEach(item => {
        const question = item.querySelector('.faq-question').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer-content').textContent.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    };
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  });





  // Menu functionality section/
  document.addEventListener('DOMContentLoaded', function() {
    // Category switching functionality
    const categoryButtons = document.querySelectorAll('.category-button');
    const menuSections = document.querySelectorAll('.menu-items');
    
    // Show the first category by default
    showCategory('main-meals');
    
    // Add click event listeners to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            showCategory(category);
            
            // Update active button styling
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    function showCategory(categoryId) {
        // Hide all menu sections
        menuSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show the selected category
        document.getElementById(categoryId).classList.add('active');
    }
    
    // Shopping cart functionality
    const cart = [];
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const orderList = document.getElementById('order-list');
    const orderTotal = document.getElementById('order-total');
    const cartIcon = document.getElementById('cart-icon');
    
    // Add click event listeners to all "Add to Order" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const itemName = menuItem.querySelector('h3').textContent;
            const itemPrice = parseFloat(menuItem.querySelector('.price').textContent.replace('Nu. ', ''));
            
            // Check if item already exists in cart
            const existingItem = cart.find(item => item.name === itemName);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: itemName,
                    price: itemPrice,
                    quantity: 1
                });
            }
            
            
            // Visual feedback
            this.textContent = 'Added!';
            setTimeout(() => {
                this.textContent = 'Add to Order';
            }, 1000);
            updateCartDisplay();
        });
    });
    
    // Function to update the cart display
    function updateCartDisplay() {
        // Clear current order list
        orderList.innerHTML = '';
        
        let total = 0;
        
        if (cart.length === 0) {
            orderList.innerHTML = '<li>No items selected yet</li>';
        } else {
            cart.forEach(item => {
                const li = document.createElement('li');
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                li.innerHTML = `
                    <span class="item-name">${item.name}</span>
                    <span class="item-quantity">x${item.quantity}</span>
                    <span class="item-price">Nu. ${itemTotal}</span>
                    <button class="remove-item" data-name="${item.name}">×</button>
                `;
                
                orderList.appendChild(li);
            });
        }
        
        // Update total
        orderTotal.textContent = `Total: Nu. ${total}`;
        
        // Update cart icon badge
        updateCartBadge();
    }
    
    // Function to update cart badge
    function updateCartBadge() {
        // Remove existing badge if any
        const existingBadge = document.querySelector('.cart-badge');
        if (existingBadge) {
            existingBadge.remove();
        }
        
        // Calculate total items in cart
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (itemCount > 0) {
            const badge = document.createElement('span');
            badge.className = 'cart-badge';
            badge.textContent = itemCount;
            cartIcon.appendChild(badge);
        }
    }
    
    // Handle remove item clicks (using event delegation)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            const itemName = e.target.getAttribute('data-name');
            removeItemFromCart(itemName);
        }
    });
    
    // Function to remove item from cart
    function removeItemFromCart(itemName) {
        const itemIndex = cart.findIndex(item => item.name === itemName);
        
        if (itemIndex !== -1) {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity -= 1;
            } else {
                cart.splice(itemIndex, 1);
            }
            
            updateCartDisplay();
        }
    }
    
    // Form submission
    const orderForm = document.getElementById('orderForm');
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (cart.length === 0) {
            alert('Please add at least one item to your order');
            return;
        }
        
        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            pickupTime: document.getElementById('pickup-time').value,
            instructions: document.getElementById('special-instructions').value,
            items: [...cart],
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };
        
        // Here you would typically send this data to a server
        console.log('Order submitted:', formData);
        
        // Show confirmation
        alert(`Order submitted successfully!\nTotal: Nu. ${formData.total}\nPickup time: ${formData.pickupTime}`);
        
        // Reset form and cart
        orderForm.reset();
        cart.length = 0;
        updateCartDisplay();
    });
    
    // Initialize cart display
    updateCartDisplay();
});