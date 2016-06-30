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

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var dataCnt = 0;
var city, value, table;
var cityPattern = /^[A-Za-z\u4e00-\u9eff\s]+$/i;
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {

    var cityV = city.value.trim();
     var valueV = value.value.trim();
    console.log(isNaN(parseInt(valueV,10)));
    var isCityValid = true, isValueValid = true;
    var alertValue = '';
    if(!cityPattern.test(cityV)){
        isCityValid = false;
        alertValue += '城市名必须是中文或英文字母！\n';
    }
    if(isNaN(parseInt(valueV,10)) || parseFloat(valueV) != parseInt(valueV,10)){
        isValueValid = false;
        alertValue += '空气质量指数必须是整数！';
    }
    if(!isCityValid || !isValueValid){
        alert(alertValue);
    }else{
        aqiData[cityV] = valueV;
        dataCnt++;
    }


}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    if(dataCnt != 0){
        var header = '<td>城市</td><td>空气质量</td><td>操作</td>';
        table.innerHTML = header;
        for(var data in aqiData){

            table.innerHTML += '<tr><td>'+data+'</td><td>'+aqiData[data]+'</td><td><button>删除</button></td></tr>';

        }
    }


}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
    // do sth.
    console.log(target.parentNode);
    dataCnt--;
    var delCity = target.parentNode.parentNode.firstElementChild.innerHTML;
    console.log(delCity);
    delete aqiData[delCity];
    if(dataCnt == 0){
        table.innerHTML = "";
    }else{
        renderAqiList();
    }
}

function init() {

    table = document.getElementById('aqi-table');
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var btn = document.getElementById('add-btn');
    EventUtil.addEvent(btn, 'click',addBtnHandle);
    EventUtil.addEvent(table,'click',function(event){
        var delBtn = event.target;
        if(delBtn.nodeName.toLowerCase() == 'button'){
            delBtnHandle(delBtn);
        }
    })


}
window.onload = function(){
    city = document.getElementById('city');
    value = document.getElementById('value');
    init();
}

