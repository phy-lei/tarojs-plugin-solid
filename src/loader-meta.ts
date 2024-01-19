interface ILoaderMeta {
  importFrameworkStatement: string
  mockAppStatement: string
  frameworkArgs: string
  creator: string
  creatorLocation: string
  extraImportForWeb: string
  execBeforeCreateWebApp: string
  importFrameworkName: string
  isNeedRawLoader?: boolean
  modifyConfig?: (config: Record<string, any>, source: string) => void
}

export function getLoaderMeta(): ILoaderMeta {
  return {
    importFrameworkStatement: '',
    mockAppStatement: '',
    frameworkArgs: 'config',
    creator: 'createSolidApp',
    creatorLocation: 'tarojs-plugin-solid/dist/runtime',
    importFrameworkName: '',
    isNeedRawLoader: true,
    extraImportForWeb: '',
    execBeforeCreateWebApp: ''
  }
}
