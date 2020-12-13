// Define Product
let productsDom = document.querySelector(".products");
let products = productsDB;

// Display Producs
let drawProductsUI;
(drawProductsUI = function (products = []) {
  let productsUI = products.map((item) => {
    return `
      <div class="product-item" style="border: ${
        item.isMe === "Y" ? "2px solid green" : ""
      }">
        <img
          src="${item.imageUrl}"
          class="product-item-img"
          alt="image"
        />

        <div class="product-item-desc">
          <a onclick='saveItemData(${item.id})'>${item.title}</a>
          <p>${item.desc}</p>
          <span> Size: ${item.size} </span>

          ${
            item.isMe === "Y" &&
            "<button class='edit-product' onclick='editProduct(" +
              item.id +
              ")'> Edit Product </button>"
          }
        </div>
        <div class="product-item-actions">
          <button class="add-to-cart" onclick="addedToCart(${
            item.id
          })">Add To Cart</button>
          <i class="favorite far fa-heart" style="color: ${
            item.liked == true ? "red" : ""
          }" onclick="addToFavorite(${item.id})"></i>
        </div>
      </div>
    `;
  });

  productsDom.innerHTML = productsUI.join("");
})(JSON.parse(localStorage.getItem("products")) || products);

// Add To cart
function addedToCart(id) {
  if (localStorage.getItem("username")) {
    let products = JSON.parse(localStorage.getItem("products")) || products;
    let product = products.find((item) => item.id === id);
    let isProductInCart = addedItem.some((i) => i.id === product.id);

    if (isProductInCart) {
      addedItem = addedItem.map((p) => {
        if (p.id === product.id) p.qty += 1;
        return p;
      });
    } else {
      addedItem.push(product);
    }
    // UI
    cartProductDivDom.innerHTML = "";
    addedItem.forEach((item) => {
      cartProductDivDom.innerHTML += `<p>${item.title} <span class='item-qty'>${item.qty}</span></p>`;
    });

    // Save Data
    localStorage.setItem("productsInCart", JSON.stringify(addedItem));

    // Add counter of Items
    let cartProductItems = document.querySelectorAll(".carts-products div p");
    badgeDom.style.display = "block";
    badgeDom.innerHTML = cartProductItems.length;
  } else {
    window.location = "login.html";
  }
}

function getUniqueArr(arr, filterType) {
  let unique = arr
    .map((item) => item[filterType])
    .map((item, i, final) => final.indexOf(item) === i && i)
    .filter((item) => arr[item])
    .map((item) => arr[item]);

  return unique;
}

function saveItemData(id) {
  localStorage.setItem("productId", id);
  window.location = "cartDetails.html";
}

// search function
let input = document.getElementById("search");

input.addEventListener("keyup", function (e) {
  search(e.target.value, JSON.parse(localStorage.getItem("products")));

  if (e.target.value.trim() === "")
    drawProductsUI(JSON.parse(localStorage.getItem("products")));
});

function search(title, myArray) {
  let arr = myArray.filter(
    (item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
  );
  drawProductsUI(arr);
}

// Add To Favorite
let favoritesItems = localStorage.getItem("productsFavorite")
  ? JSON.parse(localStorage.getItem("productsFavorite"))
  : [];
function addToFavorite(id) {
  if (localStorage.getItem("username")) {
    let choosenItem = products.find((item) => item.id === id);
    choosenItem.liked = true;
    favoritesItems = [...favoritesItems, choosenItem];
    let uniqueProducts = getUniqueArr(favoritesItems, "id");
    localStorage.setItem("productsFavorite", JSON.stringify(uniqueProducts));
    products.map((item) => {
      if (item.id === choosenItem.id) {
        item.liked = true;
      }
    });
    localStorage.setItem("products", JSON.stringify(products));
    drawProductsUI(products);
  } else {
    window.location = "login.html";
  }
}

// Filter Products By Size
let sizeFilter = document.getElementById("size-filter");

sizeFilter.addEventListener("change", getProductsFilteredBySize);

function getProductsFilteredBySize(e) {
  let val = e.target.value;
  let products = JSON.parse(localStorage.getItem("products")) || products;

  if (val === "all") {
    drawProductsUI(products);
  } else {
    products = products.filter((i) => i.size === val);
    drawProductsUI(products);
  }
}

// Edit Product
function editProduct(id) {
  localStorage.setItem("editProduct", id);
  window.location = "editProduct.html";
}
