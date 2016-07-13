function DataFactory(dataTemplate){
    this.dataModel = {
        // type:'',
        // label:'',
        // must:true,
        // minLen:0,
        // maxLen:100,
        // validate:'',
        // options:[]
    };
    this.template = dataTemplate;
}
DataFactory.prototype = {
    constructor: DataFactory,

    dataSerialization : function(){
        //先检测类型、标题和必填项是否设置好
        if(this.isBasicValidate()){
            this.dataModel.type = this.template.type.selectedOptions[0].value;
            this.dataModel.label = this.template.label.value;
            console.log(this.template.must);
            if(this.template.must.item(0).checked){
                this.dataModel.must = true;
            }else if(this.template.must.item(1).checked){
                this.dataModel.must = false;
            }
            //检测长度是否设置好
            if(this.dataModel.type == 'text' || this.dataModel.type == 'textarea'){
                if(this.isTextVlidate()){

                    this.dataModel.minLen = this.template.minLen.value;
                    this.dataModel.maxLen = this.template.maxLen.value;

                    if(this.dataModel.type == 'text'){
                        this.dataModel.validate = this.template.validate.selectedOptions[0].value;
                    }
                    return this;
                }else{
                    //如果没有设置好，在传给表单工厂的数据模型为null，表单工厂忽略不作出任何DOM改变
                    this.dataModel = null;
                    return;
                }

            }
            
            //检测选项是否输入正确
            if(this.dataModel.type != 'text' && this.dataModel.type != 'textarea' && this.isOptionsValidate()){
                this.dataModel.options = this.template.options;
                return this;
            }else{
                this.dataModel = null;
                return;
            }

        }

        this.dataModel = null;
        return;
    },

    getData : function(){
        return this.dataModel;
    },
    
    //标题与必需项的检测
    isBasicValidate: function(){
        var labelValidated = false;
        var mustValidated = false;

        if(this.template.label.value != ''){
            labelValidated = true;
        }else{
            alert('您还未输入表单标题！');
        }
        if(this.template.must.item(0).checked || this.template.must.item(1).checked){

            mustValidated = true;
        }else{

            alert('请选择该表单是否必选！');
        }

        return (labelValidated && mustValidated);

    },
    
    //Input长度的检测
    isTextVlidate : function(){
        var minLenValidated = false, maxLenValidated = false;
        if(this.template.minLen.value == '' || isNaN(this.template.minLen.value) || this.template.maxLen.value== '' || isNaN(this.template.maxLen.value)){
            alert('表单长度必须为整数！');

        }else{
            minLenValidated = true;
            maxLenValidated = true;
        }

        return (minLenValidated && maxLenValidated);
    },

    //选项的检测
    isOptionsValidate : function(){
        var optionsValidated = false;
        if({}.toString.call(this.template.options) == '[object Array]' && this.template.options.length > 1){
            optionsValidated = true;
        }else{
            alert('选项数量必须超过一个！');
        }
        return optionsValidated;
    }
}