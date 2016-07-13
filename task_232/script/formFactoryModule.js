//表单工厂，将数据工厂传来的序列化数据转换为DOM并利用表单验证工厂的单例收集页面上存在的所有表单数据
function FormFactory(serializedData,prePanel){
    this.data = serializedData;
    this.prePanel = prePanel;
    this.formValidationModel = new FormValidation();
}
FormFactory.prototype = {
    constructor: FormFactory,

    addForm : function(){

        if(this.data == null){

            return;
        }
        switch (this.data.type) {
            case 'text':
                this.addInputForm(this.data);
                break;
            case 'textarea':
                this.addTextarea(this.data);
                break;
            case 'radio':
                this.addRadioForm(this.data);
                break;
            case 'checkbox':
                this.addCheckbox(this.data);
                break;
            case 'select':
                this.addSelectForm(this.data);
                break;
        }

    },

    addInputForm : function(data){
        var label = this.createLabel(data);
        var div = this.createInput();

        var input = document.createElement('input');
        input.id = label.getAttribute('for');
        input.name = data.label;
        input.type = data.validate;

        if(data.must){
            input.required = true;
        }else{
            input.required = false;
        }

        div.appendChild(input);
        var addInfo = this.addInfo(data);
        div.appendChild(addInfo);
        this.addToPanel(label, div,data);
    },

    addTextarea : function(data){
        var label = this.createLabel(data);
        var div = this.createInput();

        var textarea = document.createElement('textarea');
        textarea.id = label.getAttribute('for');
        textarea.name = data.label;


        if(data.must){
            textarea.required = true;
        }else{
            textarea.required = false;
        }
        div.appendChild(textarea);
        var addInfo = this.addInfo(data);
        div.appendChild(addInfo);
        this.addToPanel(label, div,data);
    },

    addRadioForm : function(data){
        var label = this.createLabel(data);
        var div = this.createInput();
        div.id = label.getAttribute('for');
        data.options.forEach(function(item, idx, arr){
            var radioLabel = document.createElement('label');
            radioLabel.innerHTML = '<input type="radio" name="' + data.label +'" value="' + item + '">' + item;
            div.appendChild(radioLabel);
        });
        var addInfo = this.addInfo(data);
        div.appendChild(addInfo);
        this.addToPanel(label, div,data);
    },

    addCheckbox : function(data){
        var label = this.createLabel(data);
        var div = this.createInput();
        div.id = label.getAttribute('for');
        data.options.forEach(function(item, idx, arr){
            var checkboxLabel = document.createElement('label');
            checkboxLabel.innerHTML = '<input type="checkbox" name="' + data.label +'" value="' + item + '">' + item;
            div.appendChild(checkboxLabel);
        });
        var addInfo = this.addInfo(data);
        div.appendChild(addInfo);
        this.addToPanel(label, div,data);
    },

    addSelectForm : function(data){
        var label = this.createLabel(data);
        var div = this.createInput();

        var select = document.createElement('select');
        select.id = label.getAttribute('for');
        select.name = data.label;


        data.options.forEach(function(item, idx, arr){
            var option = document.createElement('option');
            option.value = item;
            option.innerHTML = item;
            select.appendChild(option);
        });
        div.appendChild(select);
        var addInfo = this.addInfo(data);
        div.appendChild(addInfo);
        this.addToPanel(label, div,data);
    },

    //在添加到DOM上前，添加删除键并添加删除事件
    //将该表单数据添加到表单验证数据工厂单例中的总dataset中
    addToPanel :function(label, input,data){
        var delBtn = this.addDelBtn(label,label.getAttribute('for'));
        input.appendChild(delBtn);

        var container = document.createElement('div');
        container.classList.add('form-control');
        container.appendChild(label);
        container.appendChild(input);

        this.prePanel.insertBefore(container,this.prePanel.lastElementChild);
        this.formValidationModel.addData(label.getAttribute('for'),data,container);
        var that = this;

        var parentCtr = delBtn.parentElement;
        while(!parentCtr.classList.contains('form-control')){
            parentCtr = parentCtr.parentElement;
        }
        EventUtil.addEvent(delBtn,'click',function(event){
            [].forEach.call(parentCtr.childNodes,function(item){ parentCtr. removeChild(item);});
            parentCtr.parentNode.removeChild(parentCtr);
            delete that.formValidationModel.dataset[label.getAttribute('for')];
        });
    },

    createLabel : function(data){
        var tid = new Date();
        tid = tid.valueOf();
        var label = document.createElement('label');
        label.setAttribute('for',tid);
        label.classList.add('formCtr-label');
        label.innerHTML = data.label;
        return label;
    },

    createInput : function() {
        var div = document.createElement('div');
        div.classList.add('formCtr-input');
        return div;
    },
    
    //额外提示框的创建
    addInfo : function(data){
        var infoP = document.createElement('p');
        infoP.classList.add('addInfo');
        infoP.classList.add('info-normal');
        var must = this.data.must;
        if(data.must){
            infoP.innerHTML = '必填';
        }else{
            infoP.innerHTML = '选填'
        }

        if(data.type == 'text' || data.type == 'textarea'){
            infoP.innerHTML += '，字符长度为'+ data.minLen + "-"+ data.maxLen;
        }
        return infoP;
    },

    addDelBtn : function(label,tid){
        var delBtn = document.createElement('div');
        delBtn.innerHTML = '删除';
        delBtn.classList.add('delBtn');
        return delBtn;


    },
    getValidatedSet : function(){
        return this.formValidationModel.dataset;
    }

}