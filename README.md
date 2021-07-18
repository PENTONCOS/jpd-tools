# jpd-tools

## 使用方法
### Install
```javascript
npm install jpd-tools

yarn add jpd-tools
```
### Usage

现支持方法如下：
- **WebStorage**: 操作本地存储
  - 存入数据: customStorage.setItem(key, value); 
  - 获取数据: customStorage.getItem(key); 
  - 移除数据: customStorage.removeItem(key); 
  - 改变数据: customStorage.changeItem(key, onChange, baseValue);
  - 清除所有数据: customStorage.clearAll(); 
  - 返回当前存储库大小: customStorage.size();

  ```javascript
  // store.js
  import { WebStorage } from 'jpd-tools';

  let customStorage = new WebStorage();

  customStorage.bootStrap({
    mode: 'local', // local || session
    timeout: 3000, // 过期时间
  })

  export default customStorage

  // a.js
  import customStorage from 'store.js';
  // 存入数据
  customStorage.setItem(key, value);
  ```

- **downloadFile**: 下载文件
  ```javascript
  import { downloadFile } from 'jpd-tools';
  /**
  * 下载接口返回的文件流
  * @param {*} data blob文件流
  * @param {*} type 文件类型
  * @param {*} fileName 下载文件名
  */
  downloadFile(data, type, fileName);
  ```