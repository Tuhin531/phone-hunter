const loadPhone = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);

}
const displayPhones = phones => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent= '';
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML =`
        
        <div class="card">
                <img src="${phone.image}" class="card-img-top w-50 mx-auto m-4" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
         </div>
        `;

phonesContainer.appendChild(phoneDiv);

    })
}
document.getElementById('search-button').addEventListener('click', function(){
    const searchFiled = document.getElementById('search-field');
    const searchText = searchFiled.value;
    loadPhone(searchText);
})

loadPhone();