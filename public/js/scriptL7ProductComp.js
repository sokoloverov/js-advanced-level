Vue.component('products', {
    data() {
        return {
            catalogUrl: '',
            goods: [], //products:[] у учителя
            localDataGoods: [],//отображение товаров на витрине
        }
    },
    methods: {
        renderSearchPhrase() { //вывод списка товаров через фильтр содержания title
            let regexp = new RegExp(this.$root.$refs.searchline.searchPhrase, 'i');
            this.localDataGoods = this.goods.filter(good => regexp.test(good.title));
        },
    },
    mounted() {
        this.$parent.getJSON('/api/products') //запрос удаленных данных с сервера
            .then(data => {
                for (let el of data) {
                    this.goods.push(el);
                    this.localDataGoods.push(el);
                }
            });
    },

    template: `
            <div class="goods-list good_box_big" v-show="$root.showProduct">
                <product v-for="item in localDataGoods" :key="item.id"
                :product="item"
                ></product>
            </div>
            `
});
Vue.component('product', {
    props: ['product'],
    template: `
            <div class="goods_box">
                <figure>
                    <img class="goods_box__img" :src="product.picture" alt="Товар">
                    <figcaption class="goods_box_upper_font">{{product.title}}</figcaption>
                    <figcaption class="goods_box_lower_font">{{product.price}} ментальных усилий
                    </figcaption>
                </figure>
                <div v-show="!product.price == 0" class="goods_cart" id="product.id">
                    <div class="goods_cart_a">
                        <img src="img/luzifers_korb.png" alt="Корзина" class="goods_cart_right">
                        <p class="goods_cart_text tracking-in-expand-fwd">В список желаний</p>
                    </div>
                    <div class="goods_cart__btnBox">
                        <button type="button" class="goods_cart__btn fade-in" id="product.id+"
                            @click="$root.$refs.cart.addToCart(product)">Добавить</button>
                        <p class="goods_cart__quantity fade-in" v-show="$root.$refs.cart.countShow(product)">{{$root.$refs.cart.countShow(product)}}</p>
                        <button type="button" class="goods_cart__btn fade-in" id="product.id-"
                            @click="$root.$refs.cart.removeFromCart(product)" v-show="$root.$refs.cart.countShow(product)">Убрать</button>
                    </div>
                </div>
            </div>
            `
});


//v-show="$root.$refs.cart.countShow(product)"
//$root.$refs.cart.count[product.id]