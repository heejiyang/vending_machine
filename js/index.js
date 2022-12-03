import colaData from './colaData.js'
// console.log(colaData)

// 콜라 종류 버튼 그리고 입금 반환 버튼
const colaList = document.querySelector('.list-item');
const inpDeposit = document.querySelector('#money');
const btnDeposit = document.querySelector('.btn-put-money');
const remain = document.querySelector('.remain');
const btnReturn = document.querySelector('.btn-return');

// 획득 내역과 버튼
const btnGet = document.querySelector('.btn-pocket');
const cart = document.querySelector('.pocket-list');

// 소지금 획득 음료 목록
const haveMoney = document.querySelector('.txt-money');
const getListItem = document.querySelector('.get-list');
const totalMoney = document.querySelector('.txt-total');

// 콜라 종류별 버튼
colaData.forEach((item) => {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <button class="item" type="button" data-item="${item.name}" data-stock="${item.stock}" data-img="${item.img}" data-price="${item.price}">
      <img src="./img/${item.img}" alt="${item.name}" class="img-item">
      <p class="txt-item">${item.name}</p>
      <p class="price-item">${item.price}원</p>
    </button>
  `
  colaList.appendChild(listItem);
})

// 입금액 입력. 입금 버튼 누르면 잔액, 소지금 바꾸기
btnDeposit.addEventListener('click', (event) => {
  event.preventDefault();
  const inputCost = parseInt(inpDeposit.value);
  const inhandMoney = parseInt(haveMoney.textContent.replaceAll(',', ''));
  const remainMoney = parseInt(remain.textContent.replaceAll(',', ''));

  if (inputCost) {
    if (inputCost <= inhandMoney && inputCost > 0) {
      haveMoney.textContent = (inhandMoney - inputCost).toLocaleString() + '원';
      remain.textContent = (inputCost + (remainMoney ? remainMoney : 0)).toLocaleString() + '원';
    } else {
      alert ('돈이 부족합니다. 입금해주세요.');
    }
    // 입금이 되면 입금액이 초기화가 되어야한다.
    inpDeposit.value = null;
  }
})

// 거스름돈 반환
btnReturn.addEventListener('click', (event) => {
  event.preventDefault();
  const inhandMoney = parseInt(haveMoney.textContent.replaceAll(',', ''));
  const remainMoney = parseInt(remain.textContent.replaceAll(',', ''));

  if (remainMoney) {
    haveMoney.textContent = (remainMoney + inhandMoney).toLocaleString() + '원';
    remain.textContent = '0원';
  }
})

// 콜라 종류 버튼 누르면 왼쪽 하단에 내역
// cart: 장바구니 <ul></ul>
const btnItem = document.querySelectorAll('.item');
const priceItem = parseInt(document.querySelector('.price-item').textContent);

btnItem.forEach((item) => {
  // 콜라 종류 불러오는 기능
  item.addEventListener('click', (event) => {
    const cartList = document.createElement('li');
    const remainMoney = parseInt(remain.textContent.replaceAll(',', ''));

    if (remainMoney >= priceItem){
      cartList.innerHTML = `
      <button>
        <img src="./img/${item.dataset.img}" alt="${item.dataset.item}">
        <p class="list_name">${item.dataset.item}</p>
        <p class="list_num">1</p>
      </button>
      `
      cart.appendChild(cartList);
      remain.textContent = (remainMoney - priceItem).toLocaleString() + '원';
    } else {
      alert ('돈을 넣으세요~!!')
    }
  })
})


// 카트로 구매 내역 넘어감

// 총 금액