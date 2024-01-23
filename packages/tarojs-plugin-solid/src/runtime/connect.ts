import {
  AppInstance,
  Current,
  document,
  injectPageInstance,
  Instance,
  PageProps,
  TaroNode,
} from '@tarojs/runtime'
import { hooks } from '@tarojs/shared'
import { batch, createSignal, For } from 'solid-js'
import { createComponent, h, render } from 'tarojs-solid-custom-render'

import { PageContext } from './context'
import { setDefaultDescriptor, setRouterParams } from './utils'


type Component = (props?: any) => TaroNode;


/**
 * 桥接小程序 App 构造器和 React 渲染流程
 * @param App 用户编写的入口组件
 * @param react 框架
 * @param dom 框架渲染器
 * @param config 入口组件配置 app.config.js 的内容
 * @returns 传递给 App 构造器的对象 obj ：App(obj)
 */
export function createSolidApp (App: Component, config) {

  const appRef: any = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mount: () => { },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    unmount: () => { }
  }
  function getAppInstance () {
    return appRef
  }

  const AppWrapper = () => {
    const [pages, setPages] = createSignal<any[]>([])

    appRef.mount = (component, id) => {
      setPages((old) => [
        ...old,
        {
          id,
          component,
        },
      ])
    }

    appRef.unmount = (id) => {
      setPages(
        pages().filter((item) => {
          return item.id !== id
        }),
      )
    }

    return createComponent(App, {
      ref: appRef,
      children: createComponent(For as unknown as Component, {
        get each () {
          return pages()
        },
        children: ({ id, component }) => {
          const children = () => {
            return createComponent(PageContext.Provider as unknown as Component, {
              value: id,
              children: () => {
                injectPageInstance({ id: id, type: 'page' } as unknown as Instance<PageProps>, id)
                return createComponent(component, {
                  tid: id,
                })
              },
            })
          }

          if (process.env.TARO_ENV === 'h5') {
            return h('div', { id, className: 'taro_page' }, children)
          } else {
            return h('root', { id }, children)
          }
        },
      }),
    })
  }

  function renderSolidRoot () {
    let appId = 'app'
    if (process.env.TARO_ENV === 'h5') {
      appId = config?.appId || appId
    }
    const container = document.getElementById(appId)
    render(AppWrapper, container)
  }

  if (process.env.TARO_ENV !== 'h5') {
    renderSolidRoot()
  }

  const [ONLAUNCH, ONSHOW, ONHIDE] = hooks.call('getMiniLifecycleImpl')!.app


  const appObj: AppInstance = Object.create(
    {
      mount (component: any, id: string, cb) {
        const appInstance = getAppInstance()
        appInstance?.mount(component, id)
        batch(cb)
      },

      unmount (id: string, cb: () => void) {
        const appInstance = getAppInstance()
        appInstance?.unmount(id)
        batch(cb)
      },
    },
    {
      config: setDefaultDescriptor({
        configurable: true,
        value: config,
      }),

      [ONLAUNCH]: setDefaultDescriptor({
        value (options) {
          setRouterParams(options)
          const app = getAppInstance()
          app?.[ONLAUNCH]?.(options)
        },
      }),

      [ONSHOW]: setDefaultDescriptor({
        value (options) {
          setRouterParams(options)
          const app = getAppInstance()
          app?.[ONSHOW]?.(options)
        },
      }),

      [ONHIDE]: setDefaultDescriptor({
        value (options) {
          const app = getAppInstance()
          app?.[ONHIDE]?.(options)
        },
      }),

      onError: setDefaultDescriptor({
        value (error: string) {
          const app = getAppInstance()
          app?.onError?.(error)
        },
      }),

      onPageNotFound: setDefaultDescriptor({
        value (res: unknown) {
          const app = getAppInstance()
          app?.onPageNotFound?.(res)
        },
      }),
    },
  )

  Current.app = appObj
  return appObj
}
