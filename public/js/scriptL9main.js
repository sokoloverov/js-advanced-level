const APP = new Vue({
    el: '#app',
    components: {
        cart,
        products,
        error,
        search,
        description
    },
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
        async postJson(url, data) {
            try {
                const result = await fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
                return await result.json();
            } catch (error) {
                this.attention = true;
            }
        },
        async putJson(url, data) {
            try {
                const result = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
                return await result.json();
            } catch (error) {
                this.attention = true;
            }
        },
        async deleteJson(url, data) {
            try {
                const result = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
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
