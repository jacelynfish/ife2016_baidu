var EventUtil = {

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

    getEvent : function(event){
        return event? event : window.event;
    },


    getTarget : function(event){
        return event.target ? event.target : window.event.srcElement;
    },

    preventDefault : function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
        return false;
    },


    stopPropagation : function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    },


    getRelatedTarget : function(event){
        if(event.relatedTarget){
            return event.relatedTarget;
        }else if(event.toElement){
            return event.toElement;
        }else if(event.fromElement){
            return event.fromElement;
        }else{
            return null;
        }
    },

    getCharCode : function(event){
        if(typeof event.charCode == "number"){
            return event.charCode;
        }else{
            return evnet.keyCode;
        }
    }
};

EventUtil.addEvent(window,"load",function(){

    var inschoolItem = document.getElementById('inschool');
    var outschoolItem = document.getElementById('outschool');
    var univ = document.getElementById('univ');
    var cop = document.getElementById('work');

    EventUtil.addEvent(inschoolItem,'change',checkedHandler);
    EventUtil.addEvent(outschoolItem,'change',checkedHandler);
    function checkedHandler(event) {
        var event = EventUtil.getEvent(event);
        var item = EventUtil.getTarget(event);

        if (item.checked == true) {

            if (item.id == 'inschool') {
                univ.style.display = "block";
                cop.style.display = "none";
            } else if (item.id == "outschool") {
                cop.style.display = "block";
                univ.style.display = "none";
            }

        }
    }

    var univOptions = document.getElementById('school_id').options;
    var city = document.getElementById('city_id');
    EventUtil.addEvent(city,'change',function(){
        var selectIdx = city.selectedIndex;
        switch(selectIdx){
            case 1:
                univOptions[0].innerHTML = '复旦大学';
                univOptions[0].value = 'fdu';
                univOptions[1].innerHTML = '同济大学';
                univOptions[1].value = 'tju';
                univOptions[2].innerHTML = '上海交通大学';
                univOptions[2].value = 'sju';
                break;
            case 2:
                univOptions[0].innerHTML = '浙江大学';
                univOptions[0].value = 'zju';
                univOptions[1].innerHTML = '杭州电子科技大学';
                univOptions[1].value = 'hdu';
                univOptions[2].innerHTML = '浙江工业大学';
                univOptions[2].value = 'zgu';
                break;
            case 0:default:break;
        }
    })

})



