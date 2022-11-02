const itemList = document.querySelectorAll(".item-list > figure");
const getItemList = document.querySelector(".btn-get");
const cartItems = [];
console.log(cartItems);



const setCartItem = (item, id) => {
    const src = item.querySelector("img").getAttribute("src");
    const title = item.querySelector(".txt-item").textContent;
    const findItemIdx = cartItems.findIndex((el) => el.id === id);
    // 일치하는 것이 없으면 -1을 반환한다.
    let quantity = 1;

    // 해당하는 요소가 있을 경우(선택한것 또 선택한 경우)->수량늘린다.
    if (findItemIdx !== -1) {
        if(cartItems[findItemIdx].quantity >= 5) {
            item.classList.add("soldout");
            return;
        }
        return cartItems(findItemIdx).quantity++;
    }
    // 해당요소 없는 경우 push된다.
    return cartItems.push({id, src, title, quantity});
}

const renderCartItem = () => {
    getItemList.innerHTML = "";

    cartItems.forEach((item) => {
        getItemList.innerHTML +=
        `
        <figure>
            <img src = ${item.src} >
            <p>${item.title}</p>
            <span>${item.quantity}</span>
        </figure>
        `;
    });
};

itemList.forEach((item) => {
    const id = 1;

    item.addEventListener('click', () => {
        item.classList.add("active");
        setCartItem(item, id);
        renderCartItem();
    });
})