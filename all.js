import pagination from './pagination.js';
import createOrEditModal from './createOrEditModal.js';
import delProductModal from './delProductModal.js';
//全域變數
Vue.component('pagination', pagination);
Vue.component('create-or-edit-modal', createOrEditModal);
Vue.component('del-product-modal', delProductModal);
new Vue({
    //渲染vue的部分
    el: '#app',
    data: {
        api: {
            uuid: 'f2e83e10-62c2-4f74-a3a9-bf3701db9404',
            path: 'https://course-ec-api.hexschool.io/api',
            token: '',
        },
        token: '',
        isNew: '',
        pagination: {},
        tempProduct: {
            imageUrl: []
        },
        products: [
            {
                id: 1586934917210,
                unit: '台',
                category: '掌上主機',
                title: 'Switch',
                origin_price: 20000,
                price: 9980,
                description: '想玩就玩',
                content: '動森太好玩惹',
                is_enabled: 1,
                imageUrl: 'https://images.unsplash.com/photo-1592107761705-30a1bbc641e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
            },
            {
                id: 1196934917910,
                unit: '台',
                category: '主機',
                title: 'PS5 Wifi',
                origin_price: 29999,
                description: '次世代超強規格',
                content: '我也想要換一台 PS5 Wifi',
                price: 9487,
                is_enabled: 0,
                imageUrl: 'https://images.unsplash.com/photo-1592107761705-30a1bbc641e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
            },
        ],

    },
    methods: {
        //給予num初始值1
        getProducts(num = 1) {
            const url = `${this.api.path}/${this.api.uuid}/admin/ec/products?page=${num}`;
            axios.get(url)
                .then((res) => {
                    console.table(res.data);
                    this.products = res.data.data;
                    this.pagination = res.data.meta.pagination;
                    //由外層關閉modal(tempProduct不是空的時候觸發)
                    if (this.tempProduct.id) {
                        this.tempProduct = {
                            imageUrl: [],//若取不到會出錯
                        };
                        $('#productModal').modal('hide');
                    }
                });
        },
        updateProduct() {
            //透過判斷是否存在id修改或新增資料
            if (this.tempProduct.id) {
                const id = this.tempProduct.id;
                this.products.forEach((item, i) => {
                    if (item.id === id) {
                        this.products[i] = this.tempProduct;
                    }
                })
            }
            else {
                const time = new Date().getTime();
                this.tempProduct.id = time;
                this.products.push(this.tempProduct);
            }

            this.tempProduct = {};
            $('#productModal').modal('hide');
        },
        delProduct() {
            if (this.tempProduct.id) {
                const id = this.tempProduct.id;
                this.products.forEach((item, i) => {
                    if (item.id === id) {
                        this.products.splice(i, 1);
                        this.tempProduct = {}
                    }
                })
            }
            $('#delProductModal').modal('hide');
        },

        openModal(isNew, item) {
            switch (isNew) {
                case 'new':
                    this.tempProduct = { imageUrl: [] };
                    $('#productModal').modal('show');
                    break;
                case 'edit':
                    const url = `${this.api.path}/${this.api.uuid}/admin/ec/product/${item.id}`;
                    axios.get(url)
                        .then(res => {
                            this.tempProduct = res.data.data;
                            $('#productModal').modal('show');
                        })
                    break;
                case 'delete':
                    this.tempProduct = Object.assign({}, item);
                    $('#delProductModal').modal('show');
                    break;
                default:
                    break;
            }
        }

    },
    created() {
        this.api.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.api.token}`;
        this.getProducts();
    }

});
