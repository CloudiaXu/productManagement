export default {
    template: ` <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">新增產品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-sm-4">
                    <form>
                        <div class="form-group">
                            <label for="imageUrl">輸入圖片網址</label>
                            <input type="text" class="form-control" id="imageUrl"
                                v-model="tempProduct.imageUrl[0]" placeholder="請輸入圖片連結">

                        </div>
                    </form>
                    <img class="img-fluid" :src="tempProduct.imageUrl" alt>
                </div>
                <div class="col-sm-8">
                    <form>
                        <div class="form-group">
                            <label for="title">標題</label>
                            <input type="text" class="form-control" id="title" v-model="tempProduct.title"
                                placeholder="請輸入標題">
                        </div>
                    </form>
                    <div class="row">
                        <div class="col-sm-6">
                            <form>
                                <div class="form-group">
                                    <label for="category">分類</label>
                                    <input type="text" class="form-control" id="category"
                                        v-model="tempProduct.category" placeholder="請輸入分類">
                                </div>
                            </form>
                        </div>
                        <div class="col-sm-6">
                            <form>
                                <div class="form-group">
                                    <label for="unit">單位</label>
                                    <input type="unit" class="form-control" id="unit"
                                        v-model="tempProduct.unit" placeholder="請輸入單位">
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <form>
                                <div class="form-group">
                                    <label for="origin_price">原價</label>
                                    <input type="number" class=" form-control" id="origin_price"
                                        v-model="tempProduct.origin_price" placeholder="請輸入原價">
                                </div>
                            </form>
                        </div>
                        <div class="col-sm-6">
                            <form>
                                <div class="form-group">
                                    <label for="price">售價</label>
                                    <input type="number" class="form-control" id="price"
                                        v-model="tempProduct.price" placeholder="請輸入售價">
                                </div>
                            </form>
                        </div>
                    </div>
                    <form>
                        <div class="form-group">
                            <label for="description">產品描述</label>
                            <textarea class="form-control" id="description" rows="3" type="text"
                                v-model="tempProduct.description" placeholder="請輸入產品描述"></textarea>
                        </div>
                    </form>
                    <form>
                        <div class="form-group">
                            <label for="content">說明內容</label>
                            <textarea class="form-control" id="content" rows="3" type="text"
                                v-model="tempProduct.content" placeholder="請輸入說明內容"></textarea>
                        </div>
                    </form>
                    <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input" id="is_enabled"
                            v-model="tempProduct.is_enabled" :true-value="1" :false-value="0">
                        <label class="form-check-label" for="is_enabled">是否啟用</label>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
        </div>
    </div>
</div>`,
    //定義資料結構
    data() {
        return {
            // tempProduct: {},
        };
    },
    props: ['tempProduct', 'api'],
    methods: {
        updateProduct() {
            //內層只製作資料更新
            let url = `${this.api.path}/${this.api.uuid}/admin/ec/product/${this.tempProduct.id}`;
            axios.patch(url, this.tempProduct)
                .then(res => {
                    //觸發外層事件
                    this.$emit('update');
                })
        }
    },
};