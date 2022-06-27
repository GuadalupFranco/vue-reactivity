app.component("product", {
	template: /* vue-html*/`
    <section class="product">
        <div class="product__thumbnails">
            <div 
                v-for="(image, index) in product.images" 
                :key="image.thumbnail" class="thumb"
                :class="{active: activeImage == index}"
                :style="{backgroundImage : 'url('+ image.thumbnail +')'}" 
                @click="activeImage = index">
            </div>
        </div>
        <div class="product__image">
            <img :src="product.images[activeImage].image" :alt="product.name">
        </div>
    </section>
    <section class="description">
      <h4>{{ product.name.toUpperCase() }} {{ product.stock === 0 ? ":(" : ":)"}}</h4>
        <badge :product="product"></badge>
        <p class="description__status" v-if="product.stock <= 4 && product.stock > 1">There are a few units left</p>
        <p class="description__status" v-else-if="product.stock == 1">Just one unit</p>
        <p class="description__status" v-else-if="product.stock == 0">Not available</p>
        <p class="description__price">$ {{ new Intl.NumberFormat("es-MX").format(product.price) }}</p>
        <p class="description__content"> </p>
        <div class="discount">
          <span>Cuppon</span>
          <input type="text" placeholder="Enter your code" @keyup.enter="applyDiscount($event)">
        </div>
        <button :disabled="product.stock == 0" @click="addToCart">Add to cart</button>
    </section>
    `,
		
	props: ["product"],

	setup(props) {
		const productState = reactive({
			activeImage: 0,
		});

		function addToCart() {
			const prodIndex = cartState.cart.findIndex(prod => prod.name == props.product.name);
			if (prodIndex >= 0) {
				cartState.cart[prodIndex].quantity += 1;
			} else {
				cartState.cart.push(props.product);
			}
			props.product.stock -= 1;
		}

		const discountCodes = ref(["VUE20", "FRNCO"]);
		function applyDiscount(event) {
			const discountCodeIndex = discountCodes.value.indexOf(event.target.value);
			if (discountCodeIndex >= 0) {
				props.product.price *= 0.5;
				discountCodes.value.splice(discountCodeIndex, 1);
			}
		}

		return {
			...toRefs(productState),
			addToCart,
			applyDiscount
		};
	}
})