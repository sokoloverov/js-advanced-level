Vue.component('cart', {
    data() {
        return {
            layInCart: [],//отображение и массив товаров в корзине
            quantityInCart: 0, //показывает количество всех СКЮ в корзине
        }
    },
    methods: {
        addToCart(item) { //положить в корзину
            let find = this.layInCart.find(el => el.id === item.id);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id}`, { quantity: 1 });
                find.quantity++;
            } else {
                let prod = Object.assign({ quantity: 1 }, item);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.layInCart.push(prod);
                            this.$root.quantityGoodsInCart = this.layInCart.length;
                        }
                    });
            }
        },
        removeFromCart(item) {
            let find = this.layInCart.find(el => el.id === item.id);
            if (find.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id}`, { quantity: -1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity--;
                        }
                    });
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id}`)
                    .then(data => {
                        if (data.result === 1) {
                            //console.log('index = ', this.layInCart.indexOf(find), 'item id = ', item.id);
                            this.layInCart.splice(this.layInCart.indexOf(find), 1);
                            this.$root.quantityGoodsInCart = this.layInCart.length;
                        }
                    });
            }
        },
        countShow(item) {//позволяет видеть на витрине изменения количества товара в корзине
            let find = this.layInCart.find(el => el.id === item.id);
            if (find) {
                return find.quantity;
            } else {
                return 0;
            }
        }
    },
    mounted() {
        this.$parent.getJSON('/api/cart')
            .then(data => {
                for (let el of data) {
                    this.layInCart.push(el);
                    this.$root.quantityGoodsInCart = this.layInCart.length;
                }
            });
    },
    template: `
            <div v-show="!$root.showProduct">
                <p class="searchLine">Тут в шутку все, а вы всерьез.
                    Так вам и дали счастья воз!
                </p>
                <p class="header_cart_font_big" v-if="$root.quantityGoodsInCart == 0">в кладовой ваших желаний пока нет...</p>
                <div class="itemCartContainer">
                    <cart-item v-for="item in layInCart"
                    :key="item.id"
                    :cartitem="item">
                    </cart-item>
                </div>
            </div>
            `
});

Vue.component('cart-item', {
    props: ['cartitem'],
    template: `
            <div class="good_box_big itemCartContainer_border">
                <img class="itemCartContainer__img" :src="cartitem.picture" alt="Товар">
                <div class="goods_box_upper_font center">{{cartitem.title}}
                </div>
                <div class="goods_box_lower_font center">{{cartitem.price}}
                </div>
                <div class="goods_box_lower_font center">{{cartitem.quantity}}
                </div>
                <div class="goods_box_lower_font center">{{cartitem.quantity * cartitem.price}}
                </div>
            </div>
            `
});


