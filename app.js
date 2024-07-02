

const API_URL = "https://dummyjson.com/users";

let tbody = document.querySelector(".tbody");

async function fetchData(api) {
  let data = await fetch(api);
  data
    .json()
    .then((res) => mapData(res))
    .catch((err) => console.log(err));
}

fetchData(API_URL);





function mapData(data) {
  let trTag = "";
  data.users.forEach((el) => {
    trTag += `
           <tr >
    <td className="user__name">
      <img width='30' src=${el.image} alt="" />
      <div className="name">
        <p>${el.firstName}</p>
        <p>${el.lastName}</p>
      </div>
    </td>
    <td>${el.birthDate} Date</td>
    <td>${el.email}</td>
    <td>${el.gender}</td>
    <td>${el.phone}</td>
  </tr>
        `;
  });

  tbody.innerHTML = trTag;
}
