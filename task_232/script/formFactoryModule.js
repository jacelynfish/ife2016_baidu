function FormFactory(serializedData,prePanel){
    this.data = serializedData;
    this.prePanel = prePanel;
}
FormFactory.prototype = {
    constructor: FormFactory,

    addForm : function(){
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
        var tid = new Date();
        tid = tid.getMilliseconds();
        var label = document.createElement('label');
        label.setAttribute('for',tid);
        label.classList.add('formCtr-label');
        label.innerHTML = data.label;

        var input = document.createElement('input');
        input.id = tid;
        input.name = data.label;
        input.classList.add('formCtr-input');
        input.type = data.validate;
        if(data.must){
            input.required = true;
        }else{
            input.required = false;
        }
        
        this.addToPanel(label, input);
    },

    addTextarea : function(data){
        var tid = new Date();
        tid = tid.getMilliseconds();
        var label = document.createElement('label');
        label.setAttribute('for',tid);
        label.classList.add('formCtr-label');
        label.innerHTML = data.label;

        var textarea = document.createElement('textarea');
        textarea.id = tid;
        textarea.name = data.label;
        textarea.classList.add('formCtr-input');

        if(data.must){
            textarea.required = true;
        }else{
            textarea.required = false;
        }
        
        this.addToPanel(label, textarea);
    },

    addRadioForm : function(data){
        var tid = new Date();
        tid = tid.getMilliseconds();
        var label = document.createElement('label');
        label.setAttribute('for',tid);
        label.classList.add('formCtr-label');
        label.innerHTML = data.label;

        var div = document.createElement('div');
        div.id = tid;
        div.classList.add('formCtr-input');

        data.options.forEach(function(item, idx, arr){
            var radioLabel = document.createElement('label');
            radioLabel.innerHTML = '<input type="radio" name="' + data.label +'" value="' + item + '">' + item;
            div.appendChild(radioLabel);
        });
        this.addToPanel(label, div);
    },

    addCheckbox : function(data){
        var tid = new Date();
        tid = tid.getMilliseconds();
        var label = document.createElement('label');
        label.setAttribute('for',tid);
        label.classList.add('formCtr-label');
        label.innerHTML = data.label;

        var div = document.createElement('div');
        div.id = tid;
        div.classList.add('formCtr-input');

        data.options.forEach(function(item, idx, arr){
            var checkboxLabel = document.createElement('label');
            checkboxLabel.innerHTML = '<input type="checkbox" name="' + data.label +'" value="' + item + '">' + item;
            div.appendChild(checkboxLabel);
        });
        this.addToPanel(label, div);
    },

    addSelectForm : function(data){
        var tid = new Date();
        tid = tid.getMilliseconds();
        var label = document.createElement('label');
        label.setAttribute('for',tid);
        label.classList.add('formCtr-label');
        label.innerHTML = data.label;

        var select = document.createElement('select');
        select.id = tid;
        select.classList.add('formCtr-input');
        select.name = data.label;

        data.options.forEach(function(item, idx, arr){
            var option = document.createElement('option');
            option.value = item;
            option.innerHTML = item;
            select.appendChild(option);
        });
        this.addToPanel(label, select);
    },

    addToPanel :function(label, input){
        var container = document.createElement('div');
        container.classList.add('form-control');
        container.appendChild(label);
        container.appendChild(input);

        this.prePanel.insertBefore(container,this.prePanel.lastElementChild);
    }

}