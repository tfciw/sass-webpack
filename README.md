## 前言
因为之前做了很多网站建设，用的gulp和sass配合，今天学了webpack，就基于webpack弄了一个，有点粗糙，会有后续改进。（适合初学者:joy:）

### 项目运行
```shell
克隆代码，执行安装
npm i
运行开启服务器，默认 port: 3000
npm start
部分电脑可能会需要手动打开 http://localhost:3000
项目打包（没有压缩）。
npm run dev
```
### 说明(没有清理文件，方便做演示，可自行清理)
clean-webpack-plugin保证每一次执行命令都会递归清空dist目录
```javascript
new cleanWebpackPlugin(['dist']),
```
```javascript
{
	test: /\.(jpg|png|gif|jpeg)$/,
	use: [{
		loader: 'url-loader',
		options: {
			limit: 10000,
			name: 'img/[name]_[hash:8].[ext]'
		}
	}]
},
{
	test: /\.html$/,
	use: ['html-withimg-loader']
}
//html会用到img标签，url-loader是不会对这些src下面的图片进行处理的，所以用到了html-withimg-loader这个loader，
//他会配合url-loader 做一些处理，最终输出到dist下面的img目录
```
其他loader就不一一提示了，常规处理。

### 开发
看到src目录，也是我们的源码目录
```shell
	|---src (目录)
		|---css (目录)
			|---reset.scss (文件)
			|---index.scss (文件)
		|---js (目录)
			|---jquery.SuperSlide.2.1.1.js (文件)
			|---main.js (文件)
		|---img (目录)
			|---1.jpg (文件)
		|---fonts (目录)
	|---other.html (文件)
	|---index.html (文件)
	|---app.js (文件)
```
不同目录放不同的文件，假定你的项目有N个html文件，则需要在webpack.config.js 里添加配置，例如：我又一个activity.html文件，则就需要在plugins添加相关配置。
```javascript
plugins: [
	new cleanWebpackPlugin(['dist']),
	new htmlWebpackPlugin({
		filename: 'index.html',
		template: 'src/index.html'
	}),
	new htmlWebpackPlugin({
		filename: 'activity.html',
		template: 'src/activity.html'
	})
],
```
添加一个scss文件，则需要在app.js里引用，例如：我需要一个index.scss
```javascript
import './css/reset.scss';
import './css/index.scss';
import './js/main.js';
```
js也是同理，反正当你需要什么文件(any.scss , any.js),你就在app.js里引入:joy:。
### 引入jquery
试了安装 juqery，再导入 import $ from 'jquery'，不过我运用的一个slider插件会失效，哪怕是本地导入了jquery源码也是一样，想了一个笨方法，那就是把jquery和SuperSlider放到一个文件，bingo。
#### 关于jquery的使用以及全局的 $ 后面会更新解决方法:stuck_out_tongue_closed_eyes:
