const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);

}
const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';
    // show only 10 phones
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
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
                  <button onclick="loadPhoneDetails('${phone.slug}')"  class="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Details</button>
                </div>
               
        `;

        phonesContainer.appendChild(phoneDiv);

    });
    // stop spinner loader

    toggleSpinner(false);

}
// 
const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchFiled = document.getElementById('search-field');
    const searchText = searchFiled.value;
    loadPhone(searchText, dataLimit);


}


document.getElementById('search-button').addEventListener('click', function () {
    // start loader
    processSearch(10);
})

// event handelar for Enter 
document.getElementById('search-field').addEventListener('keypress', function (e) {

    if (e.key === 'Enter') {
        processSearch(10);
    }
});

const toggleSpinner = isLoading => {

    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}
// Search more option
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})


const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhonesDetails(data.data);



}
const displayPhonesDetails = phone => {
    console.log(phone);
    const modelTitle = document.getElementById('phoneDetailModalLabel');
    modelTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    
    <p> Release Data: ${phone.releaseDate ? phone.releaseDate : 'No release date.'}</p>
    <p> Storage: ${phone.mainFeature ? phone.mainFeature.storage : 'No storage Feature date.'}</p>
    <p> Others: ${phone.others ? phone.others.Bluetooth : 'no release date.'}</p>
    
    
    `
}

loadPhone('iphone');