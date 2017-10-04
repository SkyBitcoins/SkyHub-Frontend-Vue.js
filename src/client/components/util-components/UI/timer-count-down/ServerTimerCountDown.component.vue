<template>

    <div>
        time left:
        <b>
            <div v-if="this.getCountDownSeconds != 666">
                {{this.getCountDownSeconds}}s
            </div>
            <div v-else>
                -
            </div>
        </b>
    </div>

</template>

<script>

    export default{

        name: "ServerTimerCountDown",

        //@onCountDown,

        data() {
            return {
                countDown: 666,
                now: 0,
            }
        },

        computed:{

            getCountDownSeconds(){
                return Math.floor(this.countDown/1000)
            }

        },

        mounted () {

            if (!this.$isServer){
                window.setInterval(() => {

                    this.countDownSeconds()

                },1000);
                this.countDownSeconds()
            }
        },

        methods:{

            countDownSeconds(){
                let diff = this.$store.state.global.timeServer - this.$store.state.global.timeClient;
                diff %= (1000 * 60); // only for the seconds

                this.now = (new Date()).getTime();
                this.now %=  (1000 * 60); // only for the seconds

                let countDown = (this.now -  diff);

                this.countDown = (61*1000) - countDown;

                if ((this.countDown < 5) || (this.countDown > 55)){
                    this.$emit('onCountDown',this.countDown);
                }

            }

        },

    }

</script>