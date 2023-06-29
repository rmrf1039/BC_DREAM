# DREAM 客戶端與智能合約

## 安裝說明

1. 安裝測試鏈
```sh
# Install Truffle globally
$ npm install -g truffle
```
建議使用 VS，並安裝 remix 來幫助 compile 與 deploy

2. 安裝依賴程式
對 /client、 /truffle 文件夾目錄下都執行以下指令
```sh
$ npm install
```

3. 運行客戶端
```sh
$ cd clienta
$ npm start
```

## FAQ
- __How do I use this with Ganache (or any other network)?__

  The Truffle project is set to deploy to Ganache by default. If you'd like to change this, it's as easy as modifying the Truffle config file! Check out [our documentation on adding network configurations](https://trufflesuite.com/docs/truffle/reference/configuration/#networks). From there, you can run `truffle migrate` pointed to another network, restart the React dev server, and see the change take place.

- __Where can I find more resources?__

  This Box is a sweet combo of [Truffle](https://trufflesuite.com) and [Webpack](https://webpack.js.org). Either one would be a great place to start!
