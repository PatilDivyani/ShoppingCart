//in aside section
/*
    filter depending on colors sizes rating price
    flterbtn to display that particular section
    category: "men's clothing" , 
*/
/*
 { 
    "id": 1, 
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops", 
    "price": 109.95, 
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",		
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", 
    "rating": { "rate": 3.9, "count": 120 } ,
    “Colours”:[“red”,”blue”,”black”],
    “sizes”:[“s”,”l”,”m”,”xl”]
 },

*/

async function fetchApi() {
  const apiUrl = `https://fakestoreapi.com/products`;

  try {
    let response = await fetch(apiUrl);
    var arrData = await response.json();

    localStorage.setItem("myArr", JSON.stringify(arrData));
    // alert("Added to Session Storage");
    if (arrData) {
      console.log("data", arrData);
      displayProducts(arrData);
    }
  } catch (error) {
    console.log(error);
  }
}

let arrCart = [];
let men = document.querySelector("#men");
let women = document.querySelector("#women");
let jewellery = document.querySelector("#jewellery");
let electronics = document.querySelector("#electronic");

function showItems(arr) {
  console.log("showingItem");
  const cardSection = document.createElement("div");
  cardSection.className = "cardsSection";
  arr.forEach((obj) => {
    const card = document.createElement("div");
    card.className = "card";
    let titlesmall = obj.title.substring(0, 12);
    card.innerHTML = `
                <img
                  src="${obj.image}"
                  alt="img.jpg"
                />
                <div class="itemDetails">
                  <p class="itemTitle">${titlesmall}...</p>
                  <div class="price-size">
                    <p>$${obj.price}</p>
                    <p>S,M,L</p>
                  </div>
                  <div class="cardColor">
                    <span>Colors : </span>
                    <span></span>
                  </div>
                  <div class="rating">
                    <span>Rating : ${obj.rating.rate}</span>
                  </div>
                </div>
                <button id="addToCart" onclick="addToCart(${obj.id})" type="submit">Add To Cart</button>
       `;
    cardSection.append(card);
  });
  // men.append(cardSection)
  return cardSection;
}
function displayProducts(arrData) {
  menClothing(arrData);
  womenClothing(arrData);
  jewSection(arrData);
  eleSection(arrData);
}
function menClothing(arr) {
  men.innerHTML = "";
  const p = document.createElement("p");
  p.innerHTML = `Men's Clothing`;
  men.append(p);
  let filteredArr = arr.filter((obj) => {
    return obj.category.substring(0, 3) === "men";
  });
  console.log("Men", filteredArr);
  men.append(showItems(filteredArr));
}
function womenClothing(arr) {
  women.innerHTML = "";
  const p = document.createElement("p");
  p.innerHTML = `Women's Clothing`;
  women.append(p);
  let filteredArr = arr.filter((obj) => {
    return obj.category.substring(0, 3) === "wom";
  });
  console.log("Women", filteredArr);
  women.append(showItems(filteredArr));
}
function jewSection(arr) {
  jewellery.innerHTML = "";
  const p = document.createElement("p");
  p.innerHTML = `Jewellery's Clothing`;
  jewellery.append(p);
  let filteredArr = arr.filter((obj) => {
    return obj.category.substring(0, 3) === "jew";
  });
  console.log("Jewellery", filteredArr);
  jewellery.append(showItems(filteredArr));
}
function eleSection(arr) {
  electronics.innerHTML = "";
  const p = document.createElement("p");
  p.innerHTML = `Electronic's Clothing`;
  electronics.append(p);
  let filteredArr = arr.filter((obj) => {
    return obj.category.substring(0, 3) === "ele";
  });
  console.log("Electronic", filteredArr);
  electronics.append(showItems(filteredArr));
}

//get all filter btn
const menBtn = document.querySelector("#menBtn");
const womBtn = document.querySelector("#womBtn");
const jewBtn = document.querySelector("#jewBtn");
const eleBtn = document.querySelector("#eleBtn");

document.querySelector("#all").addEventListener("click", () => {
  let arr = localStorage.getItem("myArr");
  console.log(JSON.parse(arr));
  alert("All products");
  displayProducts(JSON.parse(arr));
});

menBtn.addEventListener("click", () => {
  alert("Men");
  let arr = localStorage.getItem("myArr");
  women.innerHTML = "";
  jewellery.innerHTML = "";
  electronics.innerHTML = "";
  menClothing(JSON.parse(arr));
  //    menBtn.className = 'afterSelectingBtn'
});
womBtn.addEventListener("click", () => {
  alert("Women");
  let arr = localStorage.getItem("myArr");
  men.innerHTML = "";
  jewellery.innerHTML = "";
  electronics.innerHTML = "";
  womenClothing(JSON.parse(arr));
  //    menBtn.className = 'afterSelectingBtn'
});
jewBtn.addEventListener("click", () => {
  alert("Jewellery");
  let arr = localStorage.getItem("myArr");
  women.innerHTML = "";
  men.innerHTML = "";
  electronics.innerHTML = "";
  jewSection(JSON.parse(arr));
  //    menBtn.className = 'afterSelectingBtn'
});
eleBtn.addEventListener("click", () => {
  alert("Electronics");
  let arr = localStorage.getItem("myArr");
  women.innerHTML = "";
  jewellery.innerHTML = "";
  men.innerHTML = "";
  eleSection(JSON.parse(arr));
  //    menBtn.className = 'afterSelectingBtn'
});

let token = sessionStorage.getItem("accessToken");
if (token) {
  if (localStorage.getItem("myArr")) {
    var myArr = JSON.parse(localStorage.getItem("myArr"));
    
    displayProducts(myArr);
  } else {
    // user is coming to the site for the very first time
    fetchApi();
  }
} else {
  setTimeout(() => {
    const path = ``;
    window.location.href = `.${path}/login.html`;
  }, 2000);
}

function addToCart(id) {
  let arr = JSON.parse(localStorage.getItem("myArr"));
  if(localStorage.getItem("arrCart")){
    console.log('earlierpresent' , JSON.parse(localStorage.getItem("arrCart")));
    arrCart = JSON.parse(localStorage.getItem("arrCart"))
    arr.find((item) => {
      if (item.id === id) {
        arrCart.push(item);
      }
    });
  }
  else{
    arr.find((item) => {
      if (item.id === id) {
        arrCart.push(item);
      }
    });
  }
  console.log(arrCart);
  localStorage.setItem("arrCart", JSON.stringify(arrCart));
}
