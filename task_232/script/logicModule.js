
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
    
    var panel = $("#options-panel");
    var input = $('#options-input');
    var tagUtil = new TagUtil(panel, input);
    tagUtil.moduleInit();

    var dataModule = {
        type : $("#form-type"),
        setting: $("#form-setting"),
        length: $("#form-length"),
        validate:$("#form-validate"),
        options:$("#form-options"),
        addBtn:$("#addBtn")
    };


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

    EventUtil.addEvent(dataModule.addBtn,'click', addHandler);

    function addHandler(event){
        EventUtil.preventDefault(event);
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
        var formFactory = new FormFactory(data, prePanel);
        formFactory.addForm();

    }

    var precap = $('#pre-cap');
    var modify_input = $('#pre-cap-modify');
    EventUtil.addEvent(precap,'click',function(event){
        console.log('click');

            precap.style.display = 'none';
            modify_input.style.display = 'block';

    });
    EventUtil.addEvent(modify_input,'change',function(event){
        var value = EventUtil.getTarget(event).value;
        precap.innerHTML = value;
        precap.style.display = 'block';
        modify_input.style.display = 'none';

    });
}
