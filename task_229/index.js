window.onload = function(){
    var inputName = document.getElementById("inName");
    var btn = document.getElementsByTagName("button").item(0);
    var info = document.getElementById("info");

    btn.addEventListener('click',function(event){
        var value = inputName.value;
        var valueLen = getLen(value);
        if(value == ""){
            setStyle("姓名不能为空","red")
        }else if(valueLen < 4 || valueLen > 16){
            setStyle("长度为"+valueLen,"red");
        }
        else{
            setStyle("名称格式正确","green");
        }
        event.preventDefault();
    },false);

    function setStyle(text,color){
        info.innerText = text;
        info.style.color = color;
        inputName.style.borderColor = color;
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