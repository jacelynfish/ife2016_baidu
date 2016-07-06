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
    getTarget : function(event){
        return event.target ? event.target : window.event.srcElement;
    }
};



window.onload = function() {
    $ = function (el) { return document.querySelector(el); };
    $$ = function(el) { return document.getElementsByTagName(el);};
    var input = $('#list-input');
    var tagInput = $("#tag-input");
    var nolist = $('#numbers');
    var qinput = $('#query');

    var Ctr = (function (input) {
        var numbers = [];
        function process(value){
            var vals = value.split(/[^A-Za-z0-9\u4e00-\u9fa5]+/g);
            return vals.filter(function(item, index, arr){ return (item != '')});
        }
        return {
            count: function(){
                return numbers.length;
            },
            leftIn: function (values) {
                if(numbers.length > 10){
                    numbers.shift();
                }
                if(values instanceof Array){
                    var values = process(input.value);
                    [].unshift.apply(numbers, values);
                }else{
                    numbers.unshift(values);
                }

            }
        ,
            leftOut: function () {
                if (nolist.firstElementChild && numbers.length != 0) {
                    nolist.removeChild(nolist.firstElementChild);
                    var val = numbers.shift();
                    alert(val);
                } else {
                    alert("Please insert a item into the queue first");
                }
            }
        ,
            rightIn: function (values) {
                if(numbers.length > 10){
                    numbers.shift();
                }
                if(values instanceof Array){
                    var values = process(input.value);
                    [].push.apply(numbers, values);
                }else{
                    numbers.push(values);
                }

            }
        ,
            rightOut: function () {
                if (nolist.firstElementChild && numbers.length != 0) {
                    nolist.removeChild(nolist.lastElementChild);
                    var val = numbers.pop();
                    alert(val);
                } else {
                    alert("Please insert an item number into the queue first");
                }
            }
        ,
            remove: function (ele) {
                var clickIndex = [].indexOf(ele.parentElement.children, ele, 0);
                numbers.splice(clickIndex,1);
                nolist.removeChild(ele);
            },
            render: function(){
                nolist.innerHTML = "";
                for(var i = 0; i < numbers.length; i++){
                    var newLi = document.createElement('li');
                    newLi.innerHTML = numbers[i];
                    nolist.appendChild(newLi);
                }
            },
            empty: function(){
                nolist.innerHTML = "";
            },
            get: function(i){
                return numbers[i];
            },
            getNum : function(){
                return numbers;
            }
        };

    })(input);

    var lis = $$('li');

    EventUtil.addEvent(tagInput,'keyup',function(event){
        var tagV = tagInput.value;
        var pattern = /[\ \,\，]$/;
        if(event.keyCode == 13 || pattern.test(tagV.slice(tagV.lastIndex))){
            Ctr.leftIn(tagV.substring(0,tagV.length-1));
            Ctr.render();
            tagInput.value = "";
        }
    })
    EventUtil.addEvent($('#left-in'),'click',handler);
    EventUtil.addEvent($('#left-out'),'click',Ctr.leftOut);
    EventUtil.addEvent($('#right-in'),'click',handler);
    EventUtil.addEvent($('#right-out'),'click',Ctr.rightOut);
    EventUtil.addEvent($('#empty'),'click',Ctr.empty);
    EventUtil.addEvent(nolist,'click',function(event){
        var target = EventUtil.getTarget(event);
        Ctr.remove(target);
    });
    EventUtil.addEvent(nolist,'mouseover',function(event){
        var target =EventUtil.getTarget(event);
        if(target.nodeName.toLowerCase() == 'li'){
            target.innerHTML = "点击删除"+ target.innerHTML;
            target.style.backgroundColor = 'red';
        }

    });
    EventUtil.addEvent(nolist,'mouseout',function(event){
        var target = EventUtil.getTarget(event);
        if(target.nodeName.toLowerCase() == 'li'){
            var lis = $$('li');
            var idx = [].indexOf.call(lis,target);
            target.innerHTML = Ctr.get(idx);
            target.style.backgroundColor = 'yellow';
        }

    });
    EventUtil.addEvent($('#queryBtn'),'click',function(event){

        var lis = $$('li');

        var qValue = qinput.value;
        [].forEach.call(lis,function(item){
            var newS = item.innerHTML.replace(new RegExp(qValue,'g'),'<span>'+qValue+'</span>');
            item.innerHTML = newS;

        })

    });

    function handler(event){
        var targetName = EventUtil.getTarget(event).id;

            switch (targetName) {
                case 'left-in':
                    Ctr.leftIn();
                    break;
                case 'right-in':
                    Ctr.rightIn();
                    break;
            }
        Ctr.render();
    }


}