// Get Data form LocalStorage
let get_user = localStorage.getItem("username");
let get_email = localStorage.getItem("email");
let products = JSON.parse(localStorage.getItem("products")) || productsDB;
let myProducts = products.filter((i) => i.isMe === "Y");
// Variables
let userDom2 = document.getElementById("username");
let userEmailDom = document.getElementById("email");
let productsLength = document.querySelector("#productsLength span");

userDom2.innerHTML = get_user;
userEmailDom.innerHTML = get_email;
if (myProducts.length != 0) {
  productsLength.innerHTML = myProducts.length;
} else {
  productsLength.remove();
}
