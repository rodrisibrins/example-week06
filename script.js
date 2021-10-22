let nameInp = document.getElementById("name");
let emailInp = document.getElementById("mail");
let addressInp = document.getElementById("address");
let form = document.querySelector("form");
let modalContainer = document.getElementById("modal-subscription");
let modalTitle = document.querySelector(".modal-content > h3");
let modalData = document.querySelector(".modal-content > ul")
let closeBtn = document.getElementsByClassName("close-btn")[0];

function successfullModal(userInfo) {
    let jsonToString = JSON.stringify(userInfo);
    modalContainer.style.display = "block";
    modalTitle.innerHTML = "Successfull Register!!";
    modalData.innerHTML = `<li>${jsonToString}</li>`;
    localStorage.setItem("userName", nameInp.value);
    localStorage.setItem("userEmail", emailInp.value);
    localStorage.setItem("userAddress", addressInp.value);
}

function errorModal(errorInfo) {
    modalContainer.style.display = "block";
    modalTitle.innerHTML = "Sorry, there was an error :(";
    modalData.innerHTML = `<li>${errorInfo}</li>`;
}

window.addEventListener("load", function () {
    let currentUserName = localStorage.getItem("userName");
    let currentUserEmail = localStorage.getItem("userEmail");
    let currentUserAddress = localStorage.getItem("userAddress");

    nameInp.value = currentUserName;
    emailInp.value = currentUserEmail;
    addressInp.value = currentUserAddress;
})

form.addEventListener("submit", function (e) {
    modalContainer.style.display
    const baseUrl = `http://curso-dev-2021.herokuapp.com/newsletter?name=${nameInp.value}&email=${emailInp.value}&address=${addressInp.value}`
    fetch(baseUrl)
        .then(response =>
            response.json())
        .then(data =>
            successfullModal(data))
        .catch((error) => {
            errorModal(error);
        });
    e.preventDefault();
});

closeBtn.addEventListener("click", function () {
    modalContainer.style.display = "none";
})

window.addEventListener("click", function (e) {
    if (e.target == modalContainer) {
        modalContainer.style.display = "none";
    }
})