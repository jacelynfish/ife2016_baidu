
EventUtil = {

    addEvent: function (elem, type, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(type, handler, false);
        } else if (elem.attachEvent) {
            elem.attachEvent("on" + type, handler);
        } else {
            elem["on" + type] = handler;
        }
    },

    removeEvent: function (elem, type, handler) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handler, false);
        } else if (elem.attachEvent) {
            elem.detachEvent("on" + type, handler);
        } else {
            elem["on" + type] = null;
        }
    },

    getTarget: function (event) {
        return event.target ? event.target : window.event.srcElement;
    },

    preventDefault : function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
        return false;
    }
};
$ = function (el) {
    return document.querySelector(el);
};
$$ = function(el) {
    return document.querySelectorAll(el);
}

window.onload = function(){
    
    var prePanel = $("#final-pre");

    //初始化表单选项模块的功能
    var panel = $("#options-panel");
    var input = $('#options-input');
    var tagUtil = new TagUtil(panel, input);
    tagUtil.moduleInit();

    //获取表单设置区的每歌模块
    var dataModule = {
        type : $("#form-type"),
        setting: $("#form-setting"),
        length: $("#form-length"),
        validate:$("#form-validate"),
        options:$("#form-options"),
        addBtn:$("#addBtn")
    };

    //处理不同表单选项时设置模块的不同呈现
    var moduleSelect = $('#form-type-select');
    EventUtil.addEvent(moduleSelect,'change',showModuleHandler);

    function showModuleHandler(event){

        clearModules();
        var selectedOption = moduleSelect.selectedOptions[0];
        var soValue = selectedOption.value;
        switch (soValue){
            case 'text':
                showModules('length');
                showModules('validate');
                break;
            case 'textarea':
                showModules('length');
                break;
            case 'radio':
                showModules('options');
                break;
            case 'checkbox':
                showModules('options');
                break;
            case 'select':
                showModules('options');
                break;
        }

    }
    function showModules(name){
        dataModule[name].style.display = 'block';
    }
    function clearModules(){
        for(var dm in dataModule){
            if(dm == 'type' || dm == 'setting' || dm == 'addBtn'){
                continue;
            }
            dataModule[dm].style.display = 'none';
        }
    }

    //当点击添加表单时，传入数据工厂处理序列化表单信息
    //然后传入表单工厂生成表单
    EventUtil.addEvent(dataModule.addBtn,'click', addHandler);
    var formFactory;
    function addHandler(event){

        var dataTemplate = {
            type : $("#form-type-select"),
            label : $("#form-name"),
            must: $$(".setting"),
            minLen : $("#minCnt"),
            maxLen : $("#maxCnt"),
            validate : $("#form-validate-select"),
            options: tagUtil.getOptionsData()
        }

        var dataFactory = new DataFactory(dataTemplate);
        dataFactory.dataSerialization();
        var data = dataFactory.getData();
        formFactory = new FormFactory(data, prePanel);
        formFactory.addForm();
        EventUtil.preventDefault(event);
    }

    //表单展示区表单提交时，radio和checkbox的额外验证
    var submitBtn = $('#form-submit');
    EventUtil.addEvent(submitBtn,'click',function(event){

        var allData = formFactory.getValidatedSet();

        for(var data in allData){
            console.log(allData[data]);
            if(allData[data].type != 'text' && allData[data].type != 'textarea' && allData[data].type != 'select' && allData[data].must == true){
                //循环由表单验证工厂产生的总表单数据，每一项只要是radio或checkbox并且是must为true时（必填）就检测是否已经选择了某项
                var someChecked = false;
                var options = document.getElementById(allData[data].tid).getElementsByTagName('input');
                [].forEach.call(options,function(item,idx,arr){
                    if(someChecked){
                        someChecked = true;
                    }else{
                        someChecked = item.checked;
                    }
                });
                console.log(someChecked);
                if(!someChecked){
                    EventUtil.preventDefault(event);
                    alert(allData[data].label + '项为必选，请至少选择一项！');
                }
            }
        }
        $('#datapre').innerHTML = JSON.parse(allData);
    })

    //点击修改标题组件
    var precap = $('#pre-cap');
    var modify_input = $('#pre-cap-modify');
    EventUtil.addEvent(precap,'click',function(event){
        precap.style.display = 'none';
        modify_input.style.display = 'block';
        modify_input.focus();

    });
    EventUtil.addEvent(modify_input,'blur',function(event){
        var value = EventUtil.getTarget(event).value;
        if(value!=''){
            precap.innerHTML = value;
        }

        precap.style.display = 'block';
        modify_input.style.display = 'none';

    });
}
