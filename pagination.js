export default {
    template: `
        <nav aria-label="Page navigation">
            <ul class="pagination">
                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item" v-for ="i in pages.total_pages" :key="i" :class="{ active:pages.current_page === i }"><a class="page-link" href="#" @click.prevent="updatePage(i)">{{ i }}</a></li>
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>
        </nav>
    `,
    //把外面的資料傳入
    props: ['pages'],
    methods: {
        updatePage(num) {
            //觸發外面的事件
            this.$emit('update', num);
        },
    }
};