var legal_person_data = {"uploadData":[{"count":146.842},{"count":138.0654},{"count":139.9434},{"count":136.281},{"count":133.4027}],
		"viewData":[{"count":130},{"count":120},{"count":125},{"count":121},{"count":120}],
		"updateData":[{"count":135},{"count":157},{"count":153},{"count":141.5},{"count":140}]};
var people_data = {"uploadData":[{"count":1300},{"count":1686},{"count":1692},{"count":1742},{"count":1621}],
	"updateData":[{"count":103},{"count":281},{"count":203},{"count":197},{"count":173}],
	"viewData":[{"count":651},{"count":842},{"count":223},{"count":223},{"count":221}]};
var picture_data = {"uploadData":[{"count":330},{"count":786},{"count":492},{"count":842},{"count":421}],
	"updateData":[{"count":10},{"count":81},{"count":23},{"count":97},{"count":23}],
	"viewData":[{"count":451},{"count":342},{"count":523},{"count":323},{"count":421}]};

var Tpl1 = '<li>' +
			'<p class="data-count">5681</p>' +
			'<span class="data-name">数据总量</span>' +
			'</li>' +
			'<li>' +
			'<p class="data-count">1331</p>' +
			'<span class="data-name">更新量</span>' +
			'</li>' +
			'<li>' +
			'<p class="data-count">3753</p>' +
			'<span class="data-name">共享次数</span>' +
			'</li>' ;		
var Tpl2 = '<li>' +
			'<p class="data-count">3971</p>' +
			'<span class="data-name">数据总量</span>' +
			'</li>' +
			'<li>' +
			'<p class="data-count">1141</p>' +
			'<span class="data-name">更新量</span>' +
			'</li>' +
			'<li>' +
			'<p class="data-count">3753</p>' +
			'<span class="data-name">共享次数</span>' +
			'</li>' ;
var Tpl3 = '<li>' +
			'<p class="data-count">4742</p>' +
			'<span class="data-name">数据总量</span>' +
			'</li>' +
			'<li>' +
			'<p class="data-count">1231</p>' +
			'<span class="data-name">更新量</span>' +
			'</li>' +
			'<li>' +
			'<p class="data-count">2983</p>' +
			'<span class="data-name">共享次数</span>' +
			'</li>' ;		
$('.com-screen-content .use-data').html(Tpl1);			
// 基于准备好的dom，初始化echarts实例
var myChart1= echarts.init(document.getElementById('main1'));
var myChart2 = echarts.init(document.getElementById('main2'));
var myChart3 = echarts.init(document.getElementById('main3'));
//var myChart4 = echarts.init(document.getElementById('main4'));
var myChart5 = echarts.init(document.getElementById('main5'));
var myChart6 = echarts.init(document.getElementById('main6'));
var myChart7 = echarts.init(document.getElementById('main7'));

getNowFormatDate();
init_myChart1();
init_myChart2();
init_myChart3(legal_person_data);
init_myChart5();
init_myChart6();
init_myChart7();


function init_myChart3(data) {

	var uploadCnt = [];
	var updateCnt = [];

	var viewCnt = [];
	if (data.uploadData != null) {
		for (var i = 0; i < data.uploadData.length; i++) {
			uploadCnt.push(data.uploadData[i].count);
		}
	}
	if (data.updateData != null) {
		for (var i = 0; i < data.updateData.length; i++) {
			updateCnt.push(data.updateData[i].count);
		}
	}

	if (data.viewData != null) {
		for (var i = 0; i < data.viewData.length; i++) {
			viewCnt.push(data.viewData[i].count);
		}
	}
	option = {

		tooltip: {
			trigger: 'axis',
			formatter: function (params, ticket, callback) {
				var res = '';
				for (var i = 0, l = params.length; i < l; i++) {
					res += '' + params[i].seriesName + ' : ' + params[i].value + '<br>';
				}
				return res;
			},
			transitionDuration: 0,
			backgroundColor: 'rgba(255,255,255,0.7)',
			borderColor: '#D3D3D3',
			borderRadius: 8,
			borderWidth: 2,
			padding: [5, 10],
			axisPointer: {
				type: 'line',
				lineStyle: {
					type: 'dashed',
					color: '#535b69'
				}
			}
		},
		legend: {
			icon: 'circle',
			itemWidth: 8,
			itemHeight: 8,
			itemGap: 10,
			top: '16',
			right: '10',
			data: ['平均成交价','成交总价中位数','成交周期中位数'],
			textStyle: {
				fontSize: 10,
				color: '#a0a8b9'
			}
		},
		grid: {
			top: '46',
			left: '13%',
			right: '10',
			//bottom: '10%',
			containLabel: false
		},
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			axisLabel: {
				interval: 0,
				fontSize:10
			},
			axisLine: {
				show: false,
				lineStyle: {
					color: '#a0a8b9'
				}
			},
			axisTick: {
				show: false
			},
			data: ['1月', '2月', '3月', '4月', '5月'],
			offset: 10
		}],
		yAxis: [{
			type: 'value',
			axisLine: {
				show: false,
				lineStyle: {
					color: '#a0a8b9'
				}
			},
			axisLabel: {
				margin: 10,
				textStyle: {
					fontSize: 10
				}
			},
			splitLine: {
				lineStyle: {
					color: '#2b3646'
				}
			},
			axisTick: {
				show: false
			}
		}],
		series: [{
			name: '平均成交价',
			type: 'line',
			smooth: true,
			showSymbol: false,
			lineStyle: {
				normal: {
					width: 2
				}
			},
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgba(137, 189, 27, 0.3)'
					}, {
						offset: 0.8,
						color: 'rgba(137, 189, 27, 0)'
					}], false),
					shadowColor: 'rgba(0, 0, 0, 0.1)',
					shadowBlur: 10
				}
			},
			itemStyle: {
				normal: {
					color: '#1cc840'
				}
			},
			data: uploadCnt
		}, {
			name: '成交总价中位数',
			type: 'line',
			smooth: true,
			showSymbol: false,
			lineStyle: {
				normal: {
					width: 2
				}
			},
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgba(219, 50, 51, 0.3)'
					}, {
						offset: 0.8,
						color: 'rgba(219, 50, 51, 0)'
					}], false),
					shadowColor: 'rgba(0, 0, 0, 0.1)',
					shadowBlur: 10
				}
			},
			itemStyle: {
				normal: {
					color: '#eb5690'
				}
			},
			data: viewCnt
		},  {
			name: '成交周期中位数',
			type: 'line',
			smooth: true,
			showSymbol: false,
			lineStyle: {
				normal: {
					width: 2
				}
			},
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgba(0, 136, 212, 0.3)'
					}, {
						offset: 0.8,
						color: 'rgba(0, 136, 212, 0)'
					}], false),
					shadowColor: 'rgba(0, 0, 0, 0.1)',
					shadowBlur: 10
				}
			},
			itemStyle: {
				normal: {
					color: '#43bbfb'
				}
			},
			data: updateCnt
		}
		]
	};
	myChart3.setOption(option);
}

function init_myChart2() {
	var data = {"uploadData":[{"count":20000},{"count":7500},{"count":9300},{"count":6500},{"count":14000}],
				"viewData":[{"count":18542},{"count":4486},{"count":7283},{"count":7054},{"count":10000}],
				"updateData":[{"count":3125},{"count":1800},{"count":2280},{"count":1495},{"count":3000}]};
	var uploadCnt = [];
	var updateCnt = [];

	var viewCnt = [];
	if (data.uploadData != null) {
		for (var i = 0; i < data.uploadData.length; i++) {
			uploadCnt.push(data.uploadData[i].count);
		}
	}
	if (data.updateData != null) {
		for (var i = 0; i < data.updateData.length; i++) {
			updateCnt.push(data.updateData[i].count);
		}
	}

	if (data.viewData != null) {
		for (var i = 0; i < data.viewData.length; i++) {
			viewCnt.push(data.viewData[i].count);
		}
	}
	option = {
	
		tooltip: {
			trigger: 'axis',
			formatter: function (params, ticket, callback) {
				var res = '';
				for (var i = 0, l = params.length; i < l; i++) {
					res += '' + params[i].seriesName + ' : ' + params[i].value + '<br>';
				}
				return res;
			},
			transitionDuration: 0,
			backgroundColor: 'rgba(255,255,255,0.7)',
			borderColor: '#D3D3D3',
			borderRadius: 8,
			borderWidth: 2,
			padding: [5, 10],
			axisPointer: {
				type: 'line',
				lineStyle: {
					type: 'dashed',
					color: '#535b69'
				}
			}
		},
		legend: {
			icon: 'circle',
			itemWidth: 8,
			itemHeight: 8,
			itemGap: 10,
			top: '16',
			right: '10',
			data: ['新房','二手房','出租屋'],
			textStyle: {
				fontSize: 10,
				color: '#696969'
			}
		},
		grid: {
			top:'46',
			left: '13%',
			right: '10',
			//bottom: '10%',
			containLabel: false
		},
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			axisLabel: {
				interval: 0,
				fontSize:10
			},
			axisLine: {
				show: false,
				lineStyle: {
					color: '#696969'
				}
			},
			axisTick: {
				show: false
			},
			data: ['招商一江璟城', '龙庭华府', '中建壹品澜庭', '荣盛华庭', '华中国际广场'],
			offset: 10
		}],
		yAxis: [{
			type: 'value',
			axisLine: {
				show: false,
				lineStyle: {
					color: '#696969'
				}
			},
			axisLabel: {
				margin: 10,
				textStyle: {
					fontSize: 10
				}
			},
			splitLine: {
				lineStyle: {
					color: '#2b3646'
				}
			},
			axisTick: {
				show: false
			}
		}],
		series: [{
			name: '新房',
			type: 'line',
			smooth: true,
			showSymbol: false,
			lineStyle: {
				normal: {
					width: 2
				}
			},
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgba(137, 189, 27, 0.3)'
					}, {
						offset: 0.8,
						color: 'rgba(137, 189, 27, 0)'
					}], false),
					shadowColor: 'rgba(0, 0, 0, 0.1)',
					shadowBlur: 10
				}
			},
			itemStyle: {
				normal: {
					color: '#1cc840'
				}
			},
			data: uploadCnt
		}, {
			name: '二手房',
			type: 'line',
			smooth: true,
			showSymbol: false,
			lineStyle: {
				normal: {
					width: 2
				}
			},
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgba(219, 50, 51, 0.3)'
					}, {
						offset: 0.8,
						color: 'rgba(219, 50, 51, 0)'
					}], false),
					shadowColor: 'rgba(0, 0, 0, 0.1)',
					shadowBlur: 10
				}
			},
			itemStyle: {
				normal: {
					color: '#eb5690'
				}
			},
			data: viewCnt
		},  {
			name: '出租屋',
			type: 'line',
			smooth: true,
			showSymbol: false,
			lineStyle: {
				normal: {
					width: 2
				}
			},
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgba(0, 136, 212, 0.3)'
					}, {
						offset: 0.8,
						color: 'rgba(0, 136, 212, 0)'
					}], false),
					shadowColor: 'rgba(0, 0, 0, 0.1)',
					shadowBlur: 10
				}
			},
			itemStyle: {
				normal: {
					color: '#43bbfb'
				}
			},
			data: updateCnt
		}
		]
	};
	myChart2.setOption(option);
}


function init_myChart1(){
    var option;

    setTimeout(function () {
  option = {
    legend: {
		itemWidth: 8,
		itemHeight: 12,
		textStyle: {
			color: '#000000',
			fontSize:10
		},
	},
    tooltip: {
      trigger: 'axis',
      showContent: false
    },
    dataset: {
      source: [
        ['product', '0525', '0526', '0527', '0528', '0529', '0530', '0531'],
        ['商品房', 256, 384, 209, 187, 246, 244, 285],
        ['写字楼', 2, 0, 8, 10, 16, 52, 32],
        ['商业', 17, 5, 15, 42, 35, 37, 20],
        ['其他', 0, 1, 0, 1, 0, 10, 3]
      ]
    },
    xAxis: { type: 'category' },
    yAxis: { gridIndex: 0 },
    grid: { top: '55%' },
    series: [
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
      },
      {
        type: 'pie',
        id: 'pie',
        radius: '30%',
        center: ['50%', '30%'],
        emphasis: {
          focus: 'self'
        },
        label: {
          formatter: '{b}: {@0525} ({d}%)'
        },
        encode: {
          itemName: 'product',
          value: '0525',
          tooltip: '0525'
        }
      }
    ]
  };
  myChart1.on('updateAxisPointer', function (event) {
    const xAxisInfo = event.axesInfo[0];
    if (xAxisInfo) {
      const dimension = xAxisInfo.value + 1;
      myChart1.setOption({
        series: {
          id: 'pie',
          label: {
            formatter: '{b}: {@[' + dimension + ']} ({d}%)'
          },
          encode: {
            value: dimension,
            tooltip: dimension
          }
        }
      });
    }
  });
  myChart1.setOption(option);
});

    if (option && typeof option === 'object') {
		myChart1.setOption(option);
    }

    window.addEventListener('resize', myChart1.resize);
}


/* 图表5 */
function init_myChart5() {
	var dom = document.getElementById('main5');
	if (!dom) {
	  console.error('main5 element not found!');
	  return;
	}
	var option;
  
	myChart5.showLoading();
  
	$.get('Wuhan.json', function (wuhanJson) {
	  console.log('Wuhan JSON loaded:', wuhanJson); // 调试输出
	  myChart5.hideLoading();
	  echarts.registerMap('Wuhan', wuhanJson);
  option = {
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2
    },
    visualMap: {
      left: 'right',
      min: 100,
      max: 1300,
      inRange: {
        color: [
          '#313695',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#e0f3f8',
          '#ffffbf',
          '#fee090',
          '#fdae61',
          '#f46d43',
          '#d73027',
          '#a50026'
        ]
      },
      text: ['High', 'Low'],
      calculable: true
    },
    toolbox: {
      show: true,
      //orient: 'vertical',
      left: 'left',
      top: 'top',
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
      }
    },
    series: [
      {
        name: '武汉',
        type: 'map',
        roam: true,
        map: 'Wuhan',
        emphasis: {
          label: {
            show: true
          }
        },
        data: [
			{ name: '江岸区', value: 749 },
			{ name: '江汉区', value: 250 },
			{ name: '硚口区', value: 468 },
			{ name: '汉阳区', value: 1277 },
			{ name: '青山区', value: 132 },
			{ name: '武昌区', value: 603 },
			{ name: '洪山区', value: 374 },
			{ name: '东西湖区', value: 611 },
			{ name: '武汉东湖新技术开发区', value: 839 },
			{ name: '经济开发区', value: 298 },
			{ name: '江夏区', value: 448 },
			{ name: '黄陂区', value: 285 },
			{ name: '蔡甸区', value: 359 },
			{ name: '新洲区', value: 152 },
			{ name: '汉南区', value: 150 }
		  ]
      }
    ]
  };
  myChart5.setOption(option);
});

    if (option && typeof option === 'object') {
		myChart5.setOption(option);
    }

    window.addEventListener('resize', myChart5.resize);
}
//刷新myChart5数据



function init_myChart6(){
	var timeRent = ['202312', '202401', '202402', '202403', '202404', '202405']
	var average_rent = [2402.7, 2409, 2281.1, 2336.6, 2281.1, 2317.1]
	var median_rent = [2200, 2200, 2100, 2100, 2050, 2000]
	option = {
		"tooltip": {
			"trigger": "axis",
			transitionDuration: 0,
			backgroundColor: 'rgba(255,255,255,0.7)',
			borderColor: '#D3D3D3',
			borderRadius: 8,
			borderWidth: 2,
			padding: [5, 10],
			axisPointer: {
				type: 'line',
				lineStyle: {
					type: 'dashed',
					color: '#535b69'
				}
			},
			formatter: function (params, ticket, callback) {
                var res = '';
                for (var i = 0, l = params.length; i < l; i++) {
                    // 仅显示名称为“平均租金”和“租金中位数”的数据
                    if (params[i].seriesName === '平均租金' || params[i].seriesName === '租金中位数') {
                        res += '' + params[i].seriesName + ' : ' + params[i].value + '<br>';
                    }
                }
                return res;
            }
		},
		"grid": {
			"top": '40',
			"left": '30',
			"right": '10',
			"bottom": '40',
	
			textStyle: {
				color: "#fff"
			}
		},
		"legend": {
			right: '24',
			top: "24",
			itemWidth: 8,
			itemHeight: 12,
			textStyle: {
				color: '#000000',
				fontSize:10
			},
			"data": ['平均租金', '租金中位数'],
		
		},
		"calculable": true,
		xAxis: [{
			'type': 'category',
			"axisTick": {
				"show": false
			},
			"axisLine": {
				"show": false,
				lineStyle: {
					color: '#868c96'
				}
			},
			"axisLabel": {
				"interval": 0,
				fontSize:10,
			},
			"splitArea": {
				"show": false
			},
			'data': timeRent,
			splitLine: {
				show: false
			}
		}],
		"yAxis": [
			{
				"type": "value",
				offset: -14,
				"splitLine": {
					"show": false
				},
				"axisLine": {
					"show": false,
					lineStyle: {
						color: '#868c96'
					}
				},
				"axisTick": {
					"show": false
				},
				"axisLabel": {
					"interval": 0,
					fontSize:10

				},
				"splitArea": {
					"show": false
				}
			}],
		
		"series": [
			{
				"name": "平均租金",
				"type": "bar",
				
				"barGap": "10%",
				itemStyle: {//图形样式
					normal: {
						"color": '#4a4df0'
					}
				},
				label: {
					normal: {
						show: true,
						position: "top",
						textStyle: {
							color: "#4a4df0",
							fontSize: 10
						}
					}
				},
				"data": average_rent,
				barWidth: 14,
			},{
			name:'平均租金折线',
			type:'line',
			itemStyle : {  /*设置折线颜色*/
				normal : {
				  color:'#800080'
				}
			},
			data:[2402.7, 2409, 2281.1, 2336.6, 2281.1, 2317.1],
            },
			{
				"name": "租金中位数",
				"type": "bar",
				
				"barGap": "10%",
				itemStyle: {//图形样式
					normal: {
						"color": '#FF0000'
					}
				},
				label: {
					normal: {
						show: true,
						position: "top",
						textStyle: {
							color: "#FF0000",
							fontSize: 10
						}
					}
				},
				"data": median_rent,
				barWidth: 14,
			},{
			name:'租金中位数折线',
			type:'line',
			itemStyle : {  /*设置折线颜色*/
				normal : {
				  color:'#FFA500'
				}
			},
			data:[2200, 2200, 2100, 2100, 2050, 2000],
            }
		]
	};

// 使用刚指定的配置项和数据显示图表。
	myChart6.setOption(option);
}

function init_myChart7(){
	var week = ['0303', '0310', '0317', '0324', '0331', '0407', '0414', '0421', '0428', '0505', '0512', '0519']
	var guapai_price = [16051.4, 16653.4, 16570.2, 16521.3, 16472.5, 16409.4, 16372.5, 16302.2, 16272.3, 16235.3, 16212.8, 16146.7]
	var week_daikan = [100236, 99953, 97812, 92048, 83069, 99333, 88941, 79380, 80970, 84551, 87290, 87802]
	option = {
		"tooltip": {
			"trigger": "axis",
			transitionDuration: 0,
			backgroundColor: 'rgba(255,255,255,0.7)',
			borderColor: '#D3D3D3',
			borderRadius: 8,
			borderWidth: 2,
			padding: [5, 10],
			axisPointer: {
				type: 'line',
				lineStyle: {
					type: 'dashed',
					color: '#535b69'
				}
			}
		},
		"grid": {
			"top": '40',
			"left": '30',
			"right": '10',
			"bottom": '40',
	
			textStyle: {
				color: "#fff"
			}
		},
		"legend": {
			right: '24',
			top: "24",
			itemWidth: 8,
			itemHeight: 12,
			textStyle: {
				color: '#000000',
				fontSize:10
			},
			"data": ['挂牌单价', '周带看量'],
		
		},
		"calculable": true,
		xAxis: [{
			'type': 'category',
			"axisTick": {
				"show": false
			},
			"axisLine": {
				"show": false,
				lineStyle: {
					color: '#868c96'
				}
			},
			"axisLabel": {
				"interval": 0,
				fontSize:10,
			},
			"splitArea": {
				"show": false
			},
			'data': week,
			splitLine: {
				show: false
			}
		}],
		"yAxis": [
			{
				"type": "value",
				offset: -14,
				"splitLine": {
					"show": false
				},
				"axisLine": {
					"show": false,
					lineStyle: {
						color: '#868c96'
					}
				},
				"axisTick": {
					"show": false
				},
				"axisLabel": {
					"interval": 0,
					fontSize:10

				},
				"splitArea": {
					"show": false
				}
			}],
		
		"series": [
			{
				"name": "周带看量",
				"type": "bar",
				
				"barGap": "10%",
				itemStyle: {//图形样式
					normal: {
						"color": '#6B8E23'
					}
				},
				label: {
					normal: {
						show: true,
						position: "top",
						textStyle: {
							color: "#6B8E23",
							fontSize: 10
						}
					}
				},
				"data": week_daikan,
				barWidth: 14,
			},{
			name:'挂牌单价',
			type:'line',
			itemStyle : {  /*设置折线颜色*/
				normal : {
				  color:'#8B4513'
				}
			},
			label: {
				normal: {
					show: true,
					position: "top",
					textStyle: {
						color: "#8B4513",
						fontSize: 10
					}
				}
			},
			"data": guapai_price,
            }
		]
	};
// 使用刚指定的配置项和数据显示图表。
	myChart7.setOption(option);
}


//获取当前时间
function getNowFormatDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var show_day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var day = date.getDay();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = '<div><p>' + year + '年' + month + '月' + strDate + '号</p><p>' + show_day[day] + '</p></div>';
    $('.nowTime li:nth-child(2)').html(currentdate);
    setTimeout(getNowFormatDate, 1000); //每隔1秒重新调用一次该函数
}
var resourceDataType = $('.data-label li.active').data('type');//用于切换基础库
function urlType() {
    resourceDataType = $('.data-label li.active').data('type');
    if (resourceDataType == 1) {
        init_myChart3(legal_person_data);
		$('.com-screen-content .use-data').html(Tpl1);
    } else if (resourceDataType == 2) {
        init_myChart3(people_data);
		$('.com-screen-content .use-data').html(Tpl2);
    } else if (resourceDataType == 3) {
        init_myChart3( picture_data);
		$('.com-screen-content .use-data').html(Tpl3);
    }
}
var num =0 ;
//    资源类型定时器
function resourceType() {
    $('.data-label li').eq(num).addClass('active').siblings().removeClass('active');
    //$('.active-data-label').html($('.canvas-pic-two .data-label li.active').html());
    urlType();
    num++;
    if (num >= 3) {
        num = 0;
    }
}

//    资源类型点击切换
$('.data-label').on('click', 'li', function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.active-data-label').html($('.data-label li.active').html());
    urlType();
});
var oTimer = setInterval(resourceType, 3000);
//    hover清除定时器
$('.data-label').hover(function () {
    clearInterval(oTimer);
}, function () {
    oTimer = setInterval(resourceType, 3000);
});

/*function resize(){
	window.addEventListener("resize", () => { 
  	this.myChart1.resize;
	this.myChart2.resize;
	this.myChart3.resize;
	this.myChart5.resize;
	this.myChart6.resize;
	this.myChart7.resize;
});
}*/

setInterval(function (){
    window.onresize = function () {
		this.myChart1.resize;
		this.myChart2.resize;
		this.myChart3.resize;
		this.myChart5.resize;
		this.myChart6.resize;
		this.myChart7.resize;
    }
},200)

//myChart7.resize();
