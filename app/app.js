import Vue from 'nativescript-vue';

import App from './App';

Vue.config.silent = false;
import orientation from './nativescript-orientation';

new Vue({

    render: h => h('frame', [h(App)]),
    mounted() {
        setTimeout(() => {
            orientation.setOrientation('portrait')
            orientation.disableRotation();
        }, 0)
    }


}).$start();


