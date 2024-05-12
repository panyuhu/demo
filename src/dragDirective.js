import throttle from 'lodash/throttle'

var winWidth = window.innerWidth
var winHeight = window.innerHeight

export const drag = {
    //1.指令绑定到元素上回立刻执行bind函数，只执行一次
    //2.每个函数中第一个参数永远是el，表示绑定指令的元素，el参数是原生js对象
    //3.通过el.focus()是无法获取焦点的，因为只有插入DOM后才生效
    bind: function (el, target) { },
    //inserted表示一个元素，插入到DOM中会执行inserted函数，只触发一次
    inserted: function (el, config) {
        console.log('================>', config.value.handler)
        let isDragging = false
        el.onmousedown = function () {
            console.log('=====onmousedown======')
            document.ondragstart = function (e) {
                e.preventDefault();
            };
            document.ondragend = function (e) {
                e.preventDefault();
            };
            isDragging = true
        }
        el.onmouseup = function () {
            console.log('=====onmouseup======')
            isDragging = false
        }

        document.onmousemove = throttle(function (e) {
            if (!isDragging) {
                return
            }
            
            const { clientX, clientY, layerX, layerY, offsetX, offsetY, pageX, pageY, screenX, screenY, x, y } = e
            el.style.left = x + 'px';
            el.style.top = y + 'px';
            console.log( `clientX：${clientX}`,`clientY${clientY}`,`layerX${layerX}`,`layerY${layerY}`,`offsetX${offsetX}`,`offsetY${offsetY}`,`pageX${pageX}`,`pageY${pageY}`,`screenX${screenX}`,`screenY${screenY}`,`x${x}`,`y${y}`)
        }, 300)

        document.onmouseup = function (event) {
            isDragging = false
            console.log('%c ==document===onmouseup======', 'color: green; font-size: 24px;')
        }
    }
}