import colaData from './colaData.js'
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
  const inputCost = parseInt(inpDeposit.value); // 입금액
  const inhandMoney = parseInt(haveMoney.textContent.replaceAll(',', '')); // 소지금
  const remainMoney = parseInt(remain.textContent.replaceAll(',', '')); // 잔액

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

// 콜라 종류 불러오는 기능. item = 각각의 button
btnItem.forEach((item) => {
  item.addEventListener('click', (event) => {
    const targetEl = event.currentTarget;
    const remainMoney = parseInt(remain.textContent.replaceAll(',', ''));
    // const priceItem = parseInt(item.dataset.price);
    const priceItem = parseInt(document.querySelector('.price-item').textContent);
    const cartListItem = cart.querySelectorAll('li');
    const cartList = document.createElement('li');
    let stack = false;

    // 각각의 콜라버튼 누르는데, 이미 선택되어서 카트 안에 있나요?
    if (remainMoney >= priceItem){
      remain.textContent = (remainMoney - priceItem).toLocaleString() + '원';
      cartList.dataset.item = item.dataset.item;

    // forEach 문을 사용할 경우 반복의 종료가 불가능하다(return, break 작동 안함). 모든 원소를 순환할 필요가 없다면 비효율적.
    // 클릭한 음료수가 내가 이미 선택한 아이템인지 탐색. 내가 클릭한 상품과 내가 담은 상품이 같을 경우
      for (const item of cartListItem) {
        if(item.dataset.item === targetEl.dataset.item){
          item.querySelector('.list_num').textContent++;
          stack = true;
          break;
        }
      };

      // 콜라 처음 선택했을 경우.
      if ( !stack ){
        cartList.innerHTML = `
          <button type="button" class="btn-cola-minus">
            <img src="./img/${item.dataset.img}" alt="${item.dataset.item}">
            <p class="list_name">${item.dataset.item}</p>
            <span class="list_num">1</span>
          </button>
        `
        cart.appendChild(cartList);
      }
      targetEl.dataset.stock--;

      // 상품이 소진되면 품절 표시
      if (!parseInt(targetEl.dataset.stock)){
        targetEl.classList.add('soldout');
        targetEl.disabled = true;
        targetEl.insertAdjacentHTML('afterbegin', '<em class="txt-hide">해당상품은 품절입니다.</em>');
        // const soldOut = document.createElement('em');
        // soldOut.classList.add('txt-hide');
        // soldOut.textContent = '해당상품은 품절입니다.';
        // targetEl.parentElement.insertBefore(soldOut, targetEl);
      }
    } else if (remainMoney < priceItem){
      alert ('잔액이 부족합니다. 돈을 입금해주세요~!!')
    }
  })
});

// 획득 버튼 클릭하면 카트로 구매 내역 이동한다.
btnGet.addEventListener('click', (event) => {
  let got = false;
  let totalPrice = 0;

  for (const itemStacked of cart.querySelectorAll('li')) {
    for (const itemGot of getListItem.querySelectorAll('li')) {
      let gotCount = itemGot.querySelector('.list_num');
      if (itemStacked.dataset.item === itemGot.dataset.item) {
        gotCount.textContent = Math.floor(gotCount.textContent) + Math.floor(itemStacked.querySelector('.list_num').textContent);
        got = true;
        break;
      }
    }
    if (!got) {
      getListItem.appendChild(itemStacked);
    }
  }
  cart.innerHTML = null;

  // 총 금액
  getListItem.querySelectorAll('li').forEach((itemGot) => {
    totalPrice += itemGot.dataset.price * (Math.floor(itemGot.querySelector('.list_num').textContent));
  })
  totalMoney.textContent = `총금액 : ${totalPrice.toLocaleString()} 원`
})
