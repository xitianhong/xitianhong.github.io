window.onload = function () {
    var oDiv = document.getElementsByTagName('div')[0];
    oDiv.style.height = document.documentElement.clientHeight + 'px';
    var iSpeedX = 0;
    var iSpeedY = 0;
    var timer = null;

    clearInterval(timer);
    timer = setInterval(function () {
        iSpeedY += 3;
        var t = oDiv.offsetTop + iSpeedY;

        if (t > document.documentElement.clientHeight - oDiv.offsetHeight) {
            t = document.documentElement.clientHeight - oDiv.offsetHeight;
            iSpeedY *= -0.6;
        }
        oDiv.style.top = t + 'px';
        if (Math.abs(iSpeedX) < 1)iSpeedX = 0;
        if (Math.abs(iSpeedY) < 1)iSpeedY = 0;
        if (iSpeedX == 0 && iSpeedY == 0 && t == document.documentElement.clientHeight - oDiv.offsetHeight) {
            clearInterval(timer);
        }

    }, 30);

    function rnd(n,m){
        return parseInt(Math.random()*(m-n)+n);
    }

    var oBtn = document.getElementById('btn1');
    var oBtn2 = document.getElementById('btn2');
    var aLi = document.querySelectorAll('#ul1 li');

    //class
    var aClass = [];
    for (var i = 0; i < aLi.length; i++) {
        aClass[i] = aLi[i].className;
        aLi[i].style.backgroundColor='rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')';
    }

    var bReady = true;

    oBtn2.onclick = function () {
        aClass.push(aClass.shift());

        tab();
    };

    oBtn.onclick = function () {
        if (bReady == false)return;
        bReady = false;

        aClass.unshift(aClass.pop());

        tab();

        var oCur = document.querySelector('#ul1 li.cur');
        oCur.addEventListener('transitionend', function () {
            bReady = true;
        }, false);
    };

    function tab() {
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].className = aClass[i];
        }
    }

};
