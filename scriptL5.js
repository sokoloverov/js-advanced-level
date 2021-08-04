'use strict';

const API_URL = 'https://raw.githubusercontent.com/sokoloverov/js-/online-store-api';

const APP = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        goods: [], //products:[] у учителя
        localDataGoods: [],
        layInCart: [],
        quantityInCart: 0,
        goodsInCart: [],//количество товаров из списка в корзине, не единиц каждого!
        alreadyInCart: false,
        showProduct: true,
        searchPhrase: '', //вводимая строка поиска
        quantityGoodsInCart: 0, //количество единиц каждого товара в корзине
    },
    created() {
        this.getJSON(`${API_URL + this.catalogUrl}`) //запрос удаленных данных с сервера
            .then(data => {
                this.goods = data;
                this.localDataGoods = this.goods;
            });
    },
    methods: {
        getJSON(url) { //преобразование в массив товаров
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        renderSearchPhrase() { //вывод списка товаров через фильтр содержания title
            if (this.searchPhrase === "") {
                this.localDataGoods = this.goods;
            } else {
                let regexp = new RegExp(this.searchPhrase, 'i');
                this.localDataGoods = this.goods.filter(good => regexp.test(good.title));
            }
        },
        renderCartList() { //отрисовка списка товаров корзины
            this.goodsInCart = this.goods.filter(i => this.layInCart.includes(i.id));
        },
        addToCart(item) { //положить в корзину, пока фигня получилась...
            console.log("в корзину", item.id)
            if (this.layInCart.includes(item.id)) {
                console.log("товар уже в корзине");
                for (let i of Object.values(this.layInCart)) {
                    console.log(i, Object.values(this.layInCart), 'and', item.id);
                    if (Object.values(this.layInCart) == item.id) {
                        this.quantityInCart++;
                        console.log(item.id, this.quantityInCart);
                    }
                }
            }
            else {
                this.layInCart.push(item.id);
                this.quantityGoodsInCart = this.layInCart.length;
            }
        },
        showCheckout() {//показать витрину или корзину
            this.showProduct = this.showProduct ? false : true;
            this.renderCartList();
        },
    },
    computed: {

    }
})


