define(['avalon', 'text!./td.textarea.html', 'css!./td.textarea.css'], function(avalon, template) {
	var _interface = function () {};
	avalon.component("td:textarea", {
		//外部标签属性
		label: '',
		value: '',
		name: 'textarea',
		maxlen: 999,  //最大长度
		width: '100%',
		must: false,
		html: false,
		disabled: false,
		horizontal: false,
		labelCol: 4,
		//外部配置参数
		onchanged: null,
		onclicked: null,
		onready: null,
		//内部接口
		$trigger: _interface,
		//view属性
		_isValid: true,
		_validInfo: '',
		//view接口
		_validValue: _interface,
		_doClick: _interface,
		//对外方法
		getData: _interface,
		getValue: _interface,
		setValue: _interface,
		//默认配置
		$template: template,
		$construct: function (hooks, vmOpts, elemOpts) {
			if(typeof elemOpts.must == 'number') {
				elemOpts.maxlen = elemOpts.must;
			}
			var options = avalon.mix(hooks, vmOpts, elemOpts);
			return options;
		},
		$dispose: function (vm, elem) {
			elem.innerHTML = elem.textContent = '';
		},
		$init: function(vm, elem) {
			vm.$trigger = function(ev, type) {
				switch (type) {
					case 'clicked':
						if(typeof vm.onclicked == 'function') {
							vm.onclicked(ev, vm);
						}
						break;
					case 'changed':
						if(typeof vm.onchanged == 'function') {
							vm.onchanged(ev, vm);
						}
						break;
					case 'ready': 
						if(typeof vm.onready == 'function') {
							vm.onready(ev, vm);
						}
						break;
					default: break;
				}
			}
			vm._doClick = function(ev) {
				vm.$trigger(ev, 'clicked');
			}
			vm._validValue = function(ev) {
				vm._isValid = true;
				if(vm.must && vm.value == '') {
					vm._validInfo = '该字段不允许为空';
					vm._isValid = false;
				}
				if(!vm.html && vm._isValid) {  //禁止输入html内容
					vm._isValid = !/<[^>]+>/.test(vm.value);
					vm._validInfo = vm._isValid ? '' : '不允许输入标签';
				}
			}
			vm.$watch('value', function(newVal, oldVal) {
				vm.$trigger({newVal: newVal, oldVal: oldVal}, 'changed');
			});
			vm.getData = function() {
				var data = {};
				data[vm.name] = vm.value;
				return data;
			}
			vm.getValue = function() {
				return vm.value;
			}
			vm.setValue = function(val) {
				if(val != vm.value) {
					vm.value = val;
					vm._validValue(null);
				}
			}
		},
		$ready: function (vm, elem) {
      vm._validValue(null);
			vm.$trigger(elem, 'ready');
    }
	});
	var widget = avalon.components["td:textarea"];
  widget.regionals = {};
})