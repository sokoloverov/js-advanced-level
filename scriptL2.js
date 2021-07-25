'use strict';

class ProductUnit {
    constructor(product) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.picture = product.picture;
    }
    /**
         * Формирует одну карточку товара для витрины 
         * @param {название товара} this.title 
         * @param {цена} this.price 
         * @param {изображение} this.picture
         * @returns возвращает HTML разметку карточки
         */
    getHTMLmarkupProductUnit() {

        if (this.title === undefined) this.title = 'Ожидаем...';
        if (this.picture === undefined) this.picture = 'waiting.png';

        return `<div class="goods_box">
        <a href="#">
            <figure>
                <img class="goods_box__img" src="img/${this.picture}" alt="Товар">
                <figcaption class="goods_box_upper_font">${this.title}</figcaption>
                <figcaption class="goods_box_lower_font">${this.price} ментальных усилий</figcaption>
            </figure>
        </a>
        <div class="goods_cart">
            <a href="#" class="goods_cart_a">
                <img src="img/luzifers_korb.png" alt="Корзина" class="goods_cart_right">
                <p class="goods_cart_text">В список желаний</p>
            </a>
        </div>
    </div>`;
    }
}

class ProductsList {
    constructor(container = '.goods-list') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this.fetchGoods();
        this.getHTMLmarkupAllProducts();
    }
    //массив со списком товаров
    fetchGoods() {
        this.goods = [
            { id: 1, title: 'Счастье', price: 150, picture: 'happiness.jpg' },
            { id: 2, title: 'Любовь', price: 450, picture: 'love.jpg' },
            { id: 3, title: 'Мудрость', price: 550, picture: 'iq.jpeg' },
            { id: 4, title: 'Вера', price: 350, picture: 'belivable.jpg' },
            { id: 5, title: 'Надежда', price: 50, picture: 'hope.png' },
            { id: 6, title: 'Знание js', price: 900, picture: 'js.jpg' },
            { id: 7, title: 'Дружба', price: 250, picture: 'frendship.jpg' },
            { id: undefined, title: undefined, price: 0, picture: undefined }, //проверка работы параметров функции по умолчанию + недостаток параметров
        ];
    }

    /**
     * Формирует витрину товаров из карточек товаров через HTML разметку всех карточек на витрине, объединяет массив для ликвидации ','
     * @param {элемент массива} list 
     */
    getHTMLmarkupAllProducts() {
        //const block = document.querySelector(this.container); - лишняя ячейка помяти под константу
        for (let product of this.goods) {
            let productObject = new ProductUnit(product);
            this.allProducts.push(productObject);
            document.querySelector(this.container).insertAdjacentHTML('beforeend', productObject.getHTMLmarkupProductUnit());
        }
    }
    //расчет суммы всех товаров НЕ ПРАВИЛЬНЫЙ, т.к. не учитывается количество каждого, если бы их клали в корзину
    calculatePrice() {
        let price = null;
        this.goods.forEach(element => {
            price += element.price;
        });
        console.log(price);
        return price;


    }
}

let grandList = new ProductsList();
grandList.calculatePrice();