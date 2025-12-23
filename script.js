let selectedProducts = [];
let productCatalog = document.getElementById('productCatalog');
let box = document.getElementById('box');
let formPopup = document.getElementById('formPopup');
let submitButton = document.querySelector('.submit-button');
let deliveryIcon = document.getElementById('deliveryIcon');

productCatalog.addEventListener('touchstart', handleTouchStart, false);
productCatalog.addEventListener('touchmove', handleTouchMove, false);

let touchStart = 0;
let touchEnd = 0;

function handleTouchStart(e) {
    touchStart = e.changedTouches[0].screenY;
}

function handleTouchMove(e) {
    touchEnd = e.changedTouches[0].screenY;

    if (touchStart - touchEnd > 50) {
        productCatalog.style.transform = 'translateY(-200px)';
    } else if (touchEnd - touchStart > 50) {
        productCatalog.style.transform = 'translateY(0)';
    }
}

function addToBox(product) {
    if (selectedProducts.length < 3) {
        product.classList.add('selected');
        selectedProducts.push(product);
        let stars = document.createElement('div');
        stars.classList.add('stars');
        box.appendChild(stars);

        if (selectedProducts.length === 3) {
            box.classList.add('active');
        }
    }
}

function showForm() {
    if (selectedProducts.length === 3) {
        formPopup.style.display = 'block';
    }
}

box.addEventListener('click', function () {
    if (selectedProducts.length === 3) {
        document.body.style.filter = 'blur(5px)';
        showForm();
    }
});

submitButton.addEventListener('click', function () {
    let inputs = formPopup.querySelectorAll('input');
    let allFilled = Array.from(inputs).every(input => input.value !== '');
    
    if (allFilled) {
        formPopup.style.display = 'none';
        document.body.style.filter = 'none';
        deliveryIcon.classList.add('active');
    }
});

document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('click', function () {
        addToBox(product);
    });
});

