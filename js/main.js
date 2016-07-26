"use strict";
document.addEventListener("DOMContentLoaded", function() {
	var oHd = document.querySelector("header");
	var oSimShow = document.querySelector(".sim-show");
	var oMe = document.querySelector(".me");
	var oSha = oMe.querySelector(".shadow");
	var oOther = document.querySelector(".others");
	var oFace = document.querySelector(".face");
	var timer=null;
	var oDiv=document.getElementById('box');
	var oWrap=document.querySelector('.wrap');
	var oBan=document.getElementById('baner');
	var aHead=oBan.children;
	var n=0;
	var ready=true;
	var oTime=document.querySelector('.time');
	oFace.onmouseover=function(){
		clearInterval(timer)
		//alert(1)
		oFace.style.WebkitTransition='1s all ease'
		oFace.style.msTransition='1s all ease'
		oFace.style.MozTransition='1s all ease';
		oFace.style.transition='1s all ease'
		oFace.style.WebkitTransform='perspective(800px) rotateX(45deg)';
		oFace.style.msTransform='perspective(800px) rotateX(45deg)';
		oFace.style.MozTransform='perspective(800px) rotateX(45deg)';
		oFace.style.transform='perspective(800px) rotateX(45deg)';
	}
	
	oFace.onmouseout=function(){
		oFace.style.WebkitTransition='none';
		oFace.style.msTransition='none';
		oFace.style.MozTransition='none';
		oFace.style.Transition='none';
		var dis=45;
		/*var a=oFace.style.WebkitTransform
		console.log(oFace.style.WebkitTransform)
		var dis=0
		a.replace(/\d+deg/,function(s){ dis=s;})
		dis=parseInt(dis)*/
		console.log(oFace.style.WebkitTransform)
		var speed=0;
		
		timer=setInterval(function(){
			
				speed=speed+(0-dis)/3;
				speed *= .9
				dis=dis+speed;
				if(Math.abs(dis)<0.1)dis=0;
				oFace.style.WebkitTransform='perspective(800px) rotateX('+dis+'deg)'
				oFace.style.msTransform='perspective(800px) rotateX('+dis+'deg)';
				oFace.style.MozTransform='perspective(800px) rotateX('+dis+'deg)';
				oFace.style.transform='perspective(800px) rotateX('+dis+'deg)'
				if(dis==0){
					clearInterval(timer);	
				}
		},30)
		
	}
	//切换banner
	for(var i=0;i<aHead.length;i++){
		aHead[i].index=i;
		
		aHead[i].onclick=function(){
			n=-this.index;
			//alert(n)
			move(oWrap,{left:-this.index*oHd.offsetWidth},{time:1000})
			
		}
	}
	wheel(document,function(down){
		if(!ready)return;
		ready=false;
		
		if(down){
			n--;
			if(n<-3)n=-3;
			move(oWrap,{left:n*oHd.offsetWidth},{time:1000,fn:function(){ready=true;}})
		}else{
			n++
			if(n>0)n=0;	
			move(oWrap,{left:n*oHd.offsetWidth},{time:1000,fn:function(){ready=true;}})
		}
	})
	
	
	//nav时间
	function time(){
		var oDate=new Date();
		var oH=oDate.getHours();
		var oM=oDate.getMinutes();
		var oS=oDate.getSeconds();
		var str=addZero(oH)+':'+addZero(oM)+':'+addZero(oS);
		oTime.children[0].innerHTML=str;
		function addZero(n){
			return n<10?'0'+n:''+n;	
		}
	}
	setInterval(function(){
		time()
	},1000)
	time()
	
	
	
	
	
	
	
	
	
	
	setSize()
	function setSize(){
		oMe.style.width = oSimShow.style.width = oHd.style.width = document.documentElement.clientWidth + "px";
		oMe.style.height = oSimShow.style.height = oHd.style.height = document.documentElement.clientHeight + "px";
		oHd.style.backgroundSize = 'cover'
		oOther.style.width = document.documentElement.clientWidth + "px";
		oOther.style.height = document.documentElement.clientHeight + "px";
		oOther.style.backgroundSize = oOther.style.backgroundSize = 'cover'
		oMe.style.backgroundSize = 'cover'
		//alert(oWrap)
		oWrap.style.width=4*oMe.offsetWidth+'px'
		//console.log(document.documentElement.clientHeight)	
	}
	window.onresize = window.onscroll = function() {
		setSize()
		//alert(1)
		
	};
	(function() {
		var oUl = oMe.getElementsByTagName("ul")[0];
		var oOl = oMe.getElementsByTagName("ol")[0];
		var aLi = oUl.children;
		var aBtn = oOl.children;
		for (var i = 0; i < aBtn.length; i++) {
			(function(index) {
				aBtn[i].onmouseover = function() {
					for (var i = 0; i < aBtn.length; i++) {
						aBtn[i].className = "";
						aLi[i].style.opacity = 0
					}
					aBtn[index].className = "on";
					aLi[index].style.opacity = 1
				}
			})(i)
		}
	})()
}, false);

//---------------------封装函数
function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
}

function move(obj,json,optional){
	var optional=optional||{};
 	optional.time=optional.time||300;
	optional.type=optional.type||'ease-out';
	optional.fn=optional.fn||null;
	var count=Math.round(optional.time/30);
	var n=0;
	var dis={};
	var start={}
	for(var key in json){
		start[key]=parseFloat(getStyle(obj,key));
		dis[key]=json[key]-start[key];	
	}
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++
		for(var key in dis){
			switch(optional.type){
				case 'linear':
					var a=n/count;
					var cur=start[key]+dis[key]*a;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[key]+dis[key]*a*a*a;
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[key]+dis[key]*(1-a*a*a);
					break;
			}
			if(key=='opacity'){
				obj.style.opacity=cur;
				obj.style.filler='alpha(opacity:'+cur+')';
			}else{
				obj.style[key]=cur+'px';	
			}
		}
		if(n==count){
			clearInterval(obj.timer);
			optional.fn&&optional.fn();	
		}
	},30)
}


function wheel(obj,fn){
	//
	var firefox=window.navigator.userAgent.toLowerCase().indexOf('firefox');
	if(firefox!=-1){
		obj.addEventListener('DOMMouseScroll',fnWheel,false)	
	}else{
		obj.onmousewheel=fnWheel
			
	}
	function fnWheel(ev){
		var evt=ev||event;
		var down=false;
		if(evt.wheelDelta){
			//谷歌
		down=evt.wheelDelta<0?true:false;	
		}else if(evt.detail){
			down=evt.detail>0?true:false;	
		}
		fn(down)
		if(evt.preventDefault)evt.preventDefault();
		return false;
	}
}




















