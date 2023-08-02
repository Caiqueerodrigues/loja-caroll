<template>
    <div 
        id="background"
        class="row align-items-center justify-content-between colors"
    >
        <div 
            class="col-3 text-danger blur logo"
        >
            <div
                class="logoImg"
            >
            </div>
            <div
                class="logoName"
            >
                <h1>
                    Andrô
                </h1>
                <h1
                    class="bottomLine"
                >
                    meda
                </h1>
            </div>
        </div>
            <div 
                class="col-7 text-danger"
            >
            <div 
                class="searchBox blur"
            >
                <input 
                    class="searchInput" 
                    type="text" 
                    name="Searc" 
                    placeholder="Procurar"
                    v-model="pesquisa"
                    @input="search()"
                    @blur="adjustInputWidth()"
                    ref="searchInputRef"
                >
                <button 
                    class="searchButton"
                >
                    <i 
                        class="material-icons"
                    >
                        <i 
                            class="bi bi-search text-danger"
                        >
                        </i>
                    </i>
                </button>
            </div>
        </div>
        <div 
            class="col-2 "
        >
            <div 
                class="row"
            >
                <div
                    class="col-5 blur"
                >
                    <button
                        type="button"
                        class="bi bi-person-circle btnHeader"
                        data-bs-toggle="modal" 
                        data-bs-target="#staticBackdrop"
                    >
                    </button>
                    </div>
                
                <div
                    class="col-5 blur ms-2"
                >
                    <button
                        type="button"
                        class="bi bi-basket-fill position-relative btnHeader"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasScrolling"
                        aria-controls="offcanvasScrolling"
                    >
                        <span
                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        >
                            {{ logado ? cartItemsQuantity : 0 }}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Header-nav',
        props:['cartItemsQuantity','produto', 'logado'],
        data() {
            return {
                pesquisa: '',
            }
        },
        methods: {
            search() {
                const input = document.querySelector('.searchInput')
                if(this.pesquisa !== '') {
                    this.produto.forEach(item => {
                        let itemNome = item.title
                        let nomeMinusc = itemNome.toLowerCase().trim()
                        let textInput = this.pesquisa.toLowerCase().trim()
                        if(!nomeMinusc.includes(textInput)) {
                            item.show = false
                        } else {
                            item.show = true
                        }
                    });
                    input.style.width = '360px'
                } else {
                    this.produto.forEach(item => {
                        item.show = true
                    })
                    this.pesquisa = ''
                }
            },
            adjustInputWidth() {
                const input = this.$refs.searchInputRef;
                if (this.pesquisa === "") {
                    input.style.width = "0";
                }
            }
        },
        // watch:  {
        //     cartItemsQuantity: {
        //         handler(nv) {
        //             if(nv) {
        //             console.log(this.cartItemsQuantity)
        //             }
        //         }
        //     }
        // }
    }
</script>

<style scoped>
a {
    text-decoration: none;
}
.logo {
    width: 24vw;
    height: 15vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 15px
}
.logoImg {
    height: 80%;
    width: 30%;
    background-image: url(./teste.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.logoName {
    height: 80%;
    width: 69%;
}

h1 {
    font-family: 'Lugrasimo', cursive;
    font-weight: bolder;
    font-size: 33pt;
    color: red;
}

.bottomLine {
    margin-top: -25px;;
}
.searchBox {
    position: absolute;
    top: 30%;
    left: 50%;
    transform:  translate(-30%,30%);
    height: 60px;
    border-radius: 40px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

}
.searchBox:hover > .searchInput {
    width: 340px;
    padding: 0 6px;
    color: white;
}
.searchBox:hover > .searchButton {
    color : white;
}

.searchButton {
    color: white;
    float: right;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #1c1b18;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.4s;
    border: 3px solid red;
}

.searchInput {
    border:none;
    background: none;
    outline:none;
    float:left;
    padding: 0;
    color: white;
    font-weight: bolder;
    font-size: 16px;
    transition: 0.4s;
    line-height: 40px;
    width: 0px;
}
.btnHeader {
    color: red;
    font-size: 2.7rem;
    background-color: transparent;
    border: none;
    margin-top: 1%;
    
}
button span {
    font-size: 1rem;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
}



.blur {
    background-color: #111111da;
}

.col-5 {
    border-radius: 50%;
    backdrop-filter: blur(1px);
}

@media screen and (max-width: 620px) {
    .searchBox:hover > .searchInput {
        width: 150px;
        padding: 0 6px;
    }   
}
</style>