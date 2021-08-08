Vue.component('cart', {
    data() {
        return {
            layInCart: [],//отображение и массив товаров в корзине
            count: { quantity: 0 }, //показывает количество каждого СКЮ в корзине
            quantityInCart: 0, //показывает количество всех СКЮ в корзине
        }
    },
    methods: {
        addToCart(item) { //положить в корзину
            let find = this.layInCart.find(el => el.id === item.id);
            if (find) {
                find.quantity++;
                this.count[item.id] = find.quantity; //счетчик на витрине конкретного товара
            } else {
                let prod = Object.assign({ quantity: 1 }, item);
                this.layInCart.push(prod);
                this.$root.quantityGoodsInCart = this.layInCart.length;
                this.count[item.id] = 1; //счетчик на витрине конкретного товара начальное значение
            }
        },
        removeFromCart(item) {
            let find = this.layInCart.find(el => el.id === item.id);
            if (find.quantity) {
                if (find.quantity > 1) {
                    find.quantity--;
                    this.count[item.id] = find.quantity;
                } else {
                    this.layInCart.splice(this.layInCart.indexOf(find), 1)
                    this.$root.quantityGoodsInCart = this.layInCart.length;
                    this.count[item.id] = 0;
                }
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
    template: `
            <div v-show="!$root.showProduct">
                <p v-if="$root.quantityGoodsInCart == 0">В корзине товаров нет!</p>
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


