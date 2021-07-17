import {
  hasStringify
} from './common.js'

class CustomStorage {
  constructor() {
    if (navigator && navigator.storage) {

      // 判断navigator里是否有storage, 再去看使用缓存情况
      navigator.storage.estimate().then(estimate => {
        this.useage = estimate.useage // 总大小
        this.quota = estimate.quota // 使用大小
      });
    }

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
   * 获取当前清除存储空间，并且进行排序
   */
  getClearStorage() {
    const keys = Object.keys(this.readStorage)
    const db = [];
    keys.forEach(name => {
      const item = this.getItem(name)
      if (item.timestamp) {
        db.push({
          key: name,
          data: item
        })
      }
    })
    return db.sort((a, b) => {
      return a.data.timestamp - b.data.timestamp
    })
  }

  /**
 * 容量清理，直到满足存储大小为止
 */
  detectionStorageContext(currentSize) {
    if (this.usage + currentSize >= this.quota) {
      const storage = this.getClearStorage()
      for (let { key, data } of storage) {
        // 如果满足要求就跳出，还不够就继续清除。
        if (this.usage + currentSize < this.quota) break
        // 刷新容量大小
        this.removeItem(key)
        // 刷新容量
        if (navigator && navigator.storage) {

          // 判断navigator里是否有storage, 再去看使用缓存情况
          navigator.storage.estimate().then(estimate => {
            this.useage = estimate.useage // 总大小
            this.quota = estimate.quota // 使用大小
          });
        }
      }
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
    this.detectionStorageContext()
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
    const content = JSON.parse(this.readStorage.getItem(key));
    if ((content === null || content === void 0 ? void 0 : content.timestamp) && new Date().getTime() - content.timestamp >= this.config.timeout) {
      this.removeItem(key);
      return null;
    }
    return (content === null || content === void 0 ? void 0 : content.data) || null;
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