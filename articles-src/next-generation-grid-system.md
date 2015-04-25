@title: 下一代网格系统
@date: 2014-11-30

## 什么是网格系统
相信网格系统我就不用多介绍， 网格系统极大的简化我们日常的ui开发。 通常来说，我们所熟悉的前端UI框架都会包括一个基本的网格系统，如`bootstrap`, `foundation`, `semantic-ui`. 当使用这些框架的时候，会发现大量的用到网格。 

## 为什么需要新的网格系统
网格系统在不断的演进， 重最初的`960 grid system` 到这两年的`responsive grid system`。但是随着现在碎片化的终端以及ui的复杂化，原先使用`float`的网格系统在布局上会遇到越来越多的挑战。当我们需要螺丝刀的时候却还在用锤子在工作， 当然不会有什么效率可言。现在的UI布局总结而言

1. **越来越复杂**
2. **动态化和自适应**
3. **响应式**

这个时候浏览器为了解决这类问题，提供了很多方法：`flexbox`, `media query`, `em,rem,vw,vh`. 这里我们将讨论的时如何使用`flexbox`来实现新一代的网格系统。这里不会介绍flexbox的用法，而是更多地介绍基于flexbox实现的网格
 
**下面我会通过案例介绍网格系统用法， 最后提供源码**

## 等分的网格 

![图片描述][1]

**代码:**

```html 
 <div class="flex-box">
    <div class="cell">1</div>
    <div class="cell">2</div>
    <div class="cell">3</div>
    <div class="cell">4</div>
 </div>
```
**解释:**

原先的`grid>cell`是基于百分比和float的， 百分比不可能达到绝对的准确。 但是flexbox则不同，是浏览器分配的等比例宽度， 这里每一个cell的flex为1, 所以会等比例分配. 

## 纵向的等比例分配

![图片描述][2]

**代码:**
```html 
<div class="flex-box vertical" style="height: 200px;">
    <div class="cell">1</div>
    <div class="cell">2</div>
    <div class="cell">3</div>
    <div class="cell">4</div>
</div>
```

**解释：**
原先的网格系统，如果为了实现纵向的话， 必须要对高度也设置12格的百分比，这样带来的时源文件变很大。 但是对于flexbox来说，只需要设置： `flex-direction: column`就行。 对于横线能做的事情，纵向都能做，我只能说，这才是我们需要的网格。 

## 未知的固定尺寸 + 动态的宽度

![图片描述][3] 

相信上图的这种布局需求是很常见的，但是如果200px这个是不确定的呢？在很多场景下， 我们需要一个文字 + 动态宽度的设计， 这个时候文字的长度不确定，如果要实现这样的需要，可能之有上js了。 

**代码**

```html 
<div class="flex-box">
    <div class="cell fixed" style="width: 200px;">200px</div>
    <div class="cell">flex</div>
    <div class="cell">flex</div>
    <div class="cell">flex</div>
</div>

<div class="flex-box">
    <div class="cell fixed" style="width: 100px;">100px</div>
    <div class="cell">flex</div>
    <div class="cell fixed" style="width: 100px">100px</div>
</div>
```

**解释**
这里的fixed表示`flex: none`, 这样flexbox就会动态的计算flex的cell的宽度。 

这里我们还可以看纵向的这样的需求：

![图片描述][4] 

**代码**
```html 
<div class="flex-box vertical" style="height: 300px;">
    <div class="cell fixed" style="height: 50px">50px header</div>
    <div class="cell">flex content</div>
    <div class="cell fixed" style="height: 50px">50px footer</div>
</div>
```


## 垂直水平居中的div

![图片描述][5]  

这种需求绝对的时主流， 以前的方式通过`table-cell`, 通过`top: 50%...` 通过`line-height`， 都是很别扭的hack方法。 但是现在可以通过flexbox完美支持

**代码**
```html
<div class="flex-box align-center justify-center" style="height: 200px; border: solid 1px gray;">
    <div class="cell fixed" style="width: 50px;">50px</div>
    <div class="cell fixed" style="width: 50px;">50px</div>
    <div class="cell fixed" style="width: 50px;">50px</div>
</div>
```

**解释**
`align-center` 会让所有的cell垂直居中， `justify-center`会让所有的cell水平居中。


## col-* 的也可以完美保留 

以前我们会使用`col-1, col-4, col-6`等这样的用法， 表示一个cell占用12网格的多少个网格。
现在的用法也类似：

```html 
<div class="flex-box">
    <div class="cell cell-6">50%</div>
    <div class="cell">flex</div>
    <div class="cell">flex</div>
</div>
```
输出结果为：

![图片描述][6] 

## 动态的等高的div 

![图片描述][7]
 按照旧的方式来实现的话， 我相信不上js是没有办法解决的。 看看现在的方式能有多简单。 

```html 
<div class="flex-box align-stretch" style="border: solid 1px gray;">
    <div class="cell">flex</div>
    <div class="cell">flex</div>
    <div class="cell"><pre>
        x
        x
        x
        x
        x
        x
    </pre></div>
</div>
```
 只需要加上`align-stretch` 类就可以实现等高的需求， 这里值得注意的时， 如果自己在cell上设置了高度， 会覆盖flexbox分配的stretch高度。 

## flexbox 独有的align

**align items top**
![图片描述][8]
**align items bottom**
![图片描述][9]
**align items center** 
![图片描述][10]

```html
<div class="flex-box  align-top" style="height: 200px; border: solid 1px gray;">
    <div class="cell cell-6">50%</div>
    <div class="cell">flex</div>
    <div class="cell">flex</div>
</div>

<div class="flex-box  align-bottom" style="height: 200px; border: solid 1px gray;">
    <div class="cell cell-6">50%</div>
    <div class="cell">flex</div>
    <div class="cell">flex</div>
</div>

<div class="flex-box align-center" style="height: 200px; border: solid 1px gray;">
    <div class="cell cell-6">50%</div>
    <div class="cell">flex</div>
    <div class="cell">flex</div>
</div>
```

**align-self**
cell可以自己控制自身的align
![图片描述][11]
```html 
<div class="flex-box align-center" style="height: 200px; border: solid 1px gray;">
    <div class="cell align-top">align top</div>
    <div class="cell">flex</div>
    <div class="cell">flex</div>
</div>
```
其他的cell上， 也可以使用`align-bottom`, `align-center`, `align-stretch`。 


## less 源码
```less
 /**
 * flexbox grid system
 * @author: chenxuejia67@gmail.com
 * @weibo: sysu_学家
 */
.make-flex-grid(12);
.make-flex-grid(@grid-number: 12) {
    .flex-box {
        // display flexbox
        display: flex;
        flex-wrap: wrap;
        &, *, *:after, *:before {
            box-sizing: border-box;
        }
        // flex-direction
        &.vertical {
            flex-direction: column;
            &.reverse {
                flex-direction: column-reverse;
            }
        }
        &.horizental {
            flex-direction: row;
        }
        &.reverse {
            flex-direction: row-reverse;
        }

        // justify-content
        &.justify-start {
            justify-content: flex-start;
        }
        &.justify-end {
            justify-content: flex-end;
        }
        &.justify-center {
            justify-content: center;
        }
        &.justify-between {
            justify-content: space-between;
        }
        &.justify-around {
            justify-content: space-around;
        }

        // align-items
        &.align-top {
            align-items: flex-start;
        }
        &.align-bottom {
            align-items: flex-end;
        }
        &.align-center {
            align-items: center;
        }
        &.align-stretch {
            align-items: stretch;
            .cell {
                height: auto !important;
            }
        }
        
        // .cell
        .cell {
            flex: 1;
            flex-basis: 0;
            max-width: 100%;
            padding: 0 !important;
            &.fixed {
                flex: none !important;
            }
            &.align-top {
                align-self: flex-start;
            }
            &.align-bottom {
                align-self: flex-end;
            }
            &.align-center {
                align-self: center;
            }
            &.align-stretch {
                align-items: stretch;
                height: auto !important;
            }
        }

        .grid-system();
    }
    .grid-system() {
        .loop(@grid-number);
        .loop(@index) when (@index > 0) {
            .cell-@{index} {
                .cell(@index);
            }
            .order-@{index} {
                order: @index;
            }
            @decreased-index: @index - 1;
            .loop(@decreased-index);
        }
    }
    .cell(@index: 0) {
        @size: percentage(@index / @grid-number);
        flex-basis: @size;
        max-width: @size;
    }
}
```
 
## css 代码

```css 
 /**
 * flexbox grid system
 * @author: chenxuejia67@gmail.com
 * @weibo: sysu_学家
 */

.flex-box {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.flex-box,
.flex-box *,
.flex-box *:after,
.flex-box *:before {
  box-sizing: border-box;
}

.flex-box.vertical {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

.flex-box.vertical.reverse {
  -webkit-box-orient: vertical;
  -webkit-box-direction: reverse;
  -webkit-flex-direction: column-reverse;
  -ms-flex-direction: column-reverse;
  flex-direction: column-reverse;
}

.flex-box.horizental {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
}

.flex-box.reverse {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: reverse;
  -webkit-flex-direction: row-reverse;
  -ms-flex-direction: row-reverse;
  flex-direction: row-reverse;
}

.flex-box.justify-start {
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
}

.flex-box.justify-end {
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
}

.flex-box.justify-center {
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.flex-box.justify-between {
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.flex-box.justify-around {
  -webkit-justify-content: space-around;
  -ms-flex-pack: distribute;
  justify-content: space-around;
}

.flex-box.align-top {
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.flex-box.align-bottom {
  -webkit-box-align: end;
  -webkit-align-items: flex-end;
  -ms-flex-align: end;
  align-items: flex-end;
}

.flex-box.align-center {
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.flex-box.align-stretch {
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
}

.flex-box.align-stretch .cell {
  height: auto !important;
}

.flex-box .cell {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -webkit-flex-basis: 0;
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  max-width: 100%;
  padding: 0 !important;
}

.flex-box .cell.fixed {
  -webkit-box-flex: 0 !important;
  -webkit-flex: none !important;
  -ms-flex: none !important;
  flex: none !important;
}

.flex-box .cell.align-top {
  -webkit-align-self: flex-start;
  -ms-flex-item-align: start;
  align-self: flex-start;
}

.flex-box .cell.align-bottom {
  -webkit-align-self: flex-end;
  -ms-flex-item-align: end;
  align-self: flex-end;
}

.flex-box .cell.align-center {
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  align-self: center;
}

.flex-box .cell.align-stretch {
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  height: auto !important;
}

.flex-box .cell-12 {
  -webkit-flex-basis: 100%;
  -ms-flex-preferred-size: 100%;
  flex-basis: 100%;
  max-width: 100%;
}

.flex-box .order-12 {
  -webkit-box-ordinal-group: 13;
  -webkit-order: 12;
  -ms-flex-order: 12;
  order: 12;
}

.flex-box .cell-11 {
  -webkit-flex-basis: 91.66666667%;
  -ms-flex-preferred-size: 91.66666667%;
  flex-basis: 91.66666667%;
  max-width: 91.66666667%;
}

.flex-box .order-11 {
  -webkit-box-ordinal-group: 12;
  -webkit-order: 11;
  -ms-flex-order: 11;
  order: 11;
}

.flex-box .cell-10 {
  -webkit-flex-basis: 83.33333333%;
  -ms-flex-preferred-size: 83.33333333%;
  flex-basis: 83.33333333%;
  max-width: 83.33333333%;
}

.flex-box .order-10 {
  -webkit-box-ordinal-group: 11;
  -webkit-order: 10;
  -ms-flex-order: 10;
  order: 10;
}

.flex-box .cell-9 {
  -webkit-flex-basis: 75%;
  -ms-flex-preferred-size: 75%;
  flex-basis: 75%;
  max-width: 75%;
}

.flex-box .order-9 {
  -webkit-box-ordinal-group: 10;
  -webkit-order: 9;
  -ms-flex-order: 9;
  order: 9;
}

.flex-box .cell-8 {
  -webkit-flex-basis: 66.66666667%;
  -ms-flex-preferred-size: 66.66666667%;
  flex-basis: 66.66666667%;
  max-width: 66.66666667%;
}

.flex-box .order-8 {
  -webkit-box-ordinal-group: 9;
  -webkit-order: 8;
  -ms-flex-order: 8;
  order: 8;
}

.flex-box .cell-7 {
  -webkit-flex-basis: 58.33333333%;
  -ms-flex-preferred-size: 58.33333333%;
  flex-basis: 58.33333333%;
  max-width: 58.33333333%;
}

.flex-box .order-7 {
  -webkit-box-ordinal-group: 8;
  -webkit-order: 7;
  -ms-flex-order: 7;
  order: 7;
}

.flex-box .cell-6 {
  -webkit-flex-basis: 50%;
  -ms-flex-preferred-size: 50%;
  flex-basis: 50%;
  max-width: 50%;
}

.flex-box .order-6 {
  -webkit-box-ordinal-group: 7;
  -webkit-order: 6;
  -ms-flex-order: 6;
  order: 6;
}

.flex-box .cell-5 {
  -webkit-flex-basis: 41.66666667%;
  -ms-flex-preferred-size: 41.66666667%;
  flex-basis: 41.66666667%;
  max-width: 41.66666667%;
}

.flex-box .order-5 {
  -webkit-box-ordinal-group: 6;
  -webkit-order: 5;
  -ms-flex-order: 5;
  order: 5;
}

.flex-box .cell-4 {
  -webkit-flex-basis: 33.33333333%;
  -ms-flex-preferred-size: 33.33333333%;
  flex-basis: 33.33333333%;
  max-width: 33.33333333%;
}

.flex-box .order-4 {
  -webkit-box-ordinal-group: 5;
  -webkit-order: 4;
  -ms-flex-order: 4;
  order: 4;
}

.flex-box .cell-3 {
  -webkit-flex-basis: 25%;
  -ms-flex-preferred-size: 25%;
  flex-basis: 25%;
  max-width: 25%;
}

.flex-box .order-3 {
  -webkit-box-ordinal-group: 4;
  -webkit-order: 3;
  -ms-flex-order: 3;
  order: 3;
}

.flex-box .cell-2 {
  -webkit-flex-basis: 16.66666667%;
  -ms-flex-preferred-size: 16.66666667%;
  flex-basis: 16.66666667%;
  max-width: 16.66666667%;
}

.flex-box .order-2 {
  -webkit-box-ordinal-group: 3;
  -webkit-order: 2;
  -ms-flex-order: 2;
  order: 2;
}

.flex-box .cell-1 {
  -webkit-flex-basis: 8.33333333%;
  -ms-flex-preferred-size: 8.33333333%;
  flex-basis: 8.33333333%;
  max-width: 8.33333333%;
}

.flex-box .order-1 {
  -webkit-box-ordinal-group: 2;
  -webkit-order: 1;
  -ms-flex-order: 1;
  order: 1;
}
```
 

## flexbox 加上 media-query + em、rem 

 这是我人为的现代的布局方式，它们之间如何合作又是一个话题了。


## 关于我
1. 微博： sysu_学家

> 参考
> http://flexboxgrid.com/
> http://zurb.com/article/1333/foundation-a-new-grid
> http://philipwalton.github.io/solved-by-flexbox/demos/grids/


  [1]: /img/bVkdJJ
  [2]: /img/bVkdJP
  [3]: /img/bVkdJR
  [4]: /img/bVkdJ0
  [5]: /img/bVkdJ5
  [6]: /img/bVkdKc
  [7]: /img/bVkdKm
  [8]: /img/bVkdKt
  [9]: /img/bVkdKu
  [10]: /img/bVkdKv
  [11]: /img/bVkdKH