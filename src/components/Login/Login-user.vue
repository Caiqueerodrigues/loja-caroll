<template>
    <div 
        class="modal fade" 
        id="staticBackdrop" 
        data-bs-backdrop="static" 
        data-bs-keyboard="false" 
        tabindex="-1" 
        aria-labelledby="staticBackdropLabel" 
        aria-hidden="true"
    >
    <div 
        class="modal-dialog modal-dialog-scrollable modal-dialog-centered"
        id="custom-modal-dialog"
    >
        <div 
            class="modal-content"
        >
            <div 
                class="row modal-header align-items-center"
            >
                <div 
                    class="col-2"
                >
                    <button
                        type="button"
                        v-if="logado"
                        id="door"
                        @click="logOut()"
                    >
                        <i
                            class="bi bi-door-open-fill door"
                        ></i>
                        <p>
                            Sair
                        </p>
                    </button>
                </div>
                <div 
                    class="col-8 mb-3" 
                    v-if="login || recovery || registrar || logado"
                >
                    <h1
                        class="modal-title fs-5"
                        v-if="login"
                    >
                        Login
                    </h1>
                    <h1
                        v-else-if="recovery"
                        class="modal-title fs-5 pointer"
                    >
                        Recuperar Senha
                    </h1>
                    <h1
                        class="modal-title fs-5 pointer"
                        v-else-if="registrar"
                    >
                        Cadastre-se
                    </h1>
                    <h1
                        class="modal-title fs-5 pointer"
                        v-if="logado"
                    >
                        {{`Olá, ${userData.name.firstname.charAt(0).toUpperCase() + userData.name.firstname.slice(1)} ${userData.name.lastname.charAt(0).toUpperCase() + userData.name.lastname.slice(1)}`}}
                    </h1>
                </div>
                <div 
                    class="col-2 mb-4"
                >
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        @click="!logado, logado ? telaInicial = false : telaInicial = false"
                    ></button>
                </div>
                <div 
                    class="row"
                    v-if="logado && !telaInicial"
                >
                    <div 
                        class="col"
                    >
                        <p>
                            <b>
                                Seus Dados
                            </b>
                        </p>
                    </div>
                </div>
            </div>
            <div 
                class="modal-body"
            >
                <div 
                    class="row my-4"
                >
                    <div 
                        class="col-10 mx-auto"
                    >
                        <div 
                            class="col"
                        >
                            <h1
                                v-if="telaInicial"
                                class="fs-3 text-success"
                            >
                                Logado com Sucesso
                            </h1>
                        </div>
                        <div 
                            class="input-group"
                            v-if="login || recup"
                        >
                            <span 
                                class="input-group-text" 
                                id="basic-addon1"
                            >
                                @
                            </span>
                            <input 
                                id="userEmail"
                                type="email" 
                                class="form-control" 
                                :placeholder="login ? 'Usuário' : 'Seu Email'" 
                                :aria-label="login ? 'Usuário' : 'Seu Email'" 
                                aria-describedby="basic-addon1"
                                v-model="user"
                            >
                        </div>
                        <span 
                            class="errorInput"
                            v-if="inputError"
                        >
                            {{ error.user }}
                        </span>
                        <span
                            class="text-success"
                            v-if="showSendMail"
                        >
                            {{ sendMail }}
                        </span>
                    </div>
                </div>
                <div 
                    class="row"
                >
                    <div 
                        class="col-10 mx-auto"
                    >
                        <div 
                            class="input-group mb-3"
                            v-if="login"
                        >
                            <input 
                                :type="showPassword ? 'text' : 'password'" 
                                class="form-control" 
                                placeholder="Senha" 
                                aria-label="Senha" 
                                aria-describedby="button-addon2"
                                v-model="password"
                                v-if="login"
                            >
                            <button 
                                class="btn btn-outline-secondary" 
                                type="button" 
                                id="button-addon2"
                                @click="showPassword = !showPassword"
                            >
                                <i 
                                    :class=" showPassword? 'bi bi-eye-slash-fill pointer' : 'bi bi-eye-fill pointer'"
                                ></i>
                            </button>
                        </div>
                        <span
                            class="errorInput"
                            v-if="login"
                        >
                            {{ error.password }}
                        </span>
                    </div>
                </div>
                <div 
                    class="row"
                >
                    <div 
                        class="col mt-2 text-center"
                        v-if="login"
                        >
                        <p 
                            class="link mb-0 pointer"
                            @click="recovery = !recovery, login = !login, recup = !recup"
                        >
                            Esqueci minha Senha
                        </p>
                    </div>
                    <div 
                        class="col mt-2 text-center"
                    >
                        <p 
                            class="link mb-0 pointer"
                            v-if="login"
                            @click="register(), login = !login, registrar = !registrar"
                        >
                            Cadastre-se
                        </p>
                        <p
                            v-if="!showSendMail && recovery || !showSendMail && registrar"
                            class="icon mb-0 pointer"
                            @click="clear()"
                        >
                            <i 
                                class="bi bi-arrow-left-circle-fill"
                            >
                                <br>
                                <span
                                    class="fs-6"
                                >
                                    Voltar
                                </span>
                            </i>
                        </p>
                    </div>
                    <div 
                        class="col mt-2 text-center"
                        v-if="login"
                        @click="randomUser()"
                    >
                        <p 
                            class="link mb-0 pointer"
                        >
                            Usuário Aleatório
                        </p>
                    </div>
                </div>
                <div 
                    class="row"
                    v-if="logado && !telaInicial"
                >
                    <p>
                        <span 
                            class="legend"
                        >
                            Email:
                        </span> 
                        {{ user }}
                    </p>
                    <p>
                        <span 
                            class="legend"
                        >
                            Senha:
                        </span> 
                            {{ showPassword ? password : '********' }}
                        <i 
                            :class="!showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'"
                            @click="showPassword = !showPassword"
                        ></i>
                    </p>
                    <p>
                        <span 
                            class="legend"
                        >
                            Usuário:
                        </span>
                        {{ userData.username }}
                    </p>
                    <p>
                        <span 
                            class="legend"
                        >
                            Nome Completo:
                        </span>
                        {{ `${userData.name.firstname} ${userData.name.lastname}` }}
                    </p>
                    <p
                        class="address"
                    >
                        <span 
                            class="legend d-block"
                        >
                            Endereço:
                        </span>
                        <span
                            class="legend"
                        >
                            Rua: 
                        </span>
                        {{ userData.address.street }}
                        <span
                            class="legend"
                        >
                            N°
                        </span>
                        {{ userData.address.number }}
                        <br>
                        <span
                            class="legend"
                        >
                            Cidade: 
                        </span>
                        {{ userData.address.city }}
                        <br>
                        <span
                            class="legend"
                        >
                            Cep: 
                        </span>
                        {{ userData.address.zipcode }}
                    </p>
                    <p>
                        <span 
                            class="legend"
                        >
                            Contato:
                        </span>
                        {{ userData.phone }}
                    </p>
                </div>
            </div>
            <!--Moldal Footer-->
            <div 
                class="row mb-2"
            >
                <div 
                    class="col"
                >
                    <button 
                        type="button" 
                        class="btn btn-success"
                        v-if="recovery"
                        @click="error.user === '' ? textPInput() : verificador()"
                    >
                        Recuperar
                    </button>
                    <button 
                        type="button" 
                        class="btn btn-success"
                        v-if="login"
                        @click="logar()"
                    >
                        Logar
                    </button>
                    <button 
                        type="button" 
                        class="btn btn-success"
                        v-if="registrar"
                    >
                        Cadastrar-se
                    </button>
                </div>
            </div>
            <div 
                class="row mb-2"
            >
                <div 
                    class="col"
                >
                    <button 
                        type="button" 
                        class="btn btn-danger" 
                        data-bs-dismiss="modal"
                        @click="clear()"
                        v-if="!logado"
                    >
                        {{ showSendMail ? 'Fechar' : 'Cancelar' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    name:'Login-user',
    data() {
        return {
            user:'',
            password: '',
            error: {
                user:'',
                password:'',
            },
            login: true,
            showPassword: false,
            registrar: false,
            recovery: false,
            recup: false,
            inputError: false, //para seguir com login
            showSendMail: false,
            sendMail: 'Email com nova senha Enviado!',
            idUser: null,
            userData:null,
            telaInicial: false,
            dadosEnviar: null,
            logado: false,
        }
    }, 
    methods: {
        verificador(value) {
            if(value === 'email') {
                let at = this.user.indexOf('@')
                let com = this.user.indexOf('.com')
                if(at === -1 || com === -1 || this.user === '') {
                    this.error.user = 'Email inválido'
                    this.inputError = true
                } else {
                    this.error.user = ''
                    this.inputError = false
                }
            }
            if(value === 'password') {
                if(this.password.length < 6 || this.password === '') {
                    this.error.password = 'Senha muito curta'
                    this.inputError = true
                } else {
                    this.error.password = ''
                    this.inputError = false
                }
            }
            return true
        },
        textPInput() {
            if(this.user === '') {
                this.verificador()
            } else {
                this.showSendMail = !this.showSendMail
                this.recovery = !this.recovery
                this.recup = !this.recup
            }
        },
        clear() {
            this.user = '',
            this.password =  '',
            this.error =  {
                user:'',
                password:'',
            },
            this.login =  true,
            this.registrar = false,
            this.showPassword =  false,
            this.recovery =  false,
            this.recup= false,
            this.inputError =  false, 
            this.showSendMail =  false
        },
        async logar() {
            if(!this.error.user && !this.error.password) {
                // await fetch('https://fakestoreapi.com/auth/login',{
                //     method:'POST',
                //     body:JSON.stringify({
                //         username: this.userData.username,
                //         password: this.password
                //     })
                // })
                //     .then(res=>res.json())
                //     .then(json=>console.log(json))
                this.login = !this.login
                this.logado = !this.logado
                this.telaInicial = !this.telaInicial
                
                this.$emit('userData', this.dadosEnviar)
                this.$emit('login', true)
                    }
                //API parece estar com erro nesta parte
        },
        logOut() {
            this.logado = !this.logado
            this.userData = ''
            this.clear()
            this.$emit('logout', false)
        },
        async randomUser() {
            let ids =   [1,2,3,4,8]
            let identificador = Math.floor(Math.random() * ids.length)
            this.idUser = ids[identificador]
            await fetch(`https://fakestoreapi.com/users/${this.idUser}`)
                .then(res=>res.json())
                .then(json=> this.userData = json)

            this.user = this.userData.email
            this.password = this.userData.password
            this.dadosEnviar = {
                userId: this.userData.id,
                name: `${this.userData.name.firstname} ${this.userData.name.lastname}`,
                username: this.userData.username,
                phone: this.userData.phone,
                email: this.userData.email,
                address: {
                    street: this.userData.address.street,
                    number: this.userData.address.number,
                    city: this.userData.address.city,
                    cep: this.userData.address.zipcode
                }
            }
        },
        register() {
            
        },
    },
    watch: {
        user: {
            handler(newValue) {
                if(newValue) {
                    this.verificador('email')
                }
            }
        },
        password: {
            handler(newValue) {
                if(newValue) {
                    this.verificador('password')
                }
            }
        }
    }
}
</script>
<style scoped>
#custom-modal-dialog {
    max-width: 400px;
}
.modal-header {
    max-height: 80px;
}
.door {
    font-size: 1.5rem;
    color: rgb(159, 0, 0);
}

#door > p {
    color: rgb(159, 0, 0);
    margin-top: -5px;
}
#door {
    border: none;
    background-color: transparent;
}
.legend {
    font-weight: bold;
    color: rgb(1, 11, 148);
}
.address {
    border: 1px double rgb(1, 11, 148);
    max-width: fit-content;
    margin: 5px auto;
    padding: 10px;
}
.icon {
    font-size: 2rem;
}
.link {
    color: rgb(0, 58, 232);
    text-decoration: underline;
}
.pointer {
    cursor: pointer;
}
.errorInput {
    color:#f00;
}
.form-control-error {
    border-color: #f00;
    box-shadow: 0 0 0.25rem #f00;
}
</style>