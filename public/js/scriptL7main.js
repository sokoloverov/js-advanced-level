const APP = new Vue({
    el: '#app',
    data: {
        showProduct: true, //переключатель показа (витрина + строка поиска) vs корзина
        quantityGoodsInCart: 0, //количество единиц каждого товара в корзине отображается над корзиной
        attention: false,//индикатор ошибки получення данных сервера
    },
    methods: {
        async getJSON(url) {
            try {
                const result = await fetch(url);
                return await result.json();
            } catch (error) {
                this.attention = true;
            }
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(() => {
                    this.attention = true;
                });
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    this.attention = true;
                });
        },
        deleteJson(url, data) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    this.attention = true;
                });
        },
        showCheckout() {//показать витрину или корзину
            this.showProduct = this.showProduct ? false : true;
        }
    }
});


