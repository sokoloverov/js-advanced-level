const cart = {
    data() {
        return {
            layInCart: [],//отображение и массив товаров в корзине
            // quantityInCart: 5, //показывает количество всех СКЮ в корзине
            zzz: false,
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
                            this.layInCart.splice(this.layInCart.indexOf(find), 1);
                            this.$root.quantityGoodsInCart = this.layInCart.length;
                        }
                    });
            }
        },
        removeFromCartTotal(item) {
            let find = this.layInCart.find(el => el.id === item.id);
            this.$parent.deleteJson(`/api/cart/${item.id}`)
                .then(data => {
                    if (data.result === 1) {
                        this.layInCart.splice(this.layInCart.indexOf(find), 1);
                        this.$root.quantityGoodsInCart = this.layInCart.length;
                    }
                });
        },
        countShow(item) {//позволяет видеть на витрине изменения количества товара в корзине
            let find = this.layInCart.find(el => el.id === item.id);
            if (find) {
                return find.quantity;
            } else {
                return 0;
            }
        },
        calcSum() {
            return this.layInCart.reduce((sum, item) => sum += item.price * item.quantity, 0);
            //return this.summ;
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
                <cart-header></cart-header>
                
                <p class="header_cart_font_big" v-if="$root.quantityGoodsInCart == 0">в кладовой ваших желаний пока нет...</p>
                <div class="itemCartContainer">
                    <cart-item v-for="item in layInCart"
                    :key="item.id"
                    :cartitem="item">
                    </cart-item>
                    <cart-buttom :summ="calcSum()"></cart-buttom>
                </div>
                
            </div>
            `
};

Vue.component('cart-item', {
    props: ['cartitem'],
    template: `
        <div class="good_box_big_show itemCartContainer_border">
            <img class="itemCartContainer__img" :src="cartitem.picture" alt="Товар">
            <div class="goods_box_upper_font center itemCartContainer_h2">{{cartitem.title}}
            </div>
            <div class="goods_box_lower_font center itemCartContainer_h2  itemCartContainer_icon" @click="$root.$refs.description.showDes(cartitem)"><i class="fas fa-book-reader"></i>
            </div>
            <div class="goods_box_upper_font center itemCartContainer_h2">{{cartitem.price}}
            </div>
            <div class="goods_box_upper_font center itemCartContainer_h4">{{cartitem.quantity}}
            </div>
            <cart-button :cartbutton="cartitem"></cart-button>
            <div class="goods_box_upper_font center itemCartContainer_h2">{{cartitem.quantity * cartitem.price}}
            </div>
            <div class="goods_box_lower_font center itemCartContainer_h3 itemCartContainer_icon" @click="$root.$refs.cart.removeFromCartTotal(cartitem)"><i class="fas fa-book-dead"></i>
            </div>
        </div>
        `
});

Vue.component('cart-header', {
    template: `
        <div class="good_box_big_show goods_box_header_font" v-if="!$root.quantityGoodsInCart == 0">
            <p class="itemCartContainer_h0"></p>
            <p class="center itemCartContainer_h2">Ваше желание</p>
            <p class="center itemCartContainer_h2">Его описание</p>
            <p class="center itemCartContainer_h2">Стоит оно</p>
            <p class="center itemCartContainer_h2">Вы взяли</p>
            <p class="center itemCartContainer_h2">Всего</p>
            <p class="center itemCartContainer_h3">Ничего</p>
        </div>
        `
});

Vue.component('cart-button', {
    props: ['cartbutton'],
    template: `
        <div class="itemCartContainer_iconQuantity center itemCartContainer_h4 goods_box_lower_font">
            <p class="itemCartContainer_iconSign" @click.prevent="$root.$refs.cart.addToCart(cartbutton)"><i class="fas fa-plus-square"></i></p>
            <p class="itemCartContainer_iconSign" @click="$root.$refs.cart.removeFromCart(cartbutton)" v-show="$root.$refs.cart.countShow(cartbutton)"><i class="fas fa-minus-square"></i></p>
        </div>
        `
});

Vue.component('cart-buttom', {
    props: ['summ'],
    template: `
        <div class="searchLine" v-if="!$root.quantityGoodsInCart == 0">
            <p class="itemCartContainer_h0"></p>
            <p class="center itemCartContainer_h5">Теперь пора с сокровищ снять запоры, усилий будет здесь на...</p>
            <p class="center itemCartContainer_h2">{{summ}}</p>
        </div>
        `
});
