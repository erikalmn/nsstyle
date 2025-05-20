let cart = document.querySelector('.cart');
let cartIcon = document.querySelector('#cart-icon');
let closeCart = document.querySelector('#close-cart');

// To activate the cart

cartIcon.onclick = () => {
    cart.classList.add("active");
};

// To deactivate the cart

closeCart.onclick = () => {
    cart.classList.remove("active");
};

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var removeCartButtons = document.getElementsByClassName('cart-remove');

    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity');

    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addCart = document.getElementsByClassName('add-cart');

    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }

    document.getElementsByClassName('btn-buy')[0].addEventListener('click', sendOrder);
}

function sendOrder() {
    const phone = "5585986659255";
    const cartContent = document.getElementsByClassName('cart-content')[0];
    const cartBoxes = cartContent.getElementsByClassName('cart-box');

    if (cartBoxes.length === 0) {
        alert("Seu pedido está vazio!");
        return;
    }

    let msg = "✨ Olá! Vi esses modelos e tenho interesse em realizar uma encomenda personalizada com algo parecido. Podemos falar? 😊\n\n🛍️ *Itens do meu carrinho:* \n";

    for (let i = 0; i < cartBoxes.length; i++) {
        const box = cartBoxes[i];
        const titulo = box.getElementsByClassName('cart-product-title')[0].innerText;
        const quantidade = box.getElementsByClassName('cart-quantity')[0].value;
        msg += `• ${titulo} (quantidade: ${quantidade})\n`;
    }

    const total = document.getElementsByClassName('total-price')[0].innerText;
    msg += `\n💰 *Total estimado:* ${total}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');

    // Limpa o carrinho após o envio
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

function quantityChanged(event) {
    var input = event.target;

    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    } updateTotal();
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;

    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");

    cartShopBox.classList.add('cart-box');

    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("Você já adicionou este item ao carrinho!");
            return;
        }
    }

    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="bx bxs-trash-alt cart-remove"></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName('cart-remove')[0]
        .addEventListener('click', removeCartItem);
    cartShopBox
        .getElementsByClassName('cart-quantity')[0]
        .addEventListener('change', quantityChanged);
}

function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var price = parseFloat(priceElement.innerText.replace("R$", ""));
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var quantity = quantityElement.value;

        total = total + (price * quantity);
        total = Math.round(total * 100) / 100; // If price contain some cents values
    } document.getElementsByClassName('total-price')[0].innerText = "R$" + total;
}