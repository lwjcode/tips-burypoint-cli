## 自动埋点工具
> 在使用React框架的项目中，安装该工具并执行相关命令，可在代码中自动加上`data-tip-id`属性，减少手动埋点过程。

### 使用方法

#### 下载
```shell
npm i tips-burypoint-cli --save-dev
```

#### 初始化
```shell
tips-bp init
```
> 初始化生成`tips.config.js`文件，可进行相关配置。

#### 开始埋点
```shell
tips-bp start
```

#### 埋点介绍
> 为了避免层层嵌套的标签埋点，以下几种情况不埋点

- 1、标签的子节点只有`JSXElement`

```jsx
<div>
  <span>我的父元素不埋点</span>
  <span>我的父元素不埋点</span>
</div>
```

- 2、标签的子节点只有`CallExpression`

```jsx
<div>{render()}</div>
```

- 3、标签的子节点只有`ConditionalExpression`

```jsx
<div>{a ? <span>我是真</span> : <span>我是假</span>}</div>
```

- 4、标签的子节点只有`LogicalExpression`

```jsx
<div>
  {
    a && <span>我是真</span>
  }
</div>
```

- 5、标签有特殊属性`tips-bp-ignore`的不埋点

```jsx
<div tips-bp-ignore>
  {
    a && <span>我是真</span>
  }
</div>
```

