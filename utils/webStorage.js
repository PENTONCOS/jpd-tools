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
}

/**
 * 实例化当前Storage下的class
 */
export default CustomStorage

