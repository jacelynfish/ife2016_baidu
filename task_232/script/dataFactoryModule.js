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
        this.dataModel.type = this.template.type.selectedOptions[0].value;
        this.dataModel.label = this.template.label.value;
        console.log(this.template.must);
        if(this.template.must[0].selected){
            this.dataModel.must = true;
        }else if(this.template.must[1].selected){
            this.dataModel.must = false;
        }

        if(this.dataModel.type == 'text' || this.dataModel.type == 'textarea'){
            this.dataModel.minLen = this.template.minLen.value;
            this.dataModel.maxLen = this.template.maxLen.value;
        }
        if(this.dataModel.type == 'text'){
            this.dataModel.validate = this.template.validate.selectedOptions[0].value;
        }
        if(this.dataModel.type != 'text' && this.dataModel.type != 'textarea'){
            this.dataModel.options = this.template.options;
        }
        return this;
    },

    getData : function(){
        return this.dataModel;
    }
}