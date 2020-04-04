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
            variantColor: "green"
        },
        {
            variantId : 2235,
            variantColor: "blue"
        }]
    }
});