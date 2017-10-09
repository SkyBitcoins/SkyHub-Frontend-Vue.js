/*
    TUTORIAL: https://www.npmjs.com/package/qrcode.vue
*/

<template>
    <div>

        <div style="text-align: left">

            <div class="col-md-5" style="padding-left: 0">
                <qrcode-vue :value="this.getQRCodeAddress" size="200"></qrcode-vue>
            </div>

            <div class="col-md-7" style="padding-left: 0">
                <div>
                    <span>Price: {{this.fiatValue}}   {{this.fiatCurrency}}</span> <br/> <br/>

                    <b><span>Value: {{this.cryptoValue}}   {{this.cryptoCurrency}}</span></b> <br/> <br/>
                    <span>Wallet: </span><br/>
                    <span>{{this.cryptoWallet}} </span><br/>

                </div>
            </div>

            <div class="clearfix" />

            <br/>
            <a :href="this.getQRCodeAddress" style="margin-bottom: 0">
                {{this.getQRCodeAddress}}
            </a>

        </div>

    </div>
</template>

<script>

    import {showInputStatus, showInputFeedback, convertValidationErrorToString} from 'client/components/util-components/form-validation/formValidation';
    import LoadingButton from 'client/components/util-components/UI/buttons/LoadingButton.vue';
    import QrcodeVue from 'qrcode.vue';

    export default {


        name: 'PayCrypto',

        components: {
            'LoadingButton':LoadingButton,
            'QrcodeVue': QrcodeVue,
        },

        data: function () {
            return {
                refLoadingButton: null,
            }
        },

        props : {
            onSwitch: { type: Function },

            fiatValue: { default: 0.0},
            fiatCurrency: { default: 'BTC' },

            cryptoValue: { default: 0.0 },
            cryptoCurrency: { default: 'BTC' },

            cryptoWallet: { default: '' },
        },

        computed:{

            getQRCodeAddress(){
                if (this.cryptoCurrency === 'BTC')
                    return 'bitcoin:'+this.cryptoWallet+'?amount='+this.cryptoValue

                return ''
            }

        },

        //@onSuccess,
        //@onError,


        methods:{


        }
    }
</script>
