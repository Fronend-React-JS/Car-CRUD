import {
  form,
  nameForm,
  yearForm,
  priceForm,
  colorForm,
  addBtn,
  nameFilter,
  yearFilter,
  statusFilter,
  search,
  tbody,
} from "./consts.js";

function validate() {
  if (!nameForm.value) {
    nameForm.style.outlineColor = "red";
    nameForm.focus();
    return;
  }

  if (!yearForm.value) {
    yearForm.style.outlineColor = "red";
    yearForm.focus();
    return;
  }

  if (yearForm.value < 1950 || yearForm.value >= new Date().getFullYear + 1) {
    alert("Yilni to'g'ri kiriting");
    yearForm.style.outlineColor = "red";
    yearForm.value = "";
    yearForm.focus();
    return;
  }

  if (!colorForm.value) {
    colorForm.style.outlineColor = "red";
    colorForm.focus();
    return;
  }

  if (!priceForm.value) {
    priceForm.style.outlineColor = "red";
    priceForm.focus();
    return;
  }

  if (priceForm.value < 100) {
    alert("Brat xazillashmang");
    priceForm.style.outlineColor = "red";
    priceForm.focus();
    return;
  }
}

addBtn && addBtn.addEventListener("click", function () {
    try {
      validate();

      let data = JSON.parse(localStorage.getItem("cars")) || [];
      const car = {
        id: Date.now(),
        name: nameForm.value,
        year: yearForm.value,
        price: priceForm.value,
        color: colorForm.value,
        status: "active",
      };

      data.push(car);
      form.reset();
      localStorage.setItem("cars", JSON.stringify(data));

      let tr = createRow(car, data.length - 1);
      tbody.innerHTML += tr;
    } catch (error) {
      alert("xatolik bor");
      console.log(error);
    }
  });

function filtered(item, element) {
  const data = JSON.parse(localStorage.getItem("cars")) || [];
  let filteredData = [];
  if (!element.value) {
    filteredData = data;
  } else {
    if (data.length) {
      if (item == "name") {
        filteredData = data.filter((car) => {
          return car.name == element.value;
        });
      } 
    }

      if (data.length) {
        if (item == "year") {
          filteredData = data.filter((car) => {
            return car.year == element.value;
          });
        } 
    }

        if (data.length) {
          if (item == "status") {
            filteredData = data.filter((car) => {
              return car.status == element.value;
            });
          }
        }
      }
    }

function createRow(car, index) {
  let status;
  if (car.status == "active") {
    status = "Sotilmagan";
  }

  if (car.status == "inactive") {
    status = "Sotilgan";
  }

  let tr = `
        <tr>
            <td>${index + 1}</td>
            <td>${car.name}</td>
            <td>${car.color}</td>
            <td>${car.price}</td>
            <td>${car.year}</td>
            <td>${status}</td>
        </tr>

    `;
  return tr;
}

document.addEventListener("DOMContentLoaded", function () {
  const cars = JSON.parse(localStorage.getItem("cars")) || [];

  if (cars.length) {
    let fakeDom = "";
    cars.forEach((car, index) => {
      let tr = createRow(car, index);

      fakeDom += tr;
    });

    tbody.innerHTML += fakeDom;
  }
});

nameFilter && nameFilter.addEventListener("change", function () {
    filtered('name', element)
});

yearFilter && nameFilter.addEventListener("change", function () {
    filtered('year', element)
});

statusFilter && nameFilter.addEventListener("change", function () {
    filtered('status', element)
});

search && search.addEventListener('input', function () {
    const data = JSON.parse(localStorage.getItem("cars")) || [];
   if (!this.value || this.value.length < 1) {
    tbody.innerHTML = '';
    let fakeFindAll = '';
    data.forEach((car, index) => {
        let tr = createRow(car, index);
        fakeFindAll = tr;
    })

    tbody.innerHTML += fakeFindAll;
   } 

   if (this.value.length >= 2) {
    let find = [];

    if (data.length) {
        find = data.filter(car => {
            return car.name.toLowerCars().includes(this.value.toLowerCars());
        })
    }

    if (!this.value) {
        tbody.innerHTML = '';
        let fakeFind = '';
        data.forEach((car, index) => {
            let tr = createRow(car, index);
            fakeFind = tr;
        })
    
        tbody.innerHTML += fakeFind;
       } 
   }
});