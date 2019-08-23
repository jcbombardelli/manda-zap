<template>
    <Page class="page" actionBarHidden="true">
        <ScrollView>
            <AbsoluteLayout width="100%" height="100%">

                <FlexboxLayout width="100%" height="100%" justifyContent="center"
                    alignItems="center">
                    <StackLayout id="background" :class="{secondary: isSending}" />
                </FlexboxLayout>

                <Image src="~/assets/icons/earth.png" opacity="0.25" width="350"
                    id="earth" height="350" :marginLeft="(width - 250)"
                    :marginTop="(height - 400)" />

                <FlexboxLayout flexDirection="column" height="100%" width="100%"
                    id="app">
                    <!-- <Header class="header" :secondary="isSending" /> -->

                    <StackLayout class="home-panel" flexGrow="7" id="view">

                        <Home v-on:togglesender="toggleSender" v-if="!isSending" />
                        <Sending v-on:togglesender="toggleSender" v-else
                            class="sending" />

                    </StackLayout>

                    <!-- <Footer class="footer" /> -->
                </FlexboxLayout>

            </AbsoluteLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import Header from "./components/Header";
    import Footer from "./components/Footer";
    import Home from "./view/Home";
    import Sending from "./view/Sender";

    const platform = require("tns-core-modules/platform");
    const application = require("tns-core-modules/application");

    export default {
        methods: {
            toggleSender() {
                this.isSending = !this.isSending;
            }
        },

        data() {
            return {
                platform: "",
                isSending: false,
                width: 0,
                height: 0
            };
        },

        mounted() {
            this.width = platform.screen.mainScreen.widthDIPs;
            this.height = platform.screen.mainScreen.heightDIPs;
            if (application.ios) {
                this.platform = "ios";
            } else if (application.android) {
                this.platform = "android";
            }
        },

        components: {
            Header,
            Footer,
            Home,
            Sending
        }
    };
</script>

<style scoped>
    .sending {
        z-index: 100000;
    }

    .header {
        margin: 25 10 10;
        height: 30;
    }

    .footer {
        padding: 10 50 10;
        height: 50;
    }

    #view {
        vertical-align: center;
    }


    #app {
        z-index: 10;
    }

    #earth {
        z-index: 5;
        animation-name: bounceInOpacity;
        animation-duration: 1s;
        animation-delay: 0.5s;
    }

    #background {
        width: 100;
        height: 100;
        border-radius: 100%;
    }

    #background.secondary {
        background: linear-gradient(-45deg, #00E676, #1EBEA5);
        animation-name: circle;
        animation-duration: 1s;
        animation-fill-mode: forwards;

    }

    @keyframes circle {
        from {
            transform: scale(0)
        }

        to {
            transform: scale(10)
        }
    }
</style>