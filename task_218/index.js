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
    var input = document.getElementById('list-input');
    var leftin = document.getElementById('left-in');
    var leftout = document.getElementById('left-out');
    var rightin = document.getElementById('right-in');
    var rightout = document.getElementById('right-out');
    var nolist = document.getElementById('numbers');

    var Ctr = (function (input) {
        var numbers = [];
        return {
            leftIn: function () {
                var value = input.value;
                var newLi = document.createElement("li");
                newLi.innerHTML = value;
                numbers.unshift(value);
                if (nolist.firstElementChild) {
                    nolist.insertBefore(newLi,nolist.firstElementChild);

                } else {
                    nolist.appendChild(newLi);
                }
            }
        ,
            leftOut: function () {
                if (nolist.firstElementChild && numbers.length != 0) {
                    nolist.removeChild(nolist.firstElementChild);
                    var val = numbers.shift();
                    alert(val);
                } else {
                    alert("Please insert a number into the queue first");
                }
            }
        ,
            rightIn: function () {
                var value = input.value;
                var newLi = document.createElement("li");
                newLi.innerHTML = value;
                numbers.push(value);
                nolist.appendChild(newLi);

            }
        ,
            rightOut: function () {
                if (nolist.firstElementChild && numbers.length != 0) {
                    nolist.removeChild(nolist.lastElementChild);
                    var val = numbers.pop();
                    alert(val);
                } else {
                    alert("Please insert a number into the queue first");
                }
            }
        ,
            remove: function (ele) {
                var clickIndex = [].indexOf(ele.parentElement.children, ele, 0);
                numbers.splice(clickIndex,1);
                nolist.removeChild(ele);
            }
        };

    })(input);


    EventUtil.addEvent(leftin,'click',check);
    EventUtil.addEvent(leftout,'click',Ctr.leftOut);
    EventUtil.addEvent(rightin,'click',check);
    EventUtil.addEvent(rightout,'click',Ctr.rightOut);
    EventUtil.addEvent(nolist,'click',function(event){
        var target = EventUtil.getTarget(event);
        Ctr.remove(target);
    });

    function check(event){
        var pattern = /^\d+$/;
        var value = input.value;
        var targetName = EventUtil.getTarget(event).id;
        if(pattern.test(value)){
            switch (targetName){
                case 'left-in':
                    Ctr.leftIn();
                    break;
                case 'right-in':
                    Ctr.rightIn();
                    break;

            }
        }else{
            alert('Please enter an integer');
        }
    }
}