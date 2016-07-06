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
    var addRan = document.getElementById('addRan');
    var sortBtn = document.getElementById('sort');
    var empBtn = document.getElementById('empty');
    var Ctr = (function (input) {
        var numbers = [];
        return {
            getNum : function(){
                return numbers;
            },
            count : function(){
                return numbers.length;
            }
            ,

            leftIn: function () {
                var value = input.value;
                var newLi = document.createElement("li");
                newLi.style.height = value*2 + 'px';
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
                newLi.style.height = value + 'px';
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
            ,
            empty: function(){
                nolist.innerHTML = "";
            },
            render: function(){
                nolist.innerHTML = "";
                for(var i = 0; i < numbers.length; i++){
                    var newLi = document.createElement('li');
                    newLi.style.height = numbers[i]*2 + 'px';
                    nolist.appendChild(newLi);
                }
            },
            addRan : function(){

                numbers.length = 0;
                for(var i = 0; i < 10;i++){
                    numbers[i] = Math.floor(Math.random()*91 + 10);
                }

            }
        };

    })(input);


    EventUtil.addEvent(leftin,'click',check);
    EventUtil.addEvent(leftout,'click',Ctr.leftOut);
    EventUtil.addEvent(rightin,'click',check);
    EventUtil.addEvent(rightout,'click',Ctr.rightOut);
    EventUtil.addEvent(addRan,'click',function(){
        Ctr.addRan();
        Ctr.render();
    });
    EventUtil.addEvent(sortBtn,'click',sort);
    EventUtil.addEvent(empBtn,'click',Ctr.empty);
    EventUtil.addEvent(nolist,'click',function(event){
        var target = EventUtil.getTarget(event);
        Ctr.remove(target);
    });


    function check(event){
        if(Ctr.count() >= 60){
            alert('the queue is full');
            return;
        }
        var pattern = /^\d+$/;
        var value = input.value;
        var targetName = EventUtil.getTarget(event).id;
        if(pattern.test(value) && value <= 100 && value >= 10){
            switch (targetName){
                case 'left-in':
                    Ctr.leftIn();
                    break;
                case 'right-in':
                    Ctr.rightIn();
                    break;

            }
        }else{
            alert('Please enter an integer between 10 to 100');
        }
    }

    function sort(){
        console.log('hi');
        var i = 0, j = 1, timer;
        var arr = Ctr.getNum();
        timer = setInterval(sorting,10);
        function sorting(){
            console.log(i);
            console.log(Ctr.count());
            if(i < Ctr.count()){
                if(j < Ctr.count()){
                    if(arr[i] > arr[j]){
                        exch(arr, i, j);
                    }
                    j++;
                }else{
                    i++;
                    j= i+1;
                }
            }else{
                clearInterval(timer);
                return;
            }
        }
    }

    function exch(a, i, j){
        console.log(i);
        var temp = a[i];
        a[i] = a[j];
        a[j] = temp;
        Ctr.render();
    }
}