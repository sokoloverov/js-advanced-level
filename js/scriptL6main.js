const API_URL = 'https://raw.githubusercontent.com/sokoloverov/js-/online-store-api';

const APP = new Vue({
    el: '#app',
    data: {
        showProduct: true, //переключатель показа (витрина + строка поиска) vs корзина
        quantityGoodsInCart: 0, //количество единиц каждого товара в корзине отображается над корзиной
        attention: false,//индикатор ошибки получення данных сервера
    },
    methods: {
        async getJSON(url) { //преобразование в массив товаров
            try {
                const result = await fetch(url);
                this.attention = false;
                return await result.json();
            } catch (error) {
                this.attention = true;
            }
        },
        showCheckout() {//показать витрину или корзину
            this.showProduct = this.showProduct ? false : true;
        },
    }
});


