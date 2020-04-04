var app = new Vue({
    el: '#app',
    data : {
        product : 'Socks',
        image: './assets/vmSocks-green-onWhite.jpg',
        inStock: true,
        //inventory: 50,
        onSale: true,
        details: ["80% cotton","20% polyster","gender neutral"],
        variants : [{
            variantId : 2234,
            variantColor: 'green',
            variantImage : './assets/vmSocks-green-onWhite.jpg'
        },
        {
            variantId : 2235,
            variantColor: 'blue',
            variantImage : './assets/vmSocks-blue-onWhite.jpg'
        }],
        cart: 0
    },
    methods: {
        addToCart: function(){
            this.cart = this.cart  + 1;
        },
        updateProduct(variantImage){
            this.image = variantImage;
        }
    }
});