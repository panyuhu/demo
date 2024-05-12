var baseZindex = 999;
var index = 0;
var max = 0;

//Vue.use() 的果插件是一个对象时，必须提供 install 方法。
//如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。
let vDrag = function (Vue, options = {}) {
    /** @namespace options.directiveName */
    // 指令名字 在vue.use中作为参数指定
    let name = options.directiveName || 'drag';

    //注册一个全局自定义指令 `v-drag`,基本语法Vue.directive('drag', {  钩子函数 })
    //钩子函数 bind：只调用一次，指令第一次绑定到元素时调用。
    //指令钩子函数会被传入以下参数：el、binding等。el：指令所绑定的元素，可以用来直接操作 DOM。binding：一个对象，只读，切勿进行修改

    Vue.directive(name, {
        bind(el, binding) {
            var odiv = el;
            var disX = 0;//鼠标相对元素的位置
            var disY = 0;//鼠标相对元素的位置
            var curClientX; //鼠标指针坐标
            var curClientY;//鼠标指针坐标

            //getAttribute() 方法返回指定属性名的属性值。
            var isFixed = el.getAttribute("fixed") != null;

            //getElementsByClassName() 方法返回文档中所有指定类名的元素集合,是一个数组
            var handle = el.getElementsByClassName('v-drag-handle').length > 0 ? el.getElementsByClassName('v-drag-handle')[0] : el;

            var zindexEnable = el.getAttribute("zindexEnable");
            if (zindexEnable) {
                el.setAttribute('data-zindex', index);
                el.style.zIndex = baseZindex + index;
            }


            // 记录长度,index最后是个固定值
            index++;
            // 保存最大值，默认没点击时，最大值就是最后一个，max是根据点击动态变化
            max = index;


            handle.addEventListener('mousedown', mouseDownHandle);
            document.addEventListener('mouseup', mouseUpHandle);
            //------------------------------------鼠标抬起事件
            function mouseUpHandle() {
                document.removeEventListener('mousemove', mouseMoveHandle);
            }
            //------------------------------------鼠标点击事件
            function mouseDownHandle(e) {
                if (zindexEnable) {
                    if (el.getAttribute('data-zindex') < max) {
                        el.setAttribute('data-zindex', ++max - 1);
                        el.style.zIndex = baseZindex + max - 1;
                    }
                }
                // clientX/Y    事件属性返回当事件被触发时鼠标指针相对于浏览器页面（或客户区）的水平坐标
                // offsetLeft   可以判断一个物体的跟document的左边距离，也就是浏览器左边缘
                // getBoundingClientRect用于获取某个元素相对于视窗的位置集合。
                // 这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离。

                curClientX = e.clientX;
                curClientY = e.clientY;
                // 算出鼠标相对元素的位置
                if (isFixed) {
                    var rect = el.getBoundingClientRect();
                    disX = e.clientX - rect.left;
                    disY = e.clientY - rect.top;
                } else {
                    disX = e.clientX - odiv.offsetLeft;
                    disY = e.clientY - odiv.offsetTop;
                }
                //这里的拖动事件只能绑定在外层上，否则快速拖动会有问题
                document.addEventListener('mousemove', mouseMoveHandle);
            }
            //------------------------------------鼠标移动事件
            function mouseMoveHandle(e) {
                var offsetX = curClientX - e.clientX;//鼠标与上一次的位置差
                var offsetY = curClientY - e.clientY;
                if (offsetX == 0 && offsetY == 0) return;
                let left = e.clientX - disX;
                let top = e.clientY - disY;
                // 移动当前元素
                if (isFixed) {
                    if (odiv.style.position !== 'fixed') {
                        odiv.style.position = 'fixed';
                    }
                } else {
                    if (odiv.style.position !== 'absolute') {
                        odiv.style.position = 'absolute';
                    }
                }
                odiv.style.left = left + 'px';
                odiv.style.top = top + 'px';
                odiv.style.bottom = "auto";
                odiv.style.right = "auto";
            }

        }
    })
};

export default vDrag