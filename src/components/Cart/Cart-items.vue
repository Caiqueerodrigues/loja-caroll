<template>
    <div>
        <div
            class="offcanvas offcanvas-end"
            data-bs-scroll="true"
            data-bs-backdrop="false"
            tabindex="-1"
            id="offcanvasScrolling"
            aria-labelledby="offcanvasScrollingLabel"
        >
            <div
                class="offcanvas-header"
            >
                <h5
                    class="offcanvas-title mx-auto"
                    id="offcanvasScrollingLabel"
                >
                    {{logado ? 'Seu Carrinho: ' : 'Faça login para ver seu Carrinho'}}
                </h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                >
            </button>
            </div>
            <div
                class="offcanvas-body"
            >
                <div 
                    v-if="logado && cartItemsQuantity > 0"
                    class="row justify-content-center legend"
                >
                    <div 
                        class="col-3"
                    >
                        <span>
                            Quantidade
                        </span>
                    </div>
                    <div 
                        class="col-6"
                    >
                        <span>
                            Produto
                        </span>
                    </div>
                    <div 
                        class="col-3"
                    >
                        <span>
                            Preço
                        </span>
                    </div>
                </div>
                <div
                    v-for="(item, index) in CartUser"
                        :item = 'item'
                        :key = 'index'
                >
                    <div 
                        class="row align-items-center mx-0 pe-3 LineCart"
                        v-if="item.quantidade > 0"
                    >
                        <div
                            class="col-4 itemCart"
                            v-if="item.quantidade > 0"
                        >
                            <i
                                class="bi bi-cart-plus-fill me-2 plus"
                                @click="deleteItem(item,'soma')"
                            ></i>
                            <input
                                type="number"
                                :value="item.quantidade"
                            >
                            <i
                                class="bi bi-cart-dash-fill ms-1 dash"
                                @click="deleteItem(item,'subt')"
                            ></i>
                            <span
                                v-if="item.quantidade > 1"
                            >
                                UN's
                            </span>
                            <span
                                v-else
                            >
                                UN
                            </span>
                        </div>
                        <div
                            class="col-5 itemCart"
                            v-if="item.quantidade > 0"
                        >
                            {{ item.title.length > limitTitle ? item.title.slice(0, limitTitle) + '...' : item.title }}
                        </div>
                        <div
                            class="col-2 itemCart text-center"
                            v-if="item.quantidade > 0"
                        >
                            R$ {{ item.price }}
                        </div>
                        <div
                            v-if="item.quantidade > 0"
                            class="col-1"
                        >
                            <i
                                class="bi bi-trash-fill trash"
                                @click="deleteItem(item, 'delete')"
                            ></i>
                        </div>
                    </div>
                </div>
                <div 
                    class="col text-danger fs-1 carrinhoVazio"
                    v-if="cartItemsQuantity === 0 && logado"
                >
                    Seu Carrinho está Vazio
                </div>
                <div 
                    class="row align-items-center position-absolute bottom-0 pb-3"
                    id="rowTotal"
                    v-if="logado"
                >
                    <div 
                        class="col-6"
                    >
                        <button 
                            type="button" 
                            class="btn btn-success"
                        >
                            Finalizar Carrinho
                        </button>
                    </div>
                    <div 
                        class="col-6 text-end pe-4"
                    >
                        <span>
                            Total: R$ {{ totalCart }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Cart-items',
    props: ['produtos', 'userData', 'logado','cartAdc','cartItemsQuantity'],
    data() {
        return {
            limitTitle: 40,
            itemsQuantity: 0,
            CartUser: null,
            api: 'https://fakestoreapi.com/carts/user/',
            idUser: null,
            totalCart: null,
        }
    },
    methods: {
        async getCart () {
            let objetoUnificado =[]
            //pegar produtos do carrinho de acordo com id do user
            if(this.userData) {
                await fetch(`${this.api}${this.idUser}`)
                    .then(res=>res.json())
                    .then(json=> this.CartUser = json)
            }
                this.CartUser.forEach(item => { 
                    item.products.forEach(produto => {
                        this.itemsQuantity += produto.quantity
                        //juntar varios carrinhos em um só
                        objetoUnificado.unshift({
                            id: produto.productId,
                            quantidade: produto.quantity
                        })
                    })
                })
            // }
            this.CartUser = objetoUnificado
            this.$emit('itemsQuantity', this.itemsQuantity)
            this.$emit('cartUser', this.CartUser)
            this.calcTotal()
            this.emitQuantity('itemsQuantity', this.itemsQuantity)
        },
        async getProductId() {
            let objetosCombinados = {}
            await this.CartUser.forEach(item => {
                this.produtos.forEach(produto => {
                    if(produto.id === item.id) {
                        item.title = produto.title,
                        item.price = produto.price
                    }
                })
                //juntar os ID de produtos em um só
                const {id, ...outrasPropriedades} = item
                if(objetosCombinados[id]) {
                    objetosCombinados[id].quantidade += outrasPropriedades.quantidade
                } else {
                    objetosCombinados[id] = {id, ...outrasPropriedades}
                }
            })
            // ordenar as key do objetosCombinados
            const chavesOrdenadas = Object.keys(objetosCombinados).sort((a, b) => parseInt(a) - parseInt(b))
            let i = 0
            let NewCartUser =[]
            chavesOrdenadas.forEach(chave => {
                NewCartUser[i] = objetosCombinados[chave]
                i++
            })
            this.CartUser = NewCartUser
        },
        deleteItem(item, op) {
            this.CartUser.forEach(element => {
                if(element.id === item.id) {
                    if(op === 'delete' || element.quantidade === 0) {
                        this.totalCart -= element.price
                        this.CartUser.splice(item, 1)
                        this.calcTotal()
                        this.emitQuantity('deleteQuantity', element.quantidade)
                    }
                    if(op === 'soma') {
                        element.quantidade ++
                        this.itemsQuantity ++
                        this.calcTotal()
                        this.emitQuantity('somaQuantity', 1)
                    }
                    if(op === 'subt') {
                        if(element.quantidade > 0) {
                            element.quantidade --
                            this.itemsQuantity --
                            this.calcTotal()
                            this.emitQuantity('deleteQuantity', 1)
                        }
                    }
                }
            })
            this.itemsQuantity = 0
            // console.log(this.itemsQuantity + 'itemsQuantity')
            // this.calcTotal()
        },
        calcTotal() {
            this.totalCart = 0
            this.CartUser.forEach(item => {
                this.produtos.forEach(produto => {
                    if(item.id === produto.id) {
                        this.totalCart += item.quantidade * produto.price
                        this.totalCart = parseFloat(this.totalCart.toFixed(2))
                    }
                })
            })
            //chamar funcao para salvar carrinho
            return this.calcTotal
        },
        emitQuantity(nome, dados) {
            this.$emit(`${nome}`, dados)
        }
    },
    watch: {
        itemsQuantity: {
            handler(newValue) {
                if(newValue) {
                    this.getProductId()
                }
            },
            immediate: true,
        },
        logado: {
            handler(newValue) {
                if(newValue) {
                    this.idUser = this.userData.userId
                    this.getCart()
                }
                if(newValue === false) {
                    this.CartUser = null
                    this.itemsQuantity = 0
                }
            }
        },
        cartAdc: {
            handler(newValue) {
                if(newValue !== this.CartUser) {
                    this.CartUser = this.cartAdc
                    this.totalCart = 0
                    this.CartUser.forEach(item => {
                        this.totalCart += (item.price * item.quantidade)
                    })
                }
            }
        }
    },
    beforeMount() {
        if(this.logado) {
            this.getCart()
        }
    }
}
</script>
<style scoped>
.legend {
    margin: -10px 0;
    color: red;
    font-weight: bolder;
}
.LineCart {
    border: 1px dashed #000;
    margin: 10px;
    border-radius: 10px;
    font-weight: bolder;
    font-size: .9rem;
}
.plus, .dash, .trash {
    font-size: 1.5em;
    cursor: pointer;
}
.plus {
    color: rgb(6, 183, 6);
}
.dash {
    color: rgb(221, 229, 3);
}
.trash {
    color: rgb(204, 2, 2);
}
input {
    max-width: 30px;
    text-align: center;
    border-radius: 10px;
    background-color: #0000002d;
    font-weight: bold;
}
input[type="number"]::-webkit-inner-spin-button,
input[type=input"number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -webkit-appearance: none;
    -webkit-appearance: none;
    margin: 0;
}
#rowTotal {
    width: 100%;
}
.carrinhoVazio {
    margin-top: 50%;
}
</style>