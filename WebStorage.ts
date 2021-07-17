interface StorageBootStrapConfig {
  /** 当前环境 */
  mode: 'session' | 'local',

  /** 超时时间 */
  timeout: number
}

class CustomStorage {
  private readStorage: Storage

  constructor() {
    if (!window) {
      throw new Error('当前环境非浏览器，无法消费全局window实例。')
    }
    if (!window.localStorage) {
      throw new Error('当前环境非无法使用localStorage')
    }
    if (!window.sessionStorage) {
      throw new Error('当前环境非无法使用sessionStorage')
    }
  }
}
