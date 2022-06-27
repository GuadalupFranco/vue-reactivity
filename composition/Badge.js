app.component("badge", {
    template: /* vue-html */ `
    <span class="badge new" v-if="product.new">New</span>
    <span class="badge offer" v-if="product.offer">Offer</span>
    <span class="badge used" v-if="product.used">Used</span>
    `,

    props: ["product"],
});