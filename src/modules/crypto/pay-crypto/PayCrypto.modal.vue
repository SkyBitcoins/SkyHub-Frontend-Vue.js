<template>

    <div>

        <ModalComponent modalId="AuthenticationModalComponent"  ref="refModal" :title="modalTitle+' '+this.cryptoCurrency" subTitle="" :buttons="{}" body="" >

            <div v-if="modalType === 'payCrypto'" slot="modal-content">
                <PayCrypto v-show="modalType === 'payCrypto'" ref="refPayCrypto" :fiatValue="fiatValue" :fiatCurrency="fiatCurrency" :cryptoValue="cryptoValue" :cryptoCurrency="cryptoCurrency" :cryptoWallet="cryptoWallet" @onSuccess="payCryptoSuccess" :onSwitch="switchLoginToRegistration" />
            </div>

        </ModalComponent>

    </div>

</template>





<script>

    import ModalComponent from 'client/components/util-components/UI/modals/Modal.component.vue';
    import PayCrypto from 'modules/crypto/pay-crypto/PayCrypto.component.vue';

    export default{
        name:  'PayCryptoModal',

        components: {
            'ModalComponent': ModalComponent,
            'PayCrypto': PayCrypto,
        },

        data: function() {
            return {
                modalType: {default: 'payCrypto'},
                modalTitle: {default: 'Pay with Crypto'},

                onSuccessFunction: {default: function () {}},
                onErrorFunction: {default: function () {}},
            }
        },

        props:{
            onSuccess: { default: function () { } },
            onError: { default: function () { } },

            fiatValue: { default: 0.0 },
            fiatCurrency: { default: 'BTC' },

            cryptoValue: { default: 0.0 },
            cryptoCurrency: { default: 'BTC' },

            cryptoWallet: { default: '' },
        },

        computed:{

            isLoggedIn(){
                return this.$store.getters.isAuthenticatedUserLoggedIn;
            },

        },

        methods: {

            close() {
                if (typeof this.$refs['refModal'] !== 'undefined')
                    this.$refs['refModal'].closeModal();
            },

            open() {
                if (typeof this.$refs['refModal'] !== 'undefined')
                    this.$refs['refModal'].showAlert();
            },

            setPayCrypto(){
                this.modalType = "payCrypto";
                this.modalTitle = "Pay with Crypto ";
            },

            openPayModal(cryptoCurrency){

                this.setPayCrypto();
                this.open("payCrypto");
            },


            payCryptoSuccess(resource){

                let onSuccess = this.onSuccess || function () {};
                if (typeof onSuccess === 'function') onSuccess(resource);

                onSuccess = this.onSuccessFunction || function () {};
                if (typeof onSuccess === 'function') onSuccess(resource);

                this.close();
            },

            switchLoginToRegistration(e){
                e.preventDefault(); e.stopPropagation();
                this.setRegistration();
            },

            switchRegistrationToLogin(e){
                e.preventDefault(); e.stopPropagation();
                this.setLogin();
            },

            setOnSuccessEvent(newFunction){
                this.onSuccessFunction = newFunction;
            }

        }

    }
</script>
