# 关于 

组件化的结构设计成为了必然，如何处理好组件之间的交互成为应用架构设计的关键点。

借此以一个todo app为例子：

前端如下组件：

`todo-creator`, `todo-item`, `todo-list`, `todo-filter` 

应用端需要提供的API:

1. get : `todo/list`
2. post: `todo/create` 
3. get : `todo/update/{id}`
4. get : `todo/delete/{id}`
5. get : `todo/read/{id}`
6. get : `todo/search`

我们将以此为出发点，尝试探索一个适合大型应用的前端架构模式。 首先给出我所认为的一个好的架构设计标准

1. `高可维护性`：高效的开发，可读性高的源码 
2. `可扩展性`：业务是在不断发展的，良好的可扩展性是构建大型应用的基石
3. `高可复用性`：模块的复用性是一切的基础 

我认为的可达成这两个目标的设计原则： 

0. testable 
1. 分而治之 
2. 层次化的结构，自顶向下 
3. 松耦合，模块化 
4. 一个函数或模块只做一件事，保持在一个抽象层 

我把testable写为0，这是因为如果下面4点能做到，那么就能做到testable ，下面先介绍一下我所谓的testable的标准，低fan-out ,高fan-in ,低coupling。



# GRASP

> grasp : general responsibility assign software pattern 

grasp这是OOD的基础，共9个模式，所以在我想做一个架构设计之前，我必须先回忆一些基础的知识。 

软件设计很多时候就是对象，以及对象的职责设计。 对象的职责会关系到对象如何和其他对象交互。 
这里先列举几个：
1. 创建者模式(Creator)
2. 信息专家(Information Expert)
3. 低耦合(Low Coupling) 
4. 控制器(Controller)
5. 高内聚(High Cohesion) 


## 创建者模式(Creator)

一个对象应该由谁来创造，这个模式给出了如下定义：

> 定义：如果如下条件为真的时候，将创建类A实例的任务的职责分配给类B:
> 1. B 包含了或者组合聚集了A
> 2. B记录A
> 3. B紧密地使用A
> 4. B具有A的初始化数据  

## 信息专家

专家模式是最基本的模式，给定一个key，谁知道对象A的相关信息。

> 定义: 给对象分配职责的最基本的原则是，将职责分配给具有完成该职责所需信息的那个类 


## 底耦合

> 定义：分配职责以耦合度应保持在较低水平，以此标准评估候选方案 

## 控制器 

UI 层不应该负责逻辑，UI在接收到事件过后应该将处理委托派给领域层的领域对象。 控制器回答的问题是UI层之上的哪一个对象应该首先从UI层接收该消息。 

> 问题：在UI层上首先接收和协调操作的对象是什么？
> 解决方案：把职责分配给能代表下列选择之一的对象
> 
>    1. 代表全部 "系统", "根对象",运行软件的设备或主要的子系统（这些是外观控制器的所有变体）
>    2. 代表发生系统操作的用例场景（用例或回话控制器 **Handler） 
>    


## 其他几个模式

1. 开闭原则， 对修改关闭，对扩展开放 
2. LSP 代换原则，尽量用多态的方法变成 
3. DIP 依赖倒转原则，依赖于抽象，不要针对实现变成 
4. ISP 接口隔离，使用多个单一接口比一个接口好


## Testable javascript

> REF From <<Testable Javascript>>

## Fan-in, Fan-out

- **Fan-out：** 函数里边直接或者间接引用的对象或模块
- **Fan-in：** 函数被其他模块引用，测试函数的重用性

**直接依赖转化为注入** 

```javascript
    // 直接依赖
    function t() {
        a = new A();
    }

    // 依赖注入
    function t(a) {
        
    }
```

**why?:**
注入的对象通过Mock很容易实现，测试代码更容易实现，函数更加独立。 

## 耦合 

扇出扇入关注的是独立的模块对其他模块的依赖，耦合关注的是这些模块如何交互。 

```javascript
    // 耦合重level1-4逐步降低
    /**
    * Level1: content coupling
    */
    // 直接改变模块的状态
    O.property = 'haha'; 
    // 直接改变对象的方法
    O.method = function() {/**/}
    // 直接改变原型
    O.prototype.method = function() {/**/}

    /**
     * Level2: Common Coupling
     */
    // A 和 B 都依赖 Global 导致耦合
    var Global = 'global';
    function A() { Global = 'A' }
    function B() { Global = 'B' }

    /**
     * Level3: Control Coupling
     */
    // 工厂的行为根据控制参数改变
    var absFactory = new AbstractFactory({env: 'TEST'})
    
    /**
     * Level4: Stamp Coupling
     */
    // 函数只使用到了部分参数
    O.makeBread({ type: wheat, size: 99, name: 'foo'})
    O.prototype.makeBread = function(args) {
        return new Bread(args.type, args.size);
    }

    /**
     * Level4: Data Coupling
     */
    // 对象传递数据（不加控制）给另外的对象

    /**
     * 实例化 ： 介于content 和 common 之间的耦合
     */ 
```


# Decoupling

只要是写过代码的，都知道去耦合的代码才是好的代码，然后去耦合的方式有很多， 我想在这个章节里边列举并一一分析一下

0. module pattern 重谈模块模式
1. callback 回顾回调模式
2. mediator 中介者
3. pub/sub  发布订阅
4. dependence injection 依赖注入

## module pattern 

独立的模块开发已经成为了前端开发的基础，独立的模块控制最合适的代码逻辑层封装，好处当然是非常的多：

1. 模块重用性
2. 模块是具有独立逻辑的功能单元，易于测试
3. 模块是将大应用划分再划分后的独立功能单元，源码可读性高，易于维护 
4. 独立的模块可以想象为一个沙箱，里边定义的变量和方法不会污染全局

现成不是2014了，如果在此之前，我可能还会多介绍一下AMD，CommonJ，以及requireJs，seajs.. 我相信现在大多数公司都是在用自己标准的loader。 然后2015的前端模块开发应该是和io.js一致的，不需要bower_module，spm，需要的只有npm。 browserify 可以帮助我们做到这些。

像io.js一样写代码，模块可发布到npm当中或者private的npm当中。 

### browserify 多bundle 

有时候前端可能有多个仓库维护，每个仓库都依赖一个叫common的模块， 页面会引用三个js，common,mod1， mod2. 这个时候我们就会需要browserify的多bundle打包功能。简而言之就是仓库在打包的时候不会把common打包进去。 

具体实现可参考browserify文档，这里以gulp打包为例子

```javascript
var browserify = require('gulp-browserify');
var gulp = require('gulp');
var rename = require('gulp-rename');

 /**
 * 打包所有的common依赖
 */
gulp.task('common', function() {
    // var production = (process.env.NODE_ENV === 'production');
    var stream = gulp.src('./gulp/noop.js', {
        read: false
    });

    stream.pipe(browserify({
        // If not production, add source maps
        debug: false 
    }))
    .on('prebundle', function(bundle) {
        bundle.require('../assets-src/common/index.js', {
            expose: 'common'
        });
    })
    .on('error', function(err) {
        console.log(err);
        this.emit('end');
    })
    .pipe(rename('common.js'))
    .pipe(gulp.dest('./assets-dist/common/'));

    return stream;
});

/**
 * 打包业务模块
 */
gulp.task('biz1', function() {
    // var production = (process.env.NODE_ENV === 'production');
    var stream = gulp.src('./assets-src/biz1/biz1.js', {
        read: false
    });

    stream.pipe(browserify({
        debug: false, // If not production, add source maps
        transform: ["html2js-browserify"]
    }))
    .on('prebundle', function(bundle) {
        bundle.external('common');
    })
    .on('error', function(err) {
        console.log('error', err);
        this.emit('end');
    })
    .pipe(rename('roadmap.js'))
    .pipe(gulp.dest('./assets-dist/biz1/'));

    return stream;
});

```

### 模板文件可直接用require的方式引用

上面的打包程序可以看到`transform: ["html2js-browserify"]`. 这样transform配置的目的就是可以直接require html文件。不用在js里边做字符串拼接。 这里实质是将html自动转化为js。在npm官网上以html2js为关键词还可以搜索到类似的组件。

这样的方式是独立前端组件的基础，一个标准的前端组件可能包含模板，控制，样式。基于require的方式做到了无缝化的封装。 

## callback 

用回调的方式来简化逻辑

下面这段代码的功能是查找节点，然后隐藏这些节点
```javascript
    var nodes = findNodes();
    hide(nodes);
    function findNodes() {
        var nodes = [], node;
        while(true) {
            // 查找节点
            nodes.push(node);
        }
        return nodes;
    }
    function hide(nodes) {
        var i = 0, max = nodes.length;
        for(; i < max; i += 1) {
            nodes[i].style.display = "none";
        }
    }
```

用回调的方式来实现

```javascript
    findNodes(hide);
    function findNodes(callback) {
        var nodes = [], node;
        while(true){
            // 查找节点
            callback && callback(node);
            nodes.push(node); 
        }
        return nodes;
    }
    function hide(node) {
        node.style.display = "none";
    }
```

可以看到hide的实现逻辑变得简单了，然后findNodes却没有因此改变逻辑。原来的功能依然得以保存。这里其实是将逻辑委托给函数。


## mediator 

一个应用是由多个对象组成的，信息在对象间的相互交流传递。 可以看成一张关联map。 随着应用的不断变大，map也不断变大，对象的依赖关系相互穿插，开发者对map的理解和掌握变得复杂， 这就是所有的强耦合，这个时候就需要整理一下这张网络。

会发现，如果让这个网络变成树状结构，我们能更容易理解这个结构。 这就是divide and conquer的思想。 

个人的理解应用的架构也像一个公司的人事结构划分，对像对应公司的部门，如下图 
<br><br>
![](http://gtms02.alicdn.com/tps/i2/TB1c1woHXXXXXccXFXXQpxH_XXX-980-955.jpg)
<br><br>

中介者就像一个父节点，知道所有的子节点，所有的子节点的事情都由中介者来安排，子节点只需要负责做自己最擅长的事情。 


## 观察者模式

对我而言，观察者模式是callback 模式的优化，举一个定蛋糕的例子

**callback 模式:** 老板，我定个蛋糕，您把蛋糕做好了就打电话告诉我。 
**观察者模式:**老板，我定个蛋糕。老板说，你扫描一下我们的官微，蛋糕做好的消息会发布到这个微信公共账号上。

callback是将逻辑和控制传递给了函数，观察者是讲逻辑和控制传递给了消息。  

## channeled event

消息太多，当然很难理解，这个时候我们可以把消息分类。 每一个channel就是一个类别，我可以订阅channel下面的所有消息， 也可以订阅这个channel下面的一个消息。 

## EventProxy

参见[eventproxy](https://www.npmjs.com/package/eventproxy)
在应用当中，当多个动作完成过后，才会触发另外一个动作。 可以用eventproxy.all的方式，在接收到多个消息过后去执行另外一件事。 


## 依赖注入 

* (react browserify async load)
* 静态编译 $xxx 变量 

一开始在介绍testable javascript 就讲过，依赖注入的方式优于直接创建或者引用对象。 这样会方便测试。  

举个realy world的例子，看看angular 的service

```javascript
    angular.module('myApp').service('myEmptyService', function() {
      console.log(this);
    });

    // You don't even have to reference it within the controller's closure, simply pass
    // it in as an argument for now.
    angular.module('myApp').controller('MyFirstCtrl', function(myEmptyService) {});
```



## pure js, mvc, mvvm

对于MVC和MVVM如何选择，我们先别急着先入为主的观念下结论使用哪种模式，通过上面定义的标准分析便是。 我们来选两个

### pure js [jquery todo app](http://todomvc.com/examples/jquery/) 

这里大概的设计思路是：

1. handlerbar 作为模板引擎
2. 一个util类
3. 一个app.js 包含所有的逻辑 

这大概是最简单地应用设计了，相信现阶段大多数的web应用都是这种模式，包括我们天猫，当然在实际的应用中结构可能没有这么简单，那么按照下边的演变，一步一步的做refactor，看看最终这种模式能坚持多久。 

#### 阶段一：

应用设计初期，功能较少，需要的前端脚本也较少，更多地可能是css样式，一个人可以hold住全站。这个时候快速实现需求是最关键的，不用考虑什么模式，一个app.js完全可以掌控。 有新的功能

#### 阶段二：

应用功能增加交互组件变得复杂，原先的app.js 不断膨胀，需要将app.js拆解。 将页面分区块来控制，为每一个区块写一个js，将对应区块的功能分担到对应的js上。 业务的不断增加导致js文件也在不断的增加。

#### 阶段三：

应用变得成熟，交互变得十分复杂，一个输入框对应的js都可能变成上千行代码。 惨不忍睹。 得多人维护，这时候需要对应用做一下架构设计：

```
  model.js    // 专门负责和后端打交道，应用数据的维护
  app.js      // 原先的app.js变成了一个简单地入口文件
  route.js    // 可能变成单页面的应用
  sectionA {  // 分割为多个区块
    a.js      // 每个区块有多个js
    b {}      // 甚至区块内部直接独立为一个仓库
  }
  sectionB {}
  business {} // 和业务相关的代码也得独立出来了，不然揉在一起得跪，bug大多出在这些上面
  util     {} // 抽取公用的函数库出来
  lib      {  // 依赖的第三方库也逐渐多了起来
    jquery.js
    jquery.blabla-plugin.js
    template.engine.js // 再也不想前端字符串拼接了
  }
```

可见上面已经有了model-controller 划分的概念，可能这也是现在大多数公司前端代码的基本结构。

那这种模式有什么问题呢，考虑阶段4：

#### 阶段四：

虽然现阶段应用已经成熟，但是带来的成本是需要多个人维护。 与此同时有下面这些问题。

1. 新成员入手难度高：这种结构的代码一旦每个文件都多大于500行，那阅读并掌控50个左右这样的文件的逻辑想想也不简单。  
2. 业务的快速发展和变革需求，前端跟不上，一旦要改原来的代码，那将是噩梦
    * 没有且无法做TDD，改起来风险太高，万一一个业务场景没有考虑到就跪
    * 新需求添加起来是在旧代码上不断添加逻辑，慢且高风险 
3. 新业务很难复用这些代码

#### 总结一下这种模式的问题

1. 虽然也具有一定的视图划分，但视图的划分的规范性较低，划分粒度不一。
2. 控制器的代码和视图交互柔和在一起，出现MVC模式的通病大控制器
3. model虽然拆开了，但是model没有做到规范性的细粒度划分，导致model也可能巨大复杂，应该是控制器逻辑可能也会跑到model。 

对比我认为的`可维护性`，`可复用性`都很难达到。






### [Backbone todo app](http://todomvc.com/examples/backbone/)

首先是视图模板， 分为main, item, filter
```html

    <!-- main-section.html -->
    <section id="main">
        <input id="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        <ul id="todo-list"></ul>
    </section>

    <!-- item template -->
    <div class="view">
        <input class="toggle" type="checkbox" <%= completed ? 'checked' : '' %>>
        <label><%- title %></label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="<%- title %>">

    <!-- filter template -->
    <span id="todo-count"><strong><%= remaining %></strong> <%= remaining === 1 ? 'item' : 'items' %> left</span>
    <ul id="filters">
        <li>
            <a class="selected" href="#/">All</a>
        </li>
        <li>
            <a href="#/active">Active</a>
        </li>
        <li>
            <a href="#/completed">Completed</a>
        </li>
    </ul>
    <% if (completed) { %>
    <button id="clear-completed">Clear completed (<%= completed %>)</button>
    <% } %>
```

应用结构

```text
    .
    ├── app.js
    ├── collections
    │   └── todos.js
    ├── models
    │   └── todo.js
    ├── routers
    │   └── router.js
    └── views
        ├── app-view.js
        └── todo-view.js
```


```js
    // 入口函数 app.js
    new app.AppView();
```

对这样的结构的理解

1. 对组件的控制是树状接口，将大的视图递归分割成小的视图
2. 一个视图对应一个model
3. 和后端同样地机制，collection和model对应数据库orm
4. 基于pub/sub的模式连接orm与对应层级的view 

YY一下将这个结构划分为可重用的组建怎样？

```
    .
    ├──todo-item-component
        ├── todo-item.tmpl.html
        ├── todos.js
        └── todos.js

```



















> 参考：
> 
>  1.《Testable Javascript》
>  2.《Javascript 模式》
>  3. [Patterns For Large-Scale JavaScript Application Architecture -by Addy Osmani](http://addyosmani.com/largescalejavascript)
>  4. [JavaScript Application Architecture On The Road To 2015 -by Addy Osmani](https://medium.com/@addyosmani/javascript-application-architecture-on-the-road-to-2015-d8125811101b)
>  
