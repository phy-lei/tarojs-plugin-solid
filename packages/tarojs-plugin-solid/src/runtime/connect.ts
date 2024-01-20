import {
    Current,
    document,
} from "@tarojs/runtime";
import { installGlobalShims } from './dom'
import { render } from "tarojs-solid-custom-render"
import { hooks } from '@tarojs/shared'


installGlobalShims()

const [ONLAUNCH, ONSHOW, ONHIDE] = hooks.call('getMiniLifecycleImpl').app



export function createSolidApp(app, config) {
    const pages = new Map()


    let appId = "app";
    if (process.env.TARO_ENV === "h5") {
        appId = config?.appId || appId;
    }
    const container = document.getElementById(appId);
    render(app, container);


    const appConfig = {
        config,

        mount(Page, id, cb) {

            pages.set(id, Page)
            cb()
        },

        unmount(id, cb) {
            if (pages.has(id)) {
                pages.get(id).$destroy()
            }
            cb()
        },

        [ONLAUNCH](options) {
            app?.onLaunch?.(options)
        },

        [ONSHOW](options) {
            app?.onShow?.(options)
        },

        [ONHIDE](options) {
            app?.onHide?.(options)
        },

        onError(error) {
            app?.onError?.(error)
        },

        onUnhandledRejection(error) {
            app?.onUnhandledRejection?.(error)
        },

        onPageNotFound(res) {
            app?.onPageNotFound?.(res)
        }
    }

    Current.app = appConfig

    return appConfig
}
