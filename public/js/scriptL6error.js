Vue.component('thisiserror', {
    data() {
        return {
        }
    },
    template: `
            <div v-show="$root.attention">
                <hr>    
                <h2 class="goods-search searchLine">У всех желанье стать богаче,<br>
                На всех дверях замок висячий,<br>
                Но пусто в нашем сундуке.<br>
                Видать, и сервер на замке...
                </h2>
            </div>
            `
});

