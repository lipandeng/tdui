define(['avalon', 'text!./td.panel.html', 'css!./td.panel.css'], function(avalon, template) {
	var _interface = function () {};
	avalon.component("td:panel", {
		//外部标签属性
		title: '',
		action: '操作',
		//外部配置参数
		buttons: [],
		actions: [],
		onready: null,
		//slot
		content: '',
		footer: '',
		//内部接口
		$trigger: _interface,
		//view属性
		_showButtons: false,
		_showActions: false,
		//view接口
		_btnClick: _interface,
		_toggleButtons: _interface,
		_toggleActions: _interface,
		//对外方法
		setTitle: _interface,
		getTitle: _interface,
		//默认配置
		$template: template,
		$construct: function (hooks, vmOpts, elemOpts) {
			return avalon.mix(hooks, vmOpts, elemOpts);
		},
		$dispose: function (vm, elem) {
			elem.innerHTML = elem.textContent = '';
		},
		$init: function(vm, elem) {
			vm.$trigger = function(ev, type) {
				switch (type) {
					case 'ready': 
						if(typeof vm.onready == 'function') {
							vm.onready(ev, vm);
						}
						break;
					default: break;
				}
			}
			vm._btnClick = function(ev, fun) {
				if(typeof fun == 'function') {
					fun(ev, vm);
				}
			}
			vm._toggleButtons = function(ev) {
				vm._showButtons = !vm._showButtons;
				ev.stopPropagation();
				ev.cancelBubble = true;
			}
			vm._toggleActions = function(ev) {
				vm._showActions = !vm._showActions;
				ev.stopPropagation();
				ev.cancelBubble = true;
			}
			//对外方法
			vm.setTitle = function(title) {
				vm.title = title;
			}
			vm.getTitle = function() {
				return vm.title;
			}
		},
		$ready: function (vm, elem) {
			vm.$trigger(elem, 'ready');
		}
	});
	var widget = avalon.components["td:panel"];
  widget.regionals = {};
});