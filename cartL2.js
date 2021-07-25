'use strict';

/**
 * В объекте элемента корзины собранны все данные по товару
 */
class CartElement extends GoodsItem {
    constructor(title, price, picture, quantity, availability, discount) {
        super(title, price, picture);
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
 * методы показаны условно, в рамках постановки учебной задачи...
 */
class Cart {
    constructor() {
        this.goodsCart = [];
    }
    addToCart(element) {
        if (element.include(this.goodsCart)) {
            return nameOfClassCartElement.quantity++;
        } else {
            this.goodsCart.push(element);
        }
    }
    removeFromCart(element) {
        if (this.goodsCart(element) > 1) {
            return nameOfClassCartElement.quantity--;
        } else {
            this.goodsCart.splice(indexOfelement, 1);
        }
    }
    summaryCost() {
        let cost = null;
        this.goodsCat.forEach(good => {
            cost += good.price * good.quantity;
        });
    }
    summaryQuantity() {
        let quantity = null;
        this.goodsCat.forEach(good => {
            quantity += good.quantity;
        });
    }
    checkAvailability() {
        this.goodsCat.forEach(good => {
            if (good.availability == 0) {
                console.log("Упс, " + good.title + " нет в наличии:(");
            }
        });
    }
}