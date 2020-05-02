Vue.component('product',{
    template: `
    <div class="product">

            <div class="product-image">
                <img v-bind:src="image">
            </div>

            <div class="product-info">
                <h1>{{title}} </h1>
                <p v-if="inStock">In Stock</p>
                <p v-else>out of stock</p>
                <!-- <p v-if="inventory > 10">In Stock</p>
                <p v-else-if="inventory <= 10 && inventory > 0">Almost out of stock</p>
                <p v-else>out of stock</p> -->
                <span v-show="onSale">On Sale   </span>
                <ul>
                    <li v-for="detail in details">{{detail}}</li>
                </ul>

                <div v-for="variant,index in variants" :key="variant.variantId"
                    class="color-box" :style="{backgroundColor :variant.variantColor}"
                    v-on:mouseover="updateProduct(index)">
                </div>

                <button @click="addToCart()" :disabled="!inStock" :class="{disabledButton : !inStock}">Add to Cart</button>

                <div class="cart">
                    <p >Cart {{cart}}</p>
                </div>
            </div>

        </div>
    `,
    props:[],
    data(){
        return {
            product : 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            onSale: true,
            details: ["80% cotton","20% polyster","gender neutral"],
            variants : [{
                variantId : 2234,
                variantColor: 'green',
                variantImage : './assets/vmSocks-green-onWhite.jpg',
                variantQuantity: 10,
            },
            {
                variantId : 2235,
                variantColor: 'blue',
                variantImage : './assets/vmSocks-blue-onWhite.jpg',
                variantQuantity: 0,
            }],
            cart: 0
        }
    },
    methods: {
        addToCart: function(){
            this.cart = this.cart  + 1;
        },
        updateProduct(index){
            this.selectedVariant = index;
        }
    },
    computed:{
        title(){
            return this.brand + ' ' + this.product;
        },
        image(){
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        }
    }
});


var app = new Vue({
    el: '#app',   
    });