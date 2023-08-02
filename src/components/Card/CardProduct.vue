<template>
    <div
        class="col my-2"
        v-if="item.show"
    >
        <div 
            class="localCard"
            style="width: 15rem;"
        >
            <div
                class="card card1"
                style="width: 15rem;"
                :id="id"
            >
                <div
                    id="photo"
                >
                    <img
                        :src="item.image"
                        class="card-img-top mx-auto"
                    >
                </div>
                <div
                    class="card-body p-0"
                >
                    <h5
                        class="card-title"
            
                    >
                        {{item.title.length > limitTitle ? item.title.slice(0, limitTitle) + '...' : item.title }}
                    </h5>
                    <p
                        class="card-text"
                        v-if="showDetails"
                    >
                        <b>
                            Descrição:
                        </b>
                        {{ item.description }}
                    </p>
                </div>
                <ul
                    class="list-group list-group-flush blur"
                >
                    <li
                        class="list-group-item"
                    >
                        <b>
                            Avaliação:
                        </b>
                        <i
                            v-for="(icon, index) in stars"
                                :key="index"
                                :class="icon"
                        ></i>
                    </li>
                    <li
                        class="list-group-item"
                    >
                        <b>
                            Total de vendas:
                        </b>
                        {{ item.rating.count }}
                    </li>
                    <li
                        class="list-group-item"
                    >
                        <b>
                            Preço:
                        </b>
                        R$ {{ item.price }}
                    </li>
                </ul>
                <div
                    class="card-body"
                >
                    <div
                        class="row"
                    >
                        <div
                            class="col-12"
                        >
                            <button
                                type="button"
                                class="sale"
                                @click="saleQuantity++"
                            >
                                <i
                                    class="bi bi-plus-circle-fill"
                                ></i>
                            </button>
                            <input
                                type="number"
                                id="quantityItem"
                                :value="saleQuantity"
                            >
                            <button
                                type="button"
                                class="sale"
                                @click="saleQuantity > 0 ? saleQuantity-- : saleQuantity = 0"
                            >
                                <i
                                    class="bi bi-dash-circle-fill"
                                ></i>
                            </button>
                        </div>
                    </div>
                    <button
                        type="button"
                        class="btn btn-outline-success mb-2"
                        :data-bs-toggle="!logado ? 'modal' : false"
                        :data-bs-target="!logado ? '#staticBackdrop' : false"
                        @click="logado ? addCart(item) : false"
                    >
                        Adicionar ao Carrinho
                    </button>
                    <br>
                    <button
                        type="button"
                        class="btn btn-outline-primary"
                        @click="showDetails = !showDetails, details()"
                    >
                        {{ btnDetail }}Detalhes
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Card-Product',
    props: ['item','logado','cartItemsQuantity', 'cartUser', 'isLastRow'],
    data() {
        return {
            showDetails: false,
            btnDetail: "+ ",
            rating:  this.item.rating.rate,
            stars: ["bi bi-star","bi bi-star","bi bi-star","bi bi-star","bi bi-star"],
            limitTitle: 20,
            id: this.item.id,
            saleQuantity: 0,
            itemsQuantity: null,
        }
    },
    methods: {
        details () {
            let btn = document.querySelector('.card1:hover')
            let card = document.getElementById(`${this.id}`)
            if(!this.isLastRow) {
                if(btn.style.position =='absolute') {
                    btn.style.position='relative'
                    btn.style.zIndex='1'
                    this.btnDetail = "+ "
                    card.style.maxHeight = '525px'
                } else {
                    btn.style.position='absolute'
                    btn.style.zIndex='2'
                    this.btnDetail = "- "
                    card.style.maxHeight = 'max-content'
                }
            }
        },
        async ChangeStars() {
            //transfor em numero inteiro para pintar as completas
            let ratingInt = Math.floor(this.rating)
            const newStars = new Array(ratingInt).fill('bi bi-star-fill')
            this.stars.splice(0, this.rating, ...newStars)

            const decimalPart = this.rating % 1
            if(decimalPart >= 0.5) { 
                let indice = this.stars.indexOf('bi bi-star')
                this.stars.splice(indice, 1, 'bi bi-star-half')
            }
        },
        addCart(product) {
            let productAdd = null
            let pesquisa = null
            if(this.saleQuantity > 0) {
                pesquisa = this.cartUser.findIndex(item => product.title === item.title)
                if(pesquisa === -1) {
                    productAdd={
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        quantidade: this.saleQuantity
                    }
                    this.cartUser.push(productAdd)
                } else {
                    this.cartUser[pesquisa].quantidade += this.saleQuantity
                }
                pesquisa = null
                this.$emit('adcCart', this.cartUser)
                this.$emit('updateQuantityItems', this.saleQuantity)
                this.saleQuantity = 0
                productAdd = {}
            }
        }
    },
    created() {
        this.ChangeStars()
    },
}
</script>
<style scoped>
    #photo {
        margin: auto;
        width: 80px;
        height: 120px;
    }
    img {
        width: 100%;
        height: 100%;
    }
    ul, li {
        background-color: inherit;
    }
    .blur {
        backdrop-filter: blur(3px);
        background-color: #ffffff28;
        border-radius: 10px;
    }
    .localCard {
        background-color: transparent;
    }
    .card1 {
        padding: 20px;
        z-index: 1;
        margin: 5px;
        max-height: max-content;
        min-height: 525px;
        animation: softColors linear 20s infinite;
        color: #000233;
        background: radial-gradient(circle at center,  #f7bbbb, #fccaad, #faeda2, #bdeea1, #aeedf1, #afb0f8, #c8a8fc);
    }
    .card1:hover {
        transform: scale(1.05);
        transition: .7s;
        background: radial-gradient(circle at center,  #f7bbbb, #f8a676, #f8e785, #9dec70, #8beef5, #8486fa, #a97bf1);
    }

    .btn {
        color: #000233;
        border: #000233 solid 1px;
    }

    .btn:hover {
        color: #ffffff;
        border: #000233 solid 1px;
        background-color: #000233;
    }

    li > i {
        color: #00cad1;
        filter: drop-shadow(0 0 1px #000);
    }
    .sale{
        background-color: transparent;
        margin: 10px;
        border: none;
        box-shadow: none;
        color: green;
    }
    #quantityItem {
        width: 50px;
        border-radius: 10px;
        text-align: center;
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type=input"number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        -webkit-appearance: none;
        -webkit-appearance: none;
        margin: 0;
    }
</style>
