interface ILoaderMeta {
  importFrameworkStatement: string
  mockAppStatement: string
  frameworkArgs: string
  creator: string
  creatorLocation: string
  importFrameworkName: string
  isNeedRawLoader?: boolean
  extraImportForWeb?: string
  execBeforeCreateWebApp?: string
  compatComponentImport?: string
  compatComponentExtra?: string
  modifyConfig?: (config: Record<string, any>, source: string) => void
}

export function getLoaderMeta (): ILoaderMeta {
  return {
    importFrameworkStatement: ``,
    mockAppStatement: ``,
    frameworkArgs: 'config',
    creator: 'createSolidApp',
    creatorLocation: 'tarojs-plugin-solid/dist/runtime',
    importFrameworkName: '',
    compatComponentImport: '',
    compatComponentExtra: '',
  }
}
