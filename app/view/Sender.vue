<template>
    <StackLayout id="sending" class="align-center" :class="platform" @tap="clearFocus">

        <Label textWrap="true" :text="titleHeader" class="h2 bold" />

        <FlexboxLayout padding="3" borderRadius="8" backgroundColor="#ffffff"
            class="input-container" width="90%" alignItems="center"
            marginBottom="3%" justifyContent="center">

            <Image src="~/assets/icons/whatsapp-green.png" height="20"
                minWidth="20" margin="0 12" />

            <TextView :width="phonehBarWidth" editable="true" v-model="phoneNumber"
                hint="ex: (11) 99172-0987" class="input extra-bold" ref="phoneBar"
                maxLength="15" keyboardType="phone">
            </TextView>

            <Image src="~/assets/icons/Cross-red.png" height="16" minWidth="16"
                margin="0 14" @tap="clearPhoneNumber" v-if="(phoneNumber !== '')" />
        </FlexboxLayout>

        <FlexboxLayout padding="3" borderRadius="8" backgroundColor="#ffffff"
            class="input-container" width="90%" height="80" alignItems="center"
            justifyContent="center">

            <Image src="~/assets/icons/dialog.png" height="20" minWidth="20"
                margin="0 12" />

            <TextView :width="messageBarWidth" editable="true" v-model="message"
                hint="Digite sua mensagem (opcional)" class="input extra-bold"
                ref="messageBar" keyboardType="text">
            </TextView>

            <Image src="~/assets/icons/Cross-red.png" height="16" minWidth="16"
                margin="0 14" @tap="clearMessage" v-if="(message !== '')" />
        </FlexboxLayout>

        <AbsoluteLayout width="90%" height="80" class="send-btn" @tap="sendMessage">
            <Image src="~/assets/icons/Search.png" left="28" top="25" width="25"
                height="25" class="icon" />
            <Button class="background" left="0" top="0" width="100%" height="100%"
                @tap="sendMessage">Mandar Zap!</Button>
        </AbsoluteLayout>

        <Button @tap="backToHome" class="close" />
    </StackLayout>
</template>

<script>
    import CityOverview from "../components/CityOverview";
    const application = require("tns-core-modules/application");
    const utilityModule = require("utils/utils");

    export default {
        data() {
            return {
                platform: "",
                phoneBarWidth: "0%",
                phoneNumber: "",
                phoneIsOk: false,
                messageBarWidth: "0%",
                message: "",
                messageIsOk: false,
                listCountries: []
            };
        },
        computed: {
            titleHeader() {
                if (this.numberIsOk) {
                    return "Agora clique em conectar";
                }
                return "Digite o numero que vamos nos conectar";
            },

            filteredCities() {
                if (this.phoneNumber !== "") {
                    return this.cities.filter(city =>
                        city.toLowerCase().includes(this.phoneNumber.toLowerCase())
                    );
                }
            }
        },

        created() {
            fetch(
                    "https://raw.githubusercontent.com/jcbombardelli/phone-list-with-flags/master/list.json"
                )
                .then(response => {
                    let j = JSON.parse(response);
                    console.log(j);

                    let contentType = response.headers.get("content-type");
                    console.log(response.text());
                    console.log(contentType);
                    //if (contentType && contentType.indexOf("application/json") !== -1) {
                    //response.json().then(json => {
                    //    this.listCountries = json;
                    //    console.log(`Countries is ${json}`);
                    //});
                    //}
                })
                .catch(err => console.log);
        },

        mounted() {
            if (application.ios) {
                this.platform = "ios";
                setTimeout(() => (this.phoneBarWidth = "100%"), 500);
            } else if (application.android) {
                this.platform = "android";
            }
        },

        methods: {
            backToHome() {
                this.$emit("togglesender");
            },
            clearFocus() {
                this.$refs.phoneBar.nativeView.dismissSoftInput();
            },
            clearPhoneNumber() {
                this.phoneNumber = "";
                this.phoneIsOk = false;
            },
            clearMessage() {
                this.message = "";
            },
            sendMessage() {
                utilityModule.openUrl(
                    `http://api.whatsapp.com/send?phone=55${this.phoneNumber}&text=${this.message}`
                );
            }
        }
    };
</script>

<style scoped>
    #sending {
        padding: 0 25;
        opacity: 0;
        animation-name: bounceIn;
        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-delay: 0s;
    }

    #sending .h2 {
        font-size: 18;
        margin-bottom: 40;
        color: #ffffff;
    }

    #sending .input-container {}

    #sending .input {
        background-color: #ffffff;
        height: 60;
        text-decoration: none;
        text-align: left;
        flex-grow: 2;
        font-size: 16;
        padding-top: 19;
    }

    #sending.ios .input {
        padding-top: 10;
    }

    #sending .close {
        height: 40;
        width: 40;
        background-image: ~/assets/icons/Cross.png;
        background-size: contain;
        margin-top: 75;
        margin-bottom: 100;
        opacity: 0;
        animation-name: fadeIn;
        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-delay: 0.5s;
    }

    #sending .send-btn {
        margin-bottom: 25;
        margin-top: 25;
    }

    #sending .send-btn .background {
        width: 100;
        height: 100;
        border-radius: 8;
        background: #ffffff;
    }

    #sending .description-label {
        opacity: 0;
        animation-name: bounceIn;
        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-delay: 1.5s;
        margin-bottom: 15;
    }
</style>