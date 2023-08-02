<template>
    <div 
        class="container-fluid darkBg blur"
    >
        <div 
            class="row"
        >
            <div 
                class="col-12"
            >
                <HeaderNav
                    :cartItemsQuantity="cartItemsQuantity"
                    :produto="produto"
                    :logado = "logado"
                />
            </div>
            <!--Nome categoria-->
            <div 
                class="col-12 justify-content-around nav"
                v-if="produto"
            >
                <button
                    type="button"
                    v-for="(item, index) in category" 
                        :key="index"
                        :item="item"
                    :class="{
                        'btn btn-outline-success mx-2': btnHouverID !== index,
                        'btn btnHover mx-2': btnHouverID === index
                    }"
                    @click="categorizar(item), btnHouverID = index"
                    
                >
                    {{ item }}
                </button>
            </div>
            <!--erro na pi-->
            <div 
                id="body"
                class="row align-items-center"
                v-if="!produto"
            >
                <div 
                    class="col"
                >
                    <h1
                        class="text-danger"
                    >
                        Erro na API
                    </h1>
                </div>
            </div>
        </div>
        <div 
            class="row"
        >
            <div 
                class="col-12"
            >
                <div 
                    class="row"
                    id="cards"
                >
                    <Card-Product
                        v-for="(item,index) in produto"
                            :key="index"
                            :item = item
                        :id="index"
                        :logado="logado"
                        :cartItemsQuantity="cartItemsQuantity"
                        :cartUser="logado ? cartUser : false"
                        @adcCart="cartAdc = $event"
                        @updateQuantityItems="cartItemsQuantity += $event"
                        :isLastRow="index >= produto.length - quantityCardsLine ? true : false"
                    />
                </div>
            </div>
            <div 
                class="col-2"
            >
                <div
                    class="row"
                >
                    <CartItems
                        :produtos="produto"
                        @itemsQuantity="this.cartItemsQuantity = $event"
                        @itemsQuantity2="this.cartItemsQuantity = $event"
                        @deleteQuantity="this.cartItemsQuantity -= $event"
                        @somaQuantity="this.cartItemsQuantity += $event"
                        @cartUser="cartUser = $event"
                        :userData="logado ? userData : false"
                        :logado = "logado"
                        :cartAdc="cartAdc"
                        :cartItemsQuantity="cartItemsQuantity"
                    />
                </div>
            </div>
        </div>
        <div 
            class="row"
        >
            <Login 
                @userData="userData = $event"
                @login= "logado = $event"
                @logout = "logado = false"
            />
        </div>
        <!--footer-->
        <div 
            class="row align-items-center justify-content-around footer"
            id="footer"
        >
            <div class="divider"></div>
            <!--caique-->
            <div 
                class="col-3 text-center"
            >
                <p> 
                    <span
                        class="nome"
                    >
                        &copy; Caíque Rodrigues
                    </span>
                </p>
                <p>
                    <span>
                        <a
                            href="https://www.linkedin.com/in/caique-rodrigues-a113ab249/"
                            target="_blank"
                        >
                            <i
                                class="bi bi-linkedin"
                            ></i>
                        </a>
                    </span>
                    <span>
                        <a
                            href="https://github.com/Caiqueerodrigues"
                            target="_blank"
                        >
                            <i
                                class="bi bi-github"
                            ></i>
                        </a>
                    </span>
                    <span>
                        <a 
                            href=" https://api.whatsapp.com/send?phone=5518997152961"
                            target="_blank"
                        >
                            <i class="bi bi-whatsapp"></i>
                        </a>
                    </span>
                </p>
            </div>
            <!--data-->
            <div 
                class="col-2"
            >
                <p
                    class="nome"
                >
                    By 2023
                </p>
            </div>
            <!--projeto-->
            <div 
                class="col-2"
            >   
                <p class="mb-2">
                    <a
                        href="https://github.com/RACaroll/E-commerce"
                        target="_blank"
                    >
                        <i class="bi bi-github projeto"></i>
                    </a>
                </p>
                <p
                    class="nome"
                >
                    Github do projeto
                </p>
            </div>
            <!--data-->
            <div 
                class="col-2"
            >
                <p
                    class="nome"
                >
                    By 2023
                </p>
            </div>
            <!--caroll-->
            <div 
                class="col-3 text-center"
            >
                <p>
                    <span
                        class="nome"
                    >
                        &copy; Kaielly Rodrigues
                    </span>
                </p>
                <p>
                    <span>
                        <a
                            href=""
                            target="_blank"
                        >
                            <i
                                class="bi bi-linkedin"
                            ></i>
                        </a>
                    </span>
                    <span>
                        <a
                            href="https://github.com/RACaroll"
                            target="_blank"
                        >
                            <i
                                class="bi bi-github"
                            ></i>
                        </a>
                    </span>
                    <span>
                        <a 
                            href=" https://api.whatsapp.com/send?phone=5518996540419"
                            target="_blank"
                        >
                            <i class="bi bi-whatsapp"></i>
                        </a>
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import CardProduct from './components/Card/CardProduct.vue'
import CartItems from './components/Cart/Cart-items.vue'
import HeaderNav from './components/Header/Header-nav.vue'
export default {
    components: { HeaderNav, CardProduct, CartItems },
    name: 'Home',
    data () {
        return {
            produto: null,
            category: null,
            title: "TODOS OS PRODUTOS",
            userData: null,
            logado: false,
            cartUser: null,
            cartAdc: null,
            cartItemsQuantity:0,
            CartUser: null,
            apiCategory: 'https://fakestoreapi.com/products/category/',
            btnHouverID: 2,
            widthScreen: window.screen.width,
            quantityCardsLine: 4,
        }
    },
    
    methods: { 
        async product(){
            await fetch('https://fakestoreapi.com/products')
                .then(res=>res.json())
                .then(json=> this.produto = json)
            this.produto.forEach(item => {
                item.show = true
            });

            //categorias
            await fetch('https://fakestoreapi.com/products/categories')
                .then(res=>res.json())
                .then(json=> this.category = json)
            this.category.splice(2, 0, 'TODOS OS PRODUTOS')
        },
        async categorizar(item) {
            if(item !== 'TODOS OS PRODUTOS') {
                await fetch(`${this.apiCategory}${item}`)
                    .then(res=>res.json())
                    .then(json=> this.produto = json)
                    this.produto.forEach(item => {
                        item.show = true
                    });
            } else {
                this.product()
                this.btnHouverID = 2
            }
            
        },
    },
    watch: {
        logado: {
            handler(newValue)  {
                if (newValue) {
                    this.logado = newValue
                }
            },
            immediate: true
        }
    },
    beforeMount() {
        this.product()
        if(this.widthScreen > 1079) {
            this.quantityCardsLine = 4
        }
        if(this.widthScreen <= 815) {
            this.quantityCardsLine = 2
        }
        if(this.widthScreen <= 551) {
            this.quantityCardsLine = 1
        }
    },
}
</script>

<style scoped>
#body {
    height: 69vh;
}
#cards {
    max-width: 1300px;
    margin: 10px auto;
}
.nav {
    animation: softColors 10s linear infinite;
    height: 50px;
    align-items: flex-end;
}
.nav > button {
    max-height: 80%;
    border: 0px;
    color: #000233;
    text-transform: capitalize;
}
.btn-outline-success:hover {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-color: #111111;
    background: linear-gradient(to right, #111111c4, #3b3432c4, #111111c4);
    color: #ffffff;
}

.btnHover  {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-color: #111111;
    background: linear-gradient(to right, #111111, #3b3432, #111111);
    color: #fff !important;
    font-weight: bolder;
}
/* olhar aqui */
.darkBg {
    background: linear-gradient(to right, #111111, #3b3432, #111111);
    min-height: 100vh;
}
.footer {
    padding-top: 10px;
    height: 80px;
    line-height: 3px;
}
.divider{
    width: 100%;
    border-top: solid 3px;
    border-image: linear-gradient(to right, #f8a676, #f8e785, #9dec70, #8beef5, #8486fa, #a97bf1, #f17beb) 30;
    margin-bottom: 8px;
    
}

.projeto {
    font-size: 2rem;
    animation: softText 10s linear infinite;
}
p > span {
    margin-left: 10px;
    animation: softText 10s linear infinite;
}
.nome {
    font-weight: bolder;
    animation: softText 10s linear infinite;
}
.bi-github {
    color: #8486fa;
}
.bi-whatsapp {
    color: #9dec70;
}

.bi-linkedin {
    color: #8beef5;
}
a > i {
    font-size: 1.2rem;
}

@keyframes softColors {
    0% {background-color: #f7bbbb}
    15% {background-color: #f8a676}
    30% {background-color: #f8e785}
    45% {background-color: #9dec70}
    60% {background-color: #8beef5}
    75% {background-color: #8486fa}
    90% {background-color: #a97bf1}
    100% {background-color: #f17beb}
}

@keyframes softText {
    0% {color: #f7bbbb}
    15% {color: #f8a676}
    30% {color: #f8e785}
    45% {color: #9dec70}
    60% {color: #8beef5}
    75% {color: #8486fa}
    90% {color: #a97bf1}
    100% {color: #f17beb}
}

</style>
