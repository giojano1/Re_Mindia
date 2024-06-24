// Popup logic - ვამატებთ ლოგიკას რომელიც საშუალებას გვაძლევს გამოვაჩინოთ და დავმალოთ კალათის popup-ი

let shoppingCartIcon = document.querySelector('.cart-icon');
let closeBtn = document.querySelector('.close-btn');

shoppingCartIcon.addEventListener('click', () => {
  document.querySelector('.popup').classList.toggle('show');
});

// PopUp-ის დახურვა
closeBtn.addEventListener('click', () => {
  document.querySelector('.popup').classList.remove('show');
});

// დავაგენერიროთ პროდქუტები JSON ფაილის მიხედვით

fetch('../data/products.json')
  .then((response) => response.json())
  .then((products) => {
    // ვიძახებთ დივს რომელშიც ჩავსვათ პროდუქტებს

    const productContainer = document.getElementById('productContainer');

    products.forEach((product) => {
      console.log(product);
      // ვიწყებთ ქარდების შექმნას.

      const card = document.createElement('div');
      card.className = 'card';

      const details = document.createElement('div');
      details.className = 'details';

      const name = document.createElement('h2');
      name.textContent = product.name;
      details.appendChild(name);

      const price = document.createElement('p');
      price.textContent = `Price: $${product.price}`;
      details.appendChild(price);

      card.appendChild(details);

      // Button
      const quantityControls = document.createElement('div');
      quantityControls.className = 'quantity-controls';

      const decrementButton = document.createElement('button');
      decrementButton.textContent = '-';

      //! პირველი ღილაკის event-ი. ვამცირებთ პროდუქტის რაოდენობას

      decrementButton.addEventListener('click', () =>
        decrementQuantity(product.id)
      );

      quantityControls.appendChild(decrementButton);

      // input-ი რითიც ვცვლით პროდუქტის რაოდენობას ხელით
      const quantityInput = document.createElement('input');
      quantityInput.type = 'number';
      quantityInput.id = `quantity-${product.id}`;
      quantityInput.value = 1;
      quantityInput.min = 1;
      quantityControls.appendChild(quantityInput);

      //! მეორე ღილაკის event-ი. ვზრდით პროდუქტის რაოდენობას
      const incrementButton = document.createElement('button');
      incrementButton.textContent = '+';

      incrementButton.addEventListener('click', () =>
        incrementQuantity(product.id)
      );
      quantityControls.appendChild(incrementButton);

      card.appendChild(quantityControls);

      const addButton = document.createElement('button');
      addButton.textContent = 'Add to Cart';

      // მესამე ღილაკის event-ი, Add to cart-ზე დაჭერისას რა მოხდეს.

      addButton.addEventListener('click', () => {
        // ვიღებთ პროდუქტის რაოდენობას input-იდან და ვინახავთ ცვლადში სახელად quantity

        const quantity = parseInt(
          document.querySelector(`#quantity-${product.id}`).value
        );

        //! გვაქვს პროდუქტის დეტალები დამატებული რაოდენობა, რომელიც უნდა გადავგზავნოთ cart-ის popup-ში.

        addToCart({ ...product, quantity });
        console.log({ ...product, quantity });
      });
      card.appendChild(addButton);

      productContainer.appendChild(card);
    });
  })
  .catch((error) => console.error('Error:', error));

// პირველი ღილაკის ლოგიკა
function incrementQuantity(productId) {}

// მეორე ღილაკის ლოგიკა
function decrementQuantity(productId) {}

// მესამე ღილაკის ლოგიკა
function addToCart(product) {
  updateCartPopup();
}

// total ფასის გამოსათველელი ფუნქცია
function calculateTotalPrice(cart) {}

// რაოდენობის გამოსათველელი ფუნქცია
function calculateTotalQuantity(cart) {}

// ფუნქცია რომელიც ვიზუალურად განაახლებს კალათის popup-ს
function updateCartPopup() {}

const products = [
  {
    id: 1,
    title: 'Product 1',
    price: 19.99,
    description: 'This is the description for Product 1.',
  },
  {
    id: 2,
    title: 'Product 2',
    price: 29.99,
    description: 'This is the description for Product 2.',
  },
  {
    id: 3,
    title: 'Product 3',
    price: 39.99,
    description: 'This is the description for Product 3.',
  },
  {
    id: 4,
    title: 'Product 4',
    price: 49.99,
    description: 'This is the description for Product 4.',
  },
  {
    id: 5,
    title: 'Product 5',
    price: 59.99,
    description: 'This is the description for Product 5.',
  },
];
