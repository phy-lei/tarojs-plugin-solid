import {
    Current,
    document,
    injectPageInstance,
    Instance,
    PageProps,
    TaroNode,
} from "@tarojs/runtime";
import { For } from "solid-js";
import { installGlobalShims } from './dom'
import { createComponent, render, h } from "../custom-render";
import { hooks } from '@tarojs/shared'


installGlobalShims()

const [ONLAUNCH, ONSHOW, ONHIDE] = hooks.call('getMiniLifecycleImpl').app


type Component = (props?: any) => TaroNode;

export function createSolidApp(app, config) {
    const pages = new Map()

    const AppWrapper = () => {
        return createComponent(app, {
            children: createComponent(For as unknown as Component, {
                get each() {
                    return pages;
                },
                children: ({ id, component }) => {
                    const children = () =>
                        createComponent(null, {
                            value: id,
                            children: () => {
                                injectPageInstance(
                                    { id: id, type: "page" } as unknown as Instance<PageProps>,
                                    id
                                );
                                return createComponent(component, {
                                    tid: id,
                                });
                            },
                        });

                    if (process.env.TARO_ENV === "h5") {
                        return h("div", { id, className: "taro_page" }, children);
                    } else {
                        return h("root", { id }, children);
                    }
                },
            }),
        });
    };

    let appId = "app";
    if (process.env.TARO_ENV === "h5") {
        appId = config?.appId || appId;
    }
    const container = document.getElementById(appId);
    render(AppWrapper, container);


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
