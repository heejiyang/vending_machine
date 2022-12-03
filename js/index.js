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
const cart = document.querySelector('.get-list');

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
      inhandMoney.textContent = new Intl.NumberFormat('ko-KR').format(number) + '원';
      remainMoney.textContent = new Intl.NumberFormat('ko-KR').format(number) + '원';
    } else {
      alert ('돈이 부족합니다. 입금해주세요.');
    }
    inpDeposit.value = null;
  }
})

// 거스름돈 반환
btnReturn.addEventListener('click', event => {
  const inhandMoney = parseInt(haveMoney.textContent.replaceAll(',', ''));
  const remain = parseInt(haveMoney.textContent.replaceAll(',', ''));
})

// 콜라 종류 버튼 누르면 왼쪽 하단에 내역

// 카트로 구매 내역 넘어감

// 총 금액