import {
  hasStringify
} from './common.js'
class CustomStorage {
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
  /**
   * 获取所有key
   * @returns 回storage当中所有key集合
   */
  getKeys() {
    return Object.keys(this.readStorage);
  }
  /**
   * 获取所有value
   * @returns 所有数据集合
   */
  getValues() {
    return Object.values(this.readStorage);
  }

  /**
   * 初始化Storage的数据
   * @param config
   */
  bootStrap(config) {
    switch (config.mode) {
      case 'session':
        this.readStorage = window.sessionStorage
        break;

      case 'local':
        this.readStorage = window.localStorage
        break;

      default:
        window.alert('当前配置的mode未再配置区内，可以检查传入配置。')
        break;
    }
    this.config = config
  }

  /**
   * 返回当前存储库大小
   * @returns number
   */
  size() {
    return this.readStorage.length;
  }
  hasItem(key) {
    return this.readStorage.hasOwnProperty(key);
  }

  /**
   * 设置当前
   * @param key 设置当前存储key
   * @param value 设置当前存储value
   */
  setItem(key, value) {
    if (hasStringify(value)) {
      const saveData = {
        timestamp: new Date().getTime(),
        data: value
      }
      console.log(saveData, 'saveData')
      this.readStorage.setItem(key, JSON.stringify(saveData))
    } else {
      window.alert('需要存储的data不支持JSON.stringify方法，请检查当前数据')
    }
  }

  /**
   * 获取数据
   * @param key 获取当前数据key
   * @returns 存储数据
   */
  getItem(key) {
    const content = JSON.parse(this.readStorage.getItem(key))
    return content?.data || null
  }

  /**
   * 移除一条数据
   * @param key 移除key
   */
  removeItem(key) {
    if (this.hasItem(key)) {
      this.readStorage.removeItem(key);
    }
  }
  changeItem(key, onChange, baseValue) {
    const data = this.getItem(key);
    this.setItem(key, onChange(data || baseValue));
  }
  clearAll() {
    this.readStorage.clear();
  }
}

/**
 * 实例化当前Storage下的class
 */
export default CustomStorage