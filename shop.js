const goods = [
    {
        id: 0,
        title: 'pencil',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, nisi.',
        price: 2,
    },
    {
        id: 1,
        title: 'book',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, nisi.',
        price: 10,
    },
    {
        id: 2,
        title: 'pen',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, nisi.',
        price: 3,
    },
    {
        id: 3,
        title: 'album',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, nisi.',
        price: 5,
    }
],
    cart = [];
renderMyShop();

function renderMyShop() {
    const container = document.createElement('div');
    container.classList.add('container');
    goods.forEach((good) => {
        const item = document.createElement('div');
        item.classList.add('item');
        item.innerHTML=`<h3>${good.title}</h3>
                    <p>${good.description}</p>
                    <p>${good.price} &euro;</p>
                    <button data-id=${good.id}>add</button>`
        container.append(item);
    })
    const buttons = container.querySelectorAll('[data-id]');
        buttons.forEach((btn) => {
            btn.onclick = goodAddHandler;
        })
    document.querySelector('.left').append(container);
}

function goodAddHandler(event) {
    const id = +event.target.dataset.id;
    const item = goods.find(good => good.id == id);
    const goodInCart = cart.find(good => good.id == id);
    if (goodInCart) {
        goodInCart.quantity++
    } else {
        cart.push({
            id,
            title: item.title,
            price: item.price,
            quantity:1
        })
    }
    renderCart();
}
function renderCart() {
    document.querySelector('.right').innerHTML = `<h2>My cart</h2>`;
    const table = document.createElement('table');
    table.innerHTML =`<thead>
                    <th></th>
                    <th>title</th>
                    <th>price</th>
                    <th>quantity</th>
                    </thead>`
    const tbody = document.createElement('tbody');
    cart.forEach((item, index) => {
        tbody.innerHTML+=`<tr>
                        <td class="icon"><i class="fas fa-trash" data-id= ${index}> </i></td>
                        <td>${item.title}</td>
                        <td>${item.price} &euro;</td>
                        <td>${item.quantity}</td>
                        </tr>`
        addEventListener('click', removeFromCart);
    })
    tbody.onclick = removeFromCart;
    table.append(tbody);
    const total = document.createElement('h3');
    total.innerHTML=`Total:${cart.reduce((total,item)=> total+item.price* item.quantity, 0)}`
    document.querySelector('.right').append(table);
    document.querySelector('.right').innerHTML+=`<hr>`;
    document.querySelector('.right').append(total);
}

function removeFromCart(event) {
    if (event.target.classList.contains('fas')) {
        const index = +event.target.dataset.id;
        const good = cart[index];
        if (good.quantity > 1) {
            good.quantity--
        } else {
            cart.splice(index, 1);
        }
    }
    renderCart();
}