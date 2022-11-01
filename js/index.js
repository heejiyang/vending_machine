const itemList = document.querySelectorAll('.cola_type > li');
const getItemList = document.querySelector(".get_drink");

const setCartItem = (item) => {
    const src = item.querySelector('img').getAttribute("src");
    console.log(src);
    // const cloneLi = item.cloneNode(true);
    // console.log(cloneLi);
    // getItemList.append
}

itemList.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.add("active");
        setCartItem(item);
    });
})