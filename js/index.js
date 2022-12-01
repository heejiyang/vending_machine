import colaData from './colaData.js'
// console.log(colaData)

const colaList = document.querySelector('.list-item');
const inpDeposit = document.querySelector('#money');
const btnDeposit = document.querySelector('.btn-put-money');
const remain = document.querySelector('.remain');
const btnReturn = document.querySelector('.btn-return');

const btnGet = document.querySelector('.btn-pocket');
const cart = document.querySelector('.get-list');

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
  event.preventDefault()
})

// 콜라 종류 버튼 누르면 왼쪽 하단에 내역

// 카트로 구매 내역 넘어감

// 총 금액