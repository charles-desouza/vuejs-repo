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
                <p>Shipping: {{shipping}}</p>
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

            </div>

            <div style="width:100%">
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul>
              <li v-for="review in reviews">
              <p>{{ review.name }}</p>
              <p>Rating: {{ review.rating }}</p>
              <p>{{ review.review }}</p>
              </li>
            </ul>
           </div>

            <product-review @review-submitted="addReview"></product-review>
        </div>
    `,
    props:{
       premium: {
        type: Boolean,
        required: true
         }
       },
    data(){
        return {
            product : 'Socks',
            brand: 'Vue Mastery',
            selectedVariant: 0,
            onSale: true,
            details: ["80% cotton","20% polyster","gender neutral"],
            reviews : [],
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
            this.$emit('add-to-cart',this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index){
            this.selectedVariant = index;
        },
        addReview(productReview) {
            this.reviews.push(productReview)
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
        },
        shipping() {
            if(this.premium){
                return "Free";
            }else{
                return "$ 2.99";
            }
        }
    }
});

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>

    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review"></textarea>
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
        
    <p>
      <input type="submit" value="Submit">  
    </p>    
  
  </form>
    `,
    data() {
      return {
        name: null,
        review: null,
        rating: null,
        errors: []
      }
    },
    methods:{
        onSubmit() {
            this.errors = [];

            if(this.name && this.review && this.rating) {
                let productReview = {
                  name: this.name,
                  review: this.review,
                  rating: this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
              } else {
                if(this.name === null || this.name.match(/^ *$/) !== null) this.errors.push("Name required.")
                if(this.review === null || this.review.match(/^ *$/) !== null) this.errors.push("Review required.")
                if(!this.rating ) this.errors.push("Rating required.")
              }
          }
    }
  })

var app = new Vue({
    el: '#app', 
    data: {
        premium : true,
        cart: []
    },
    methods:{
        updateCart(id){
            this.cart.push(id);
        }
    }  
 });