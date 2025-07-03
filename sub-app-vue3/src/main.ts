import "@/assets/less/global.less";

import { createApp, type App as AppType } from "vue";
import App from "./App.vue";
import router from "./router";

import {
    renderWithQiankun,
    qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";

const useAppHook = () => {
    let app: AppType | undefined = undefined;
    const getApp = () => {
        if (!app) {
            app = createApp(App).use(router);
        }
        return app;
    };

    const removeApp = () => {
        if (app) {
            app.unmount();
            app = undefined;
        }
    };
    const result: [() => AppType, () => void] = [getApp, removeApp];
    return result;
};

const [getApp, removeApp] = useAppHook();

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    getApp().mount("#app");
} else {
    renderWithQiankun({
        mount(props) {
            getApp().mount(props.container?.querySelector("#app")!);
        },
        bootstrap() {
            console.log("bootstrap");
        },
        unmount(props: any) {
            console.log("unmount");
            removeApp();
        },
        update(props) {
            console.log("vue app update");
        },
    });
}
