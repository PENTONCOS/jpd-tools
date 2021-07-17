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
  - 获取数据: getItem(key); 
  - 移除数据: removeItem(key); 
  - 改变数据: changeItem(key, onChange, baseValue);
  - 清除所有数据: clearAll(); 
  - 返回当前存储库大小: size();

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
   