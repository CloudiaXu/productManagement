export default {
    template: `            
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="delProductModalTitle">刪除產品</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                是否刪除
                <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="delProduct">確認刪除</button>
            </div>
        </div>
    </div>`,
    data() { return {}; },
    props: ['tempProduct', 'api'],
    methods: {
        delProduct() {
            const url = `${this.api.path}/${this.api.uuid}/admin/ec/product/${this.tempProduct.id}`;
            axios.defaults.headers.common.Authorization = `Bearer ${this.api.token}`;

            axios.delete(url).then(() => {
                $('#delProductModal').modal('hide');
                this.$emit('update');
            })
        }
    }


};