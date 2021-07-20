'use strict';

//массив со списком товаров
const goods = [
    { title: 'Счастье', price: 150, picture: 'happiness.jpg' },
    { title: 'Любовь', price: 450, picture: 'love.jpg' },
    { title: 'Мудрость', price: 550, picture: 'iq.jpeg' },
    { title: 'Вера', price: 350, picture: 'belivable.jpg' },
    { title: 'Надежда', price: 50, picture: 'hope.png' },
    { title: 'Знание js', price: 900, picture: 'js.jpg' },
    { title: 'Дружба', price: 250, picture: 'frendship.jpg' },
    { title: undefined, price: undefined }, //проверка работы параметров функции по умолчанию + недостаток параметров
];

/**
 * Формирует одну карточку товара для витрины 
 * @param {название товара} title 
 * @param {цена} price 
 * @param {изображение} picture
 * @returns возвращает HTML разметку карточки
 */
const renderGoodsItem = (title = 'Ожидаем...', price = 0, picture = 'waiting.png') =>
    `<div class="goods_box">
        <a href="#">
            <figure>
                <img class="goods_box__img" src="img/${picture}" alt="Товар">
                <figcaption class="goods_box_upper_font">${title}</figcaption>
                <figcaption class="goods_box_lower_font">${price} ментальных усилий</figcaption>
            </figure>
        </a>
        <div class="goods_cart">
            <a href="#" class="goods_cart_a">
                <img src="img/luzifers_korb.png" alt="Корзина" class="goods_cart_right">
                <p class="goods_cart_text">В список желаний</p>
            </a>
        </div>
    </div>`;

/**
 * Формирует витрину товаров из карточек товаров через HTML разметку всех карточек на витрине, объединяет массив для ликвидации ','
 * @param {элемент массива} list 
 */
const renderGoodsList = list => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.picture)).join('');
    document.querySelector('.goods-list').innerHTML = goodsList;
}

renderGoodsList(goods);