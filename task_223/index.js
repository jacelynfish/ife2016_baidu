EventUtil = {

    addEvent : function(elem,type,handler){
        if(elem.addEventListener){
            elem.addEventListener(type,handler,false);
        }else if(elem.attachEvent){
            elem.attachEvent("on"+type,handler);
        }else{
            elem["on"+type] = handler;
        }
    },

    removeEvent :function(elem,type,handler) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handler, false);
        } else if (elem.attachEvent) {
            elem.detachEvent("on" + type, handler);
        } else {
            elem["on" + type] = null;
        }
    },

    getTarget : function(event){
        return event.target ? event.target : window.event.srcElement;
    }
};

$ = function(el) { return document.querySelector(el);};
$$ = function(el) { return document.querySelectorAll(el);};
var queue = [],rootN,btns,queueCnt = 0,timer = null,preFound = null;

//DFS for frontRun
function frontRun(curN){
    queue.push(curN);
    if(curN.childElementCount == 0){
        return;
    }else{
        curN = curN.firstElementChild;

        while(curN!=null && curN.nodeName.toLowerCase() != 'div'){
            curN = curN.nextElementSibling;
        }
        while(curN != undefined){

            frontRun(curN);
            curN = curN.nextElementSibling;
            while(curN!=null && curN.nodeName.toLowerCase() != 'div'){
                curN = curN.nextElementSibling;
            }
        }
    }
}

function animation(){
    var qvalue = $('#query').value;
    if(preFound){
        preFound.style.backgroundColor = 'white';
        preFound = null;
    }

    timer = setInterval(function(){
        if(queueCnt < queue.length){
            if(queueCnt > 0){
                queue[queueCnt - 1].classList.remove('active');
            }

            queue[queueCnt].classList.add('active');

            var span = queue[queueCnt].getElementsByTagName('span')[0];
            var cvalue = span == undefined? null:span.innerHTML;
            if(qvalue == cvalue && qvalue!=''){
                clearInterval(timer);
                timer = null;
                queue[queueCnt].style.backgroundColor = 'yellow';
                $('#query').value='';
                preFound = queue[queueCnt];
                queueCnt = 0;
                [].forEach.call(btns,function(item,idx,arr){ item.disabled = false;});
            }

            queueCnt++;
        }else{
            clearInterval(timer);
            timer = null;
            queue[queueCnt - 1].classList.remove('active');
            queueCnt = 0;
            [].forEach.call(btns,function(item,idx,arr){ item.disabled = false;});
        }
    },500)
}

window.onload = function(){
    rootN = $('#root');
    btns = $$('button');
    EventUtil.addEvent($('#front'),'click',deal);

    EventUtil.addEvent($('#queryBtn'),'click',deal);
}
function deal(event){


    queue = [];
    [].forEach.call(btns,function(item,idx,arr){ item.disabled = true;});
    var target = EventUtil.getTarget(event);
    var tid = target.id;

    frontRun(rootN);
    console.log(queue.length);
    animation();


}