// Popup logic - ვამატებთ ლოგიკას რომელიც საშუალებას გვაძლევს გამოვაჩინოთ და დავმალოთ კალათის popup-ი

let shoppingCartIcon = document.querySelector(".cart-icon");
let closeBtn = document.querySelector(".close-btn");

shoppingCartIcon.addEventListener("click", () => {
  document.querySelector(".popup").classList.toggle("show");
});

// PopUp-ის დახურვა
closeBtn.addEventListener("click", () => {
  document.querySelector(".popup").classList.remove("show");
});

// დავაგენერიროთ პროდქუტები JSON ფაილის მიხედვით

fetch("../data/products.json")
  .then((response) => response.json())
  .then((products) => {
    // ვიძახებთ დივს რომელშიც ჩავსვათ პროდუქტებს

    const productContainer = document.getElementById("productContainer");

    products.forEach((product) => {
      // ვიწყებთ ქარდების შექმნას.

      const card = document.createElement("div");
      card.className = "card";

      const details = document.createElement("div");
      details.className = "details";

      const name = document.createElement("h2");
      name.textContent = product.name;
      details.appendChild(name);

      const price = document.createElement("p");
      price.textContent = `Price: $${product.price}`;
      details.appendChild(price);

      card.appendChild(details);

      // Button
      const quantityControls = document.createElement("div");
      quantityControls.className = "quantity-controls";

      const decrementButton = document.createElement("button");
      decrementButton.textContent = "-";

      //! პირველი ღილაკის event-ი. ვამცირებთ პროდუქტის რაოდენობას

      decrementButton.addEventListener("click", () =>
        decrementQuantity(product.id)
      );

      quantityControls.appendChild(decrementButton);

      // input-ი რითიც ვცვლით პროდუქტის რაოდენობას ხელით
      const quantityInput = document.createElement("input");
      quantityInput.type = "number";
      quantityInput.id = `quantity-${product.id}`;
      quantityInput.value = 1;
      quantityInput.min = 1;
      quantityControls.appendChild(quantityInput);

      //! მეორე ღილაკის event-ი. ვზრდით პროდუქტის რაოდენობას
      const incrementButton = document.createElement("button");
      incrementButton.textContent = "+";

      incrementButton.addEventListener("click", () =>
        incrementQuantity(product.id)
      );
      quantityControls.appendChild(incrementButton);

      card.appendChild(quantityControls);

      const addButton = document.createElement("button");
      addButton.textContent = "Add to Cart";

      // მესამე ღილაკის event-ი, Add to cart-ზე დაჭერისას რა მოხდეს.

      addButton.addEventListener("click", () => {
        // ვიღებთ პროდუქტის რაოდენობას input-იდან და ვინახავთ ცვლადში სახელად quantity

        const quantity = parseInt(
          document.querySelector(`#quantity-${product.id}`).value
        );

        //! გვაქვს პროდუქტის დეტალები დამატებული რაოდენობა, რომელიც უნდა გადავგზავნოთ cart-ის popup-ში.

        addToCart({ ...product, quantity });
      });
      card.appendChild(addButton);

      productContainer.appendChild(card);
    });
  })
  .catch((error) => console.error("Error:", error));

// პირველი ღილაკის ლოგიკა
function incrementQuantity(myId) {
  const quantityInput = document.querySelector(`#quantity-${myId}`);
  quantityInput.value = parseInt(quantityInput.value) + 1;
}

// მეორე ღილაკის ლოგიკა
function decrementQuantity(myId) {
  const quantityInput = document.querySelector(`#quantity-${myId}`);
  if (parseInt(quantityInput.value) > 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
  }
}

// მესამე ღილაკის ლოგიკა
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let exitingProductIndex = cart.findIndex((p) => p.id === product.id);
  if (exitingProductIndex >= 0) {
    cart[exitingProductIndex].quantity += product.quantity;
  } else {
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartPopup();
}

// total ფასის გამოსათველელი ფუნქცია
function calculateTotalPrice(cart) {
  return cart.reduce((sum, p) => sum + Number(p.price) * Number(p.quantity), 0);
}

// რაოდენობის გამოსათველელი ფუნქცია
function calculateTotalQuantity(cart) {
  return cart.reduce((sum, p) => sum + Number(p.quantity), 0);
}

// ფუნქცია რომელიც ვიზუალურად განაახლებს კალათის popup-ს
function updateCartPopup() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = calculateTotalPrice(cart);
  let items = calculateTotalQuantity(cart);
  const popup = document.querySelector(".popup");
  popup.textContent = "";
  console.log("gas2");
  cart.forEach((product, index) => {
    const itemElement = document.createElement("div");
    itemElement.textContent = `${product.name} - $${product.price} Quantity: ${product.quantity}`;
    itemElement.className = "item";

    const button = document.createElement("button");
    button.textContent = "Remove";
    button.addEventListener("click", function () {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartPopup();
    });

    popup.appendChild(itemElement);
    popup.appendChild(button);
  });
  const totalElement = document.createElement("div");
  totalElement.textContent = items;
  popup.appendChild(totalElement);

  const totalPrice = document.createElement("div");
  totalPrice.textContent = `Total Price : ${total}`;
  popup.appendChild(totalPrice);
}
