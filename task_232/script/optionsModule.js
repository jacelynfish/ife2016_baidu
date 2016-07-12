

function OptionsTag(panel, input){

	this.options = [];
	this.optionsContainer = panel;
	this.input = input
};

OptionsTag.prototype = {
	constructor : OptionsTag,

	indexOf : function (option) {
		var i;
		for (i = 0; i < this.options.length; i++) {
			if (this.options[i] == option) {
				return i;
			}
		}
        return this;
	},

	trim : function (option) {

		[].forEach.call(this.options, function (item, idx, arr) {
			if (item == option) {
				this.options.splice(idx, 1);
				this.optionsContainer.removeChild(this.optionsContainer.childNodes.item(idx));
			}
		});
        return this;
	},

	add : function (option) {
        if (option == '') {
            alert('please input somthing');
        }
		this.trim(option);
		this.options.push(option);
		var newLi = document.createElement('li');
		newLi.innerHTML = option;
		newLi.classList.add('option');
		this.optionsContainer.appendChild(newLi);

        return this;
	},

	remove : function (optionNode) {
		this.optionsContainer.removeChild(optionNode);
		var idx = this.indexOf(optionNode.innerHTML);
		this.options.splice(idx, 1);
        return this;
	},

    getOptionsData : function(){
        return this.options;
    }
}

function TagUtil(panel, input){
	OptionsTag.call(this,panel, input);
}

TagUtil.prototype = Object.create(OptionsTag.prototype);
TagUtil.prototype.constructor = TagUtil;
TagUtil.prototype.keyUpHandler = function(event) {
	var eventTarget = EventUtil.getTarget(event);
	if (event.keyCode == 188 || event.keyCode == 13) {
		var value = eventTarget.value;
		if (eventTarget.value == '') {
			alert('请输入选项');
		} else {
			this.add(value);
			eventTarget.value = '';
		}
	}
};
TagUtil.prototype.clickHandler = function(event){

	var eventTarget = EventUtil.getTarget(event);
	if (eventTarget.classList.contains('option')) {
		this.remove(eventTarget);
	}
};
TagUtil.prototype.moduleInit = function(){
    console.log('hello');
	EventUtil.addEvent(this.input, 'keyup', this.keyUpHandler.bind(this));
	EventUtil.addEvent(this.optionsContainer, 'click', this.clickHandler.bind(this));
}

// window.onload = function(){
//     var panel = $("#options-panel");
//     var input = $('#options-input');
//     var tagUtil = new TagUtil(panel, input);
//     tagUtil.moduleInit();
//
// }