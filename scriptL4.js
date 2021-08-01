'use strict';

const API_URL = 'https://raw.githubusercontent.com/sokoloverov/js-/online-store-api';

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

        if (this.title === 'Ожидаем...') {
            return `<div class="goods_box">
                        <figure>
                            <img class="goods_box__img" src="${this.picture}" alt="Товар">
                            <figcaption class="goods_box_upper_font">${this.title}</figcaption>
                            <figcaption class="goods_box_lower_font">${this.price} ментальных усилий</figcaption>
                        </figure>
                    </div>`
        } else {
            return `<div class="goods_box">
                        <figure>
                            <img class="goods_box__img" src="${this.picture}" alt="Товар">
                            <figcaption class="goods_box_upper_font">${this.title}</figcaption>
                            <figcaption class="goods_box_lower_font">${this.price} ментальных усилий</figcaption>
                        </figure>
                        <div class="goods_cart" id="${this.id}">
                            <div class="goods_cart_a">
                                <img src="img/luzifers_korb.png" alt="Корзина" class="goods_cart_right">
                                <p class="goods_cart_text">В список желаний</p>
                            </div>
                            <div class="goods_cart__btnBox">
                                <button type="button" class="goods_cart__btn" id="${this.id}+">Добавить</button>
                                <p class="goods_cart__quantity">0</p>
                                <button type="button" class="goods_cart__btn" id="${this.id}-">Убрать</button>
                            </div>
                        </div>
                    </div>`;
        }
    }
}

class ProductsList {
    constructor(container = '.goods-list') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this.fetchGoods();
    }

    makeGETRequest(url) {
        return new Promise((resolve, reject) => {
            let xhr;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status >= 200 && this.status <= 225) {
                    resolve(this.responseText);
                }
            };
            xhr.onerror = function () {
                reject(new Error("Network Error"));
            };

            xhr.open('GET', url, true);
            xhr.send();
        });
    }

    //массив со списком товаров
    fetchGoods() {
        return new Promise((resolve, reject) => {
            this.makeGETRequest(`${API_URL}/catalogData.json`)
                .then((item) => {
                    this.goods = JSON.parse(item);
                    resolve(this.goods);
                })
                .catch(() => {
                    reject('Ошибка');
                });
        });
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

    //расчет суммы всех товаров, не учитывается количество каждого, если бы их клали в корзину
    calculatePrice() {
        return this.goods.reduce((sum, { price }) => sum + price, 0);
    }
}

/**
 * В объекте элемента корзины собранны все данные по товару
 */
class CartElement extends ProductUnit {
    constructor(product, quantity, availability, discount) {
        super(product);
        this.quantity = quantity;
        this.availability = availability;
        this.discount = discount;
    }
    //расчет цены с учетом скидки
    currentPrice() {
        this.price *= 1 - this.discount;
    }
}

/**
 * В объект корзина загружается все товары корзины, расчитываетя общая цена, общее количество позиций, проверка наличия товара
 */
class Cart {
    constructor(cartElement) {
        this.cartElement = {};
        this.goodsCart = [];
    }
    // метод добавления товара в корзину
    addToCart(element) {
        if (element.include(this.goodsCart)) {
            return nameOfClassCartElement.quantity++;
        } else {
            this.goodsCart.push(element);
        }
    }
    // метод удаления товара из корзины
    removeFromCart(element) {
        if (this.goodsCart(element) > 1) {
            return nameOfClassCartElement.quantity--;
        } else {
            this.goodsCart.splice(indexOfelement, 1);
        }
    }
    // метод получения списка товаров в корзине
    getListGoodsItems() {
        let listGoodsItems = [];
        for (let emptyVariable of this.goodsCart) {
            listGoodsItems.push = this.goodsCart[emptyVariable];
            return listGoodsItems;
        }

    }
    // метод расчета суммарной стоимости товаров в корзине
    summaryCost() {
        let cost = null;
        this.goodsCat.forEach(good => {
            cost += good.price * good.quantity;
        });
    }
    // метод расчета общего количества товаров в корзине
    summaryQuantity() {
        let quantity = null;
        this.goodsCat.forEach(good => {
            quantity += good.quantity;
        });
    }
    // метод проверки наличия всех товаров для продажи
    checkAvailability() {
        this.goodsCat.forEach(good => {
            if (good.availability == 0) {
                console.log("Внимание, " + good.title + " нет в наличии.");
            }
        });
    }
}

let grandList = new ProductsList();
grandList.fetchGoods()
    .then(() => {
        grandList.getHTMLmarkupAllProducts();
    })
    .catch(() => {
        console.log("Error");
    });