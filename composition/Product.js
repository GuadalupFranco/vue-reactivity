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
        <p class="description__price" :style="{ color: price_color }">$ {{ new Intl.NumberFormat("es-MX").format(product.price) }}</p>
        <p class="description__content"> </p>
        <div class="discount">
          <span>Cuppon</span>
          <input type="text" placeholder="Enter your code" @keyup.enter="applyDiscount($event)">
        </div>
        <button :disabled="product.stock == 0" @click="sendToCart()">Add to cart</button>
    </section>
    `,

    props: ["product"],

    emits: ["sendtocart"],

    setup(props, context) {
        const productState = reactive({
            activeImage: 0,
            price_color: "rgb(104, 104, 209)"
        });

        const discountCodes = ref(["VUE20", "FRNCO"]);
        function applyDiscount(event) {
            const discountCodeIndex = discountCodes.value.indexOf(event.target.value);
            if (discountCodeIndex >= 0) {
                props.product.price *= 0.5;
                discountCodes.value.splice(discountCodeIndex, 1);
            }
        }

        function sendToCart() {
            context.emit("sendtocart", props.product);
        }

        watch(() => productState.activeImage, (val, oldValue) => {
            console.log(val, oldValue)
        })

        watch(() => props.product.stock, (stock) => {
            if (stock <= 1) {
                productState.price_color = "rgb(188 30 67)";
            }
        })

        return {
            ...toRefs(productState),
            applyDiscount,
            sendToCart
        };
    }
})