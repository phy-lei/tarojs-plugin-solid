const fs = require('fs')
const path = require('path')



const NEW_PACKAGE_VERSION = process.argv[process.argv.length - 1]

// 获取 packages 目录下的所有子目录
const packagesDir = path.join(__dirname, '../packages')
const packages = ['tarojs-plugin-solid', 'tarojs-solid-custom-render']


packages.forEach((packageDir) => {
  const packagePath = path.join(packagesDir, packageDir, 'package.json')

  try {
    // 读取 package.json 文件的内容
    const data = fs.readFileSync(packagePath, 'utf8')

    // 使用正则表达式查找并替换版本号
    const updatedData = data.replace(/("version": ")[^"]+/g, `$1${NEW_PACKAGE_VERSION}`)

    // 将更新后的数据写回 package.json 文件
    fs.writeFileSync(packagePath, updatedData, 'utf8')

    console.log(`Updated version in ${packagePath} to ${NEW_PACKAGE_VERSION}`)
  } catch (error) {
    console.error(`Error updating version in ${packagePath}:`, error)
  }
})
