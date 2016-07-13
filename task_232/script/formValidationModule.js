function FormValidation(){
    this.dataset = {};

}
FormValidation.prototype = {
    constructor : FormValidation,
    //增加dataset的数据并为info区域添加基于text和textarea的检测事件
    addData : function(tid,data,container){
        this.dataset[tid] = data;
        this.dataset[tid].container = container;
        this.dataset[tid].tid = tid;
        var infoPanel = container.getElementsByClassName('addInfo')[0];

        if(data.type == 'text' || data.type == 'textarea'){
            var inputPanel;
            if(data.type == 'text'){
                inputPanel = container.getElementsByTagName('input')[0];
            }else{
                inputPanel = container.getElementsByTagName('textarea')[0];
            }
            EventUtil.addEvent(inputPanel,'change',function(event){
                if(inputPanel.value.length < data.minLen || inputPanel.value.length > data.maxLen){
                    infoPanel.innerHTML = '字符长度应为'+ data.minLen +'-'+data.maxLen +'，现字符长度为'+inputPanel.value.length;
                    infoPanel.classList.remove('info-normal');
                    infoPanel.classList.remove('info-ok');
                    infoPanel.classList.add('info-warn');
                }else{
                    infoPanel.innerHTML = '填写正确'
                    infoPanel.classList.remove('info-normal');
                    infoPanel.classList.remove('info-warn');
                    infoPanel.classList.add('info-ok');
                }
            })
        }
    },
    
    
}