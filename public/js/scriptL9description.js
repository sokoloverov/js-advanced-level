const description = {
    data() {
        return {
            description: '', //описание товара
            picture: '',
            title: ''
        }
    },
    methods: {
        showDes(value) {
            this.description = value.description;
            this.picture = value.picture;
            this.title = value.title;
        }
    },
    template: `
            <div class="showWindow searchLine" v-if="description && !$root.attention">
                <div class="itemCartContainer">
                    <img class="itemCartContainer__img" :src="picture" alt="Товар">
                    <p class="showWindow__title">{{title}}</p>
                </div>
                <p class="showWindow__text">{{description}}</p>
                <p @click="description=''"><i class="fas fa-times-circle"></i></p>
            </div>
            `
};
