Vue.component('searchline', {
    data() {
        return {
            searchPhrase: '', //вводимая строка поиска
        }
    },
    template: `
            <div class="searchLine" v-show="$root.showProduct && !$root.attention">
                <p>Кто ищет, тот всегда найдет:</p>
                <input type="text" class="goods-search"
                v-model="searchPhrase" @keyup="$root.$refs.products.renderSearchPhrase(searchPhrase)"
                placeholder="просто пишите...">
            </div>
            `
});

