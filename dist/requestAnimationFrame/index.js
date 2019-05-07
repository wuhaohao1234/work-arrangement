const wrap = document.getElementById('wrap');
let done = 0;
function addItems() {
    let li = null;
    let fg = document.createDocumentFragment();
    for (let i = 0; i < 100; i++) {
        li = document.createElement('li');
        li.innerText = `第 ${i} 个数据 , 渲染${done} 次`;
        fg.appendChild(li);
    }
    wrap.appendChild(fg);
    done++;
    if (done < 100) {
        requestAnimationFrame(addItems);
    }
}
requestAnimationFrame(addItems);
//# sourceMappingURL=index.js.map