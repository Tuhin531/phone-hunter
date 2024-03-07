const loadPhone = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);

}
const displayPhones = phones => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';
    // show only 10 phones
    phones = phones.slice(0, 10);
    // Not found operation
    const noPhone = document.getElementById('no-found-massage');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }

    // phone found function
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        
        <div class="card">
                <img src="${phone.image}" class="card-img-top w-50 mx-auto m-4" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
         </div>
        `;

        phonesContainer.appendChild(phoneDiv);

    });
    // stop spinner loader

    toggleSpinner(false);

}
document.getElementById('search-button').addEventListener('click', function () {
    // start loader
    toggleSpinner(true);
    const searchFiled = document.getElementById('search-field');
    const searchText = searchFiled.value;
    loadPhone(searchText);
})
const toggleSpinner = isLoading => {

    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}



loadPhone('');