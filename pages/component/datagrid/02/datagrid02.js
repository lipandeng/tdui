define(['ui/datagrid/td.datagrid'], function () {
	var vdatagrid = avalon.define({
		$id: 'datagrid02',
		info: '',
		$tab_opt: {
			tabs: [{title: 'UI界面'}, {title: 'HTML代码'}, {title: 'JS代码'}]
		},
		$datagrid_opt: {
			loadUrl: 'data/td.datagrid.json',
			loadParam: {
				//...
			},
			cols: [
				{name: 'id', display: '编号', width: 100, type: 'text', disabled: true}, 
				{name: 'name', display: '名称', width: 150, type: 'text'}, 
				{name: 'price', display: '价格', width: 120, type: 'text'},
				{name: 'category', display: '类别', width: 150, type: 'select', option: {
					'A1': '游戏', 'A2' : '电影', 'A3' : '音乐'
				}}
			],
			onloaded: function(dat, vm) {
				vdatagrid.info = '加载数据 ' + dat;
			},
			onreloaded: function(dat, vm) {
				vdatagrid.info = '重新加载数据 ' + dat;
			},
			onrowclicked: function(row, vm) {
				vdatagrid.info = '点击行 ' + row;
			},
			onrowdbclicked: function(row, vm) {
				vdatagrid.info = '双击行 ' + row;
			},
			onrowselected: function(row, vm) {
				vdatagrid.info = '已选中行索引 ' + vm.getSelectedIdx();
			},
			actions: [{title: '新增', icon: 'glyphicon glyphicon-plus', fun: function(ev, vm) {
				vdatagrid.info = '点击新增';
			}}, {title: '删除', icon: 'glyphicon glyphicon-remove', fun: function(ev, vm) {
				vdatagrid.info = '点击删除[已选中行：' + vm.getSelectedIdx() + ']';
				vm.removeSelectedRow();
			}},{title: '刷新', icon: 'glyphicon glyphicon-refresh', type: 'primary', fun: function(ev, vm) {
				vm.reloadData();
			}}]
		}
	});
	
	return avalon.controller(function($ctrl) {
		$ctrl.$onRendered = function() {
			
		}
		$ctrl.$onEnter = function() {
			
		}
		$ctrl.$onBeforeUnload = function() {
			
		}
		$ctrl.$vmodels = [vdatagrid];
	});
});