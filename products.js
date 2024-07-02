const API_URL = "https://dummyjson.com/products";
let selectCategory = document.querySelector(".category__select");
let selectSort = document.querySelector(".sort__select");
let tbody = document.querySelector(".tbody__products");

async function fetchData(api, category = "", sortBy = "", order = "") {
  let url = api;
  if (category) {
    url = `${api}/category/${category}`;
  } else if (sortBy && order) {
    url = `${api}?sortBy=${sortBy}&order=${order}`;
  }
  let data = await fetch(url);
  data
    .json()
    .then((res) => mapData(res))
    .catch((err) => console.log(err));
}

fetchData(API_URL);

function mapData(data) {
  let trTag = "";
  data?.products?.forEach((el) => {
    trTag += `
       <tr>
      <td class="user__name">
        <img src="${el.thumbnail}" alt="" />
        <p title="${el.description}">${el.brand}</p>
      </td>
      <td>${el.price} $</td>
      <td>${el.category}</td>
      <td>${el.discountPercentage} %</td>
    </tr>
        `;
  });
  tbody.innerHTML = trTag;
}

async function fetchCategories(api) {
  let data = await fetch(`${api}/categories`);
  data
    .json()
    .then((res) => mapCategory(res))
    .catch((err) => console.log(err));
}

fetchCategories(API_URL);

function mapCategory(categories) {
  let optionTag = "<option value=''>All</option>";
  categories.forEach((el) => {
    optionTag += `                  
      <option value="${el.slug}">${el.name}</option>
        `;
  });
  selectCategory.innerHTML = optionTag;
}

selectCategory.addEventListener("change", (event) => {
  let category = event.target.value;
  fetchData(API_URL, category);
});

selectSort.addEventListener("change", (event) => {
  let [sortBy, order] = event.target.value.split("-");
  fetchData(API_URL, "", sortBy, order);
});
