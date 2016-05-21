window.onload = function(){
    var form = document.forms[0];
    var btn = document.getElementsByTagName("button").item(0);

    var inputPWD = document.getElementById("inPWD");

    EventUtil.addEvent(btn,"click",function(event){
        if(!form.checkValidity()){
            alert("输入有误！")
        }
    })

    var inputName = document.getElementById("inName");
    var nameinfo = document.getElementsByClassName("info").item(0);
    EventUtil.addEvent(inputName,"change",function(event){

        var value = inputName.value;
        var valueLen = getLen(value);
        if(value == ""){
            setStyle("姓名不能为空","red",nameinfo,inputName)
        }else if(valueLen < 4 || valueLen > 16){
            setStyle("长度为"+valueLen,"red",nameinfo,inputName);
        }
        else{
            setStyle("名称格式正确","green",nameinfo,inputName);
        }
        EventUtil.preventDefault(event);
    });

    var inputPWD = document.getElementById("inPWD");
    var pwdInfo = document.getElementsByClassName("info").item(1);
    EventUtil.addEvent(inputPWD,"change",function(event){
        setStyle("密码可用","green",pwdInfo,inputPWD);
        pwdInfo.style.display = "block";
    });

    var inputPWDconfirm = document.getElementById("inPWDconfirm");
    var pwdcnfInfo = document.getElementsByClassName("info").item(2);
    EventUtil.addEvent(inputPWDconfirm,"change",function(event){
        var confirmText = inputPWDconfirm.value;
        var pwdText = inputPWD.value;
        if(confirmText!=pwdText){
            setStyle("两次密码输入不一致","red",pwdcnfInfo,inputPWDconfirm);
        }else{
            setStyle("密码输入一致","green",pwdcnfInfo,inputPWDconfirm);
        }
    });

    var inputMail = document.getElementById("inMail");
    var mailInfo = document.getElementsByClassName("info").item(3);
    EventUtil.addEvent(inputMail,"change",function(event){
        if(inputMail.checkValidity()){

            setStyle("邮箱格式正确","green",mailInfo,inputMail);
        }else{
            setStyle("邮箱格式应为xxx@yyy.zzz","red",mailInfo,inputMail);
        }
        mailInfo.style.display = "block";
    });

    var inputPhone = document.getElementById("inPhone");
    var phoneInfo = document.getElementsByClassName("info").item(4);
    EventUtil.addEvent(inputPhone,"change",function(event){
       if(inputPhone.checkValidity()){

           setStyle("手机格式正确","green",phoneInfo,inputPhone);
       }else{
           setStyle("手机格式应为12345678901","red",phoneInfo,inputPhone);
       }
        phoneInfo.style.display = "block";
    });



    function setStyle(text,color,info,input){
        info.innerText = text;
        info.style.color = color;
        input.style.borderColor = color;
    }
    function getLen(str){
        var len = 0;
        for(var i = 0; i < str.length;i++){
            if(str.charCodeAt(i) > 255){
                len +=2;
            }else{
                len+=1;
            }
        }
        return len;
    }
}



var EventUtil = {
    //添加事件处理程序
    addEvent : function(elem,type,handler){
        if(elem.addEventListener){
            elem.addEventListener(type,handler,false);
        }else if(elem.attachEvent){
            elem.attachEvent("on"+type,handler);
        }else{
            elem["on"+type] = handler;
        }
    },

    //移除事件处理程序
    removeEvent :function(elem,type,handler) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handler, false);
        } else if (elem.attachEvent) {
            elem.detachEvent("on" + type, handler);
        } else {
            elem["on" + type] = null;
        }
    },

    //获取事件对象
    getEvent : function(event){
        return event? event : window.event;
    },

    //获取事件目标对象
    getTarget : function(event){
        return event.target ? event.target : window.event.srcElement;
    },

    //取消默认动作
    preventDefault : function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
        return false;
    },

    //取消事件冒泡
    stopPropagation : function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    },

    //获取相关对象
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
    }
};