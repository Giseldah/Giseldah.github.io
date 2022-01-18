// Created by Giseldah

var DblCalcDev = 0.00000001;

var PercTags = [
	'crithit',
	'devhit',
	'critmagn',
	'finesse',
	'phydmg',
	'tacdmg',
	'outheal',
	'resist',
	'critdef',
	'inheal',
	'block',
	'partblock',
	'partblockmit',
	'parry',
	'partparry',
	'partparrymit',
	'evade',
	'partevade',
	'partevademit',
	'phymit',
	'ofmit',
	'tacmit'
];

var PercGroups = {
	crithit: [
		'devhit',
		'critmagn'
	],
	tacdmg: [
		'outheal'
	],
	block: [
		'partblock',
		'partblockmit'
	],
	parry: [
		'partparry',
		'partparrymit'
	],
	evade: [
		'partevade',
		'partevademit'
	],
	phymit: [
		'ofmit'
	]
};

var PenRatings = {
	resist: 'resistpen',
	block: 'bpepen',
	partblock: 'bpepen',
	partblockmit: 'bpepen',
	parry: 'bpepen',
	partparry: 'bpepen',
	partparrymit: 'bpepen',
	evade: 'bpepen',
	partevade: 'bpepen',
	partevademit: 'bpepen',
	phymit: 'armourpen',
	ofmit: 'armourpenlow',
	tacmit: 'armourpenlow'
};

var Penetrations;

var ArmourTypes = [
	'',
	'light',
	'medium',
	'heavy'
];

var DiffColorNeg = 'rgba(255, 170, 170, 0.3)';
var DiffColorZero = '';
var DiffColorPos = 'rgba(170, 170, 255, 0.35)';

var LevelCap;
var PlayerLvl;
var PlayerClass;
var PenIndex;
var ArmourType;
var CanBlock;
var GraphPerc;

window.onload = function() {
	PlayerClass = document.getElementById('class-sel-list').firstElementChild.getAttribute('data-classname');
	LevelCap = CalcStat('LevelCap',0);
	PlayerLvl = LevelCap;
	InitPenetrations();
	PenIndex = 0;
	GraphPerc = document.getElementById('graph-sel-list').firstElementChild.getAttribute('data-percname');
	ChangeClass();
	ChangeLevel();
	ChangePen();
	PercTags.forEach(InitPerc);
	function InitPerc(ps) {
		if (typeof PercGroups[ps] !== 'undefined' && ps != 'block') {
			ProcessUnlockedBtn(document.getElementById(ps+'unlockedbtn'));
		}
		document.getElementById(ps+'currrat').value = '0';
		UpdateCurrPerc(ps);
		document.getElementById(ps+'targperc').value = '999';
		CorrectTargPerc(ps);
		UpdateTargRat(ps);
		UpdateRatDiff(ps);
	}
	InitGraph();
	document.getElementById('cs-version').innerHTML = 'v'+CalcStat('-Version',0);
}

function InitPenetrations() {
	Penetrations = [];
	var lis = document.getElementById('pen-sel-list').getElementsByTagName('li');
	var calclvl;
	var penname, pentype, penlevel, pentitle, penarmour, penarmourlow, penbpe, penresist;
	var i;
	for (i = 0; i < lis.length; i++) {
		if (lis[i].hasAttribute('data-penname')) {
			penname = lis[i].getAttribute('data-penname');
			pentype = lis[i].getAttribute('data-pentype');
			penlevel = lis[i].getAttribute('data-penlevel');
			pentitle = lis[i].getAttribute('data-pentitle');
			penarmour = 0;
			penarmourlow = 0;
			penbpe = 0;
			penresist = 0;
			if (penlevel != null && penlevel != 'onlvl') {
				calclvl = Number(penlevel);
				switch(pentype) {
					case 'hidden2':
						penarmour = CalcStat('TPenArmour',calclvl,2);
						penarmourlow = penarmour;
						penbpe = CalcStat('TPenBPE',calclvl,2);
						penresist = CalcStat('TPenResist',calclvl,2);
						break;
					case 'hidden3':
						penarmour = CalcStat('TPenArmour',calclvl,3);
						penarmourlow = penarmour;
						penbpe = CalcStat('TPenBPE',calclvl,3);
						penresist = CalcStat('TPenResist',calclvl,3);
						break;
					case 'enhiii':
						penarmour = CalcStat('T2PenArmour',calclvl);
						penarmourlow = penarmour;
						penbpe = CalcStat('T2PenBPE',calclvl);
						penresist = CalcStat('T2PenResist',calclvl);
				}
			}
			if (penlevel != 'onlvl') 
				lis[i].setAttribute('title',pentitle.replace(/#bpepen/g,Math.round(penbpe+DblCalcDev).toString()).replace(/#resistpen/g,Math.round(penresist+DblCalcDev).toString()).replace(/#armourpen/g,Math.round(penarmour+DblCalcDev).toString()));
			Penetrations.push({name: penname, type: pentype, level: penlevel, title: pentitle, armourpen: penarmour, armourpenlow: penarmourlow, bpepen: penbpe, resistpen: penresist});
		}
	}
}

function UpdatePenetrations() {
	var lis = document.getElementById('pen-sel-list').getElementsByTagName('li');
	var calclvl;
	var penname, pentype, penlevel, pentitle, penarmour, penarmourlow, penbpe, penresist;
	var pi = 0;
	var i;
	for (i = 0; i < lis.length; i++) {
		if (lis[i].hasAttribute('data-penname')) {
			penname = lis[i].getAttribute('data-penname');
			pentype = lis[i].getAttribute('data-pentype');
			penlevel = lis[i].getAttribute('data-penlevel');
			pentitle = lis[i].getAttribute('data-pentitle');
			penarmour = 0;
			penarmourlow = 0;
			penbpe = 0;
			penresist = 0;
			if (penlevel == 'onlvl') {
				calclvl = PlayerLvl;
				switch(pentype) {
					case 'hidden2':
						penarmour = CalcStat('TPenArmour',calclvl,2);
						penarmourlow = penarmour;
						penbpe = CalcStat('TPenBPE',calclvl,2);
						penresist = CalcStat('TPenResist',calclvl,2);
						break;
					case 'hidden3':
						penarmour = CalcStat('TPenArmour',calclvl,3);
						penarmourlow = penarmour;
						penbpe = CalcStat('TPenBPE',calclvl,3);
						penresist = CalcStat('TPenResist',calclvl,3);
						break;
					case 'enhiii':
						penarmour = CalcStat('T2PenArmour',calclvl);
						penarmourlow = penarmour;
						penbpe = CalcStat('T2PenBPE',calclvl);
						penresist = CalcStat('T2PenResist',calclvl);
				}
				lis[i].setAttribute('title',pentitle.replace(/#bpepen/g,Math.round(penbpe+DblCalcDev).toString()).replace(/#resistpen/g,Math.round(penresist+DblCalcDev).toString()).replace(/#armourpen/g,Math.round(penarmour+DblCalcDev).toString()));
				Penetrations[pi].armourpen = penarmour;
				Penetrations[pi].armourpenlow = penarmourlow;
				Penetrations[pi].bpepen = penbpe;
				Penetrations[pi].resistpen = penresist;
			}
			pi++;
		}
	}
}

function ProcessLockedBtn(lockedbtn) {
    var ps = lockedbtn.id.replace('lockedbtn','');
	lockedbtn.style.display = 'none';
	document.getElementById(ps+'unlockedbtn').style.display = 'block';
	PercGroups[ps].forEach(EnableCurrRat);
	function EnableCurrRat(pss) {
		document.getElementById(pss+'currrat').disabled = false;
		UpdatePerc(pss);
	}
}

function ProcessUnlockedBtn(unlockedbtn) {
    var ps = unlockedbtn.id.replace('unlockedbtn','');
	unlockedbtn.style.display = 'none';
	document.getElementById(ps+'lockedbtn').style.display = 'block';
	PercGroups[ps].forEach(DisableCurrRat);
	function DisableCurrRat(pss) {
		document.getElementById(pss+'currrat').disabled = true;
		document.getElementById(pss+'currrat').value = document.getElementById(ps+'currrat').value;
		UpdatePerc(pss);
	}
}

function ProcessCurrRat(currrat) {
    var ps = currrat.id.replace('currrat','');
	CorrectCurrRat(ps);
	UpdateCurrPerc(ps);
	UpdateRatDiff(ps);
	if (typeof PercGroups[ps] !== 'undefined') {
		var lb = document.getElementById(ps+'lockedbtn');
		if (lb.style.display != 'none') {
			PercGroups[ps].forEach(CopyCurrRat);
			function CopyCurrRat(pss) {
				document.getElementById(pss+'currrat').value = currrat.value;
				UpdateCurrPerc(pss);
				UpdateRatDiff(pss);
				UpdateGraph(pss);
			}
		}
	}
	UpdateGraph(ps);
}

function CorrectCurrRat(ps) {
	var currrat = document.getElementById(ps+'currrat');
	if (!currrat.disabled) {
		var s = currrat.value.trim();
		var n = Number(s);
		n = ((isNaN(n)) ? 0 : Math.max(Math.round(n+DblCalcDev),0));
		s = n.toString();
		if (s != currrat.value) currrat.value = s;
	}
}

function UpdateCurrPerc(ps) {
	var currperc = document.getElementById(ps+'currperc');
	if (!currperc.disabled) {
		var currrat = document.getElementById(ps+'currrat');
		var csps = ReplaceArmourType(ps);
		var pb = CalcStat(csps+'PBonus',PlayerLvl);
		var pr = PenRatings[ps];
		var pen = ((typeof pr === 'undefined') ? 0 : Penetrations[PenIndex][pr]);
		var p = (CalcStat(csps+'PRatP',PlayerLvl,Number(currrat.value)+pen)+0.0002+pb+DblCalcDev).toFixed(1).toString();
		currperc.innerHTML = p+((p.includes('.')) ? '%' : '.0%');
	}
}

function ProcessTargPerc(targperc) {
    var ps = targperc.id.replace('targperc','');
	CorrectTargPerc(ps);
	UpdateTargRat(ps);
	UpdateRatDiff(ps);
	UpdateGraph(ps);
}

function CorrectTargPerc(ps) {
	var targperc = document.getElementById(ps+'targperc');
	if (!targperc.disabled) {
		var csps = ReplaceArmourType(ps);
		var pb = CalcStat(csps+'PBonus',PlayerLvl);
		var s = targperc.value.trim().replace('%','');
		var n = Number(s);
		n = ((isNaN(n)) ? pb : Math.min(Math.max(n.toFixed(1),pb),(CalcStat(csps+'PratPCap',PlayerLvl)+pb+DblCalcDev).toFixed(1)));
		s = n.toString();
		s = s+((s.includes('.')) ? '%' : '.0%');
		if (s != targperc.value) targperc.value = s;
	}
}

function UpdateTargRat(ps) {
	var targrat = document.getElementById(ps+'targrat');
	if (!targrat.disabled) {
		var targperc = document.getElementById(ps+'targperc');
		var csps = ReplaceArmourType(ps);
		var pb = CalcStat(csps+'PBonus',PlayerLvl);
		var pr = PenRatings[ps];
		var pen = ((typeof pr === 'undefined') ? 0 : Penetrations[PenIndex][pr]);
		var r = Math.ceil(CalcStat(csps+'PPRat',PlayerLvl,Number(targperc.value.replace('%',''))-pb)-pen-DblCalcDev);
		targrat.innerHTML = r;
	}
}

function UpdateRatDiff(ps) {
	var ratdiff = document.getElementById(ps+'ratdiff');
	if (!ratdiff.disabled) {
		var currrat = document.getElementById(ps+'currrat');
		var targrat = document.getElementById(ps+'targrat');
		var diff = Number(currrat.value)-Number(targrat.innerHTML);
		ratdiff.innerHTML = diff;
		ratdiff.style.backgroundColor = ((diff == 0) ? DiffColorZero : ((diff < 0) ? DiffColorNeg : DiffColorPos));
	}
}

function ReplaceArmourType(ps) {
	return ((ps == 'phymit' || ps == 'ofmit' || ps == 'tacmit') ? 'Mit'+ArmourTypes[ArmourType] : ps);
}

function MakeSelection(sel) {
	var popup = document.getElementById('popup');
	var pusel = document.getElementById('pu-sel-'+sel);
	if (popup.hidden || (!popup.hidden && pusel.hidden)) {
		popup.hidden = true;
		document.getElementById('pu-sel-class').hidden = true;
		document.getElementById('pu-sel-level').hidden = true;
		document.getElementById('pu-sel-pen').hidden = true;
		document.getElementById('pu-sel-graph').hidden = true;
		pusel.hidden = false;
		if (sel == 'class') {
			popup.style.left = (Number(document.getElementById('calc').offsetLeft)+62).toString()+'px';
			popup.style.top = (Number(document.getElementById('calc').offsetTop)+67).toString()+'px';
			popup.hidden = false;
		} else if (sel == 'level') {
			popup.style.left = (Number(document.getElementById('calc').offsetLeft)+68).toString()+'px';
			popup.style.top = (Number(document.getElementById('calc').offsetTop)+67).toString()+'px';
			popup.hidden = false;
			document.getElementById('level-sel-range').min = 1;
			document.getElementById('level-sel-range').max = LevelCap;
			document.getElementById('level-sel-range').value = PlayerLvl;
		} else if (sel == 'pen') {
			popup.style.left = (Number(document.getElementById('calc').offsetLeft)+367).toString()+'px';
			popup.style.top = (Number(document.getElementById('calc').offsetTop)+67).toString()+'px';
			popup.hidden = false;
			popup.style.left = (621-Number(popup.offsetWidth)).toString()+'px';
		} else if (sel == 'graph') {
			popup.style.left = (Number(document.getElementById('graph').offsetLeft)+62).toString()+'px';
			popup.style.top = (Number(document.getElementById('graph').offsetTop)+67).toString()+'px';
			popup.hidden = false;
		}
	} else {
		popup.hidden = true;
		pusel.hidden = true;
	}
}

function CloseSelection() {
	document.getElementById('popup').hidden = true;
	document.getElementById('pu-sel-class').hidden = true;
	document.getElementById('pu-sel-level').hidden = true;
	document.getElementById('pu-sel-pen').hidden = true;
	document.getElementById('pu-sel-graph').hidden = true;
}

function SelectClass(classname) {
	PlayerClass = classname;
	document.getElementById('popup').hidden = true;
	document.getElementById('pu-sel-class').hidden = true;
	ChangeClass();
	PercTags.forEach(UpdatePerc);
}

function SelectLevel(value) {
	PlayerLvl = Number(value);
	document.getElementById('popup').hidden = true;
	document.getElementById('pu-sel-level').hidden = true;
	ChangeLevel();
	PercTags.forEach(UpdatePerc);
}

function LvlRangeUpdate(value) {
	if (!document.getElementById('popup').hidden) 
		document.getElementById('level-number').innerHTML = value;
}

function SelectPen(penname) {
	PenIndex = Penetrations.findIndex(function(pen){return (pen.name == penname);});
	document.getElementById('popup').hidden = true;
	document.getElementById('pu-sel-pen').hidden = true;
	ChangePen();
	PercTags.forEach(UpdatePerc);
}

function SelectGraph(percname) {
	GraphPerc = percname;
	document.getElementById('popup').hidden = true;
	document.getElementById('pu-sel-graph').hidden = true;
	ChangeGraph();
}

function ChangeClass() {
	var lis = document.getElementById('class-sel-list').getElementsByTagName('li');
	var i;
	for (i = 0; i < lis.length; i++) {
		if (lis[i].getAttribute('data-classname') == PlayerClass) {
			document.getElementById('class-symb').setAttribute('src',lis[i].getElementsByTagName('img')[0].getAttribute('src'));
			document.getElementById('class-name').innerHTML = lis[i].getElementsByTagName('div')[0].innerHTML;
			break;
		}
	} 
	ArmourType = CalcStat(PlayerClass+'CDArmourType',PlayerLvl);
	var OldCanBlock = CanBlock;
	CanBlock = (CalcStat(PlayerClass+'CDCanBlock',PlayerLvl) > 0);
	if (OldCanBlock != CanBlock) {
		if (CanBlock) 
			EnablePercGroup('block');
		else
			DisablePercGroup('block');
	}
}

function ChangeLevel() {
	document.getElementById('level-number').innerHTML = PlayerLvl.toString();
	ArmourType = CalcStat(PlayerClass+'CDArmourType',PlayerLvl);
	var OldCanBlock = CanBlock;
	CanBlock = (CalcStat(PlayerClass+'CDCanBlock',PlayerLvl) > 0);
	if (OldCanBlock != CanBlock) {
		if (CanBlock) 
			EnablePercGroup('block');
		else
			DisablePercGroup('block');
	}
	UpdatePenetrations();
}

function ChangePen() {
	var lis = document.getElementById('pen-sel-list').getElementsByTagName('li');
	var i;
	for (i = 0; i < lis.length; i++) {
		if (lis[i].getAttribute('data-penname') == Penetrations[PenIndex].name) {
			var span = lis[i].firstElementChild;
			document.getElementById('pen-desc').innerHTML = span.getElementsByTagName('p')[0].innerHTML;
			document.getElementById('pen-slot').setAttribute('src',span.getElementsByTagName('img')[0].getAttribute('src'));
			break;
		}
	} 
}

function ChangeGraph() {
	var lis = document.getElementById('graph-sel-list').getElementsByTagName('li');
	var i;
	for (i = 0; i < lis.length; i++) {
		if (lis[i].getAttribute('data-percname') == GraphPerc) {
			var span = lis[i].firstElementChild;
			document.getElementById('perc-deco').setAttribute('src',span.getElementsByTagName('img')[0].getAttribute('src'));
			document.getElementById('perc-name').innerHTML = span.getElementsByTagName('p')[0].innerHTML;
			break;
		}
	} 
	graphconfig.options.title.text = document.getElementById('perc-name').innerHTML;
	UpdateGraphData();
	window.myLine.update();
}

function UpdatePerc(ps) {
	UpdateCurrPerc(ps);
	CorrectTargPerc(ps);
	UpdateTargRat(ps);
	UpdateRatDiff(ps);
	UpdateGraph(ps);
}

function DisablePercGroup(ps) {
	if (typeof PercGroups[ps] !== 'undefined') {
		document.getElementById(ps+'lockedbtn').style.display = 'none';
		document.getElementById(ps+'unlockedbtn').style.display = 'none';
		DisablePerc(ps);
		PercGroups[ps].forEach(DisablePerc);
		function DisablePerc(pss) {
			document.getElementById(pss+'lbl').disabled = true;
			document.getElementById(pss+'currrat').disabled = true;
			document.getElementById(pss+'currrat').value = 0;
			document.getElementById(pss+'currperc').disabled = true;
			document.getElementById(pss+'currperc').innerHTML = '-';
			document.getElementById(pss+'targperc').disabled = true;
			document.getElementById(pss+'targperc').value = 0;
			document.getElementById(pss+'targrat').disabled = true;
			document.getElementById(pss+'targrat').innerHTML = '-';
			document.getElementById(pss+'ratdiff').disabled = true;
			document.getElementById(pss+'ratdiff').innerHTML = '-';
			document.getElementById(pss+'ratdiff').style.backgroundColor = DiffColorZero;
		}
	}
}

function EnablePercGroup(ps) {
	if (typeof PercGroups[ps] !== 'undefined') {
		document.getElementById(ps+'lockedbtn').style.display = 'block';
		EnablePerc(ps);
		PercGroups[ps].forEach(EnablePerc);
		function EnablePerc(pss) {
			document.getElementById(pss+'lbl').disabled = false;
			document.getElementById(pss+'currrat').disabled = false;
			document.getElementById(pss+'currrat').value = '0';
			document.getElementById(pss+'currperc').disabled = false;
			document.getElementById(pss+'targperc').disabled = false;
			document.getElementById(pss+'targperc').value = '999';
			document.getElementById(pss+'targrat').disabled = false;
			document.getElementById(pss+'ratdiff').disabled = false;
			UpdatePerc(pss);
		}
		ProcessUnlockedBtn(document.getElementById(ps+'unlockedbtn'));
	}
}

var GraphInit = false;
var GraphPoints = 1001;
var Interval0 = 0;
var Interval1 = 0;
var Fix1 = {r: 0, p: 0};
var Interval2 = 0;
var Fix2 = {r: 0, p: 0};
var Interval3 = GraphPoints-1;
var GraphType = 2;
var NxScale;
var NyScale;

var graphconfig = {
	type: 'line',
	data: {
		datasets: [{
			label: ' ',
			backgroundColor: 'grey',
			borderColor: 'grey',
			borderWidth: 3,
			fill: false
		}, {
			label: ' ',
			backgroundColor: 'red',
			borderColor: 'red',
			borderWidth: 3,
			fill: false
		}, {
			label: ' ',
			backgroundColor: 'blue',
			borderColor: 'blue',
			borderWidth: 5,
			fill: false
		}, {
			label: ' ',
			backgroundColor: 'green',
			borderColor: 'green',
			borderWidth: 5,
			fill: false
		}]
	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		title: {
			display: true,
			text: ' ',
			fontSize: 18
		},
		tooltips: {
			mode: 'nearest',
			intersect: false,
			callbacks: {
				title: function(tooltipItem, data) {
					switch(tooltipItem[0].index) {
						case Interval1:
							return Fix1.r.toString();
						case Interval2:
							if (GraphType <= 2)
								return Fix2.r.toString();
						default:
							return RoundDbl(data.labels[tooltipItem[0].index],1);
					}
				},
				label: function(tooltipItem, data) {
					switch(tooltipItem.index) {
						case Interval1:
							if (tooltipItem.datasetIndex == 3)
								return Fix1.p+'%';
							break;
						case Interval2:
							if ((GraphType == 1 && tooltipItem.datasetIndex == 2) || (GraphType == 2 && tooltipItem.datasetIndex == 1))
								return Fix2.p+'%';
							else if (GraphType != 3)
								break;
						default:
							return RoundDbl(tooltipItem.value,2)+'%';
					}
				}
			}
		},
		elements: {
			point: {
				radius: 0
			}
		},
		scales: {
			x: {
				display: true,
				min: 0,
				scaleLabel: {
					display: true,
					labelString: ' '
				},
				ticks: {
					major: {
						enabled: true
					},
					fontSize: function(context) {
						return context.tick.major ? 14 : 0;
					},
					callback: function(value, index, values) {
                        return RoundDbl(value,0).toString();
                    },
					maxRotation: 0,
					padding: 5
				},
				afterBuildTicks: function(scale) {
					const ticks = scale.ticks;
					for (let i = 0; i < ticks.length; i++) {
						ticks[i].major = (ticks[i].value/NxScale.getTickSpacing() == Math.round(ticks[i].value/NxScale.getTickSpacing()));
					}
					scale.ticks = ticks;
				},
				gridLines: {
					color: function(context) {
						return context.tick.major ? (context.tick.value ? 'grey' : 'black') : 'lightgrey';
					},
					lineWidth: function(context) {
						return context.tick.major ? (context.tick.value ? 1 : 2) : 1;
					},
					/*z: function(context) {
						return context.tick.major ? (context.tick.value ? -200 : -100) : -300; //sadly does not work
					},*/
					drawTicks: false
				},
				type: 'linear'
			},
			y: {
				beginAtZero: true,
				display: true,
				scaleLabel: {
					display: true,
					labelString: ' '
				},
				ticks: {
					major: {
						enabled: true
					},
					fontSize: function(context) {
						return context.tick.major ? 14 : 0;
					},
					callback: function(value, index, values) {
                        return value+'%';
                    },
					padding: 5
				},
				afterBuildTicks: function(scale) {
					const ticks = scale.ticks;
					for (let i = 0; i < ticks.length; i++) {
						ticks[i].major = (ticks[i].value/NyScale.getTickSpacing() == Math.round(ticks[i].value/NyScale.getTickSpacing()));
					}
					scale.ticks = ticks;
				},
				gridLines: {
					color: function(context) {
						return context.tick.major ? (context.tick.value ? 'grey' : 'black') : 'lightgrey';
					},
					lineWidth: function(context) {
						return context.tick.major ? (context.tick.value ? 1 : 2) : 1;
					},
					drawTicks: false
				},
				type: 'linear'
			}
		}
	}
};
		
function InitGraph() {
	var lis = document.getElementById('graph-sel-list').getElementsByTagName('li');
	var i;
	for (i = 0; i < lis.length; i++) {
		if (lis[i].getAttribute('data-percname') == GraphPerc) {
			var span = lis[i].firstElementChild;
			document.getElementById('perc-deco').setAttribute('src',span.getElementsByTagName('img')[0].getAttribute('src'));
			document.getElementById('perc-name').innerHTML = span.getElementsByTagName('p')[0].innerHTML;
			break;
		}
	}
	var gc = document.getElementById('graphcontainer');
	graphconfig.data.datasets[0].label = gc.getAttribute('data-lblremaining');
	graphconfig.data.datasets[1].label = gc.getAttribute('data-lblundertarget');
	graphconfig.data.datasets[2].label = gc.getAttribute('data-lblabovetarget');
	graphconfig.data.datasets[3].label = gc.getAttribute('data-lblcurrent');
	graphconfig.options.scales.x.scaleLabel.labelString = gc.getAttribute('data-lblrating');
	graphconfig.options.scales.y.scaleLabel.labelString = gc.getAttribute('data-lblperc');
	NxScale = new NiceScale(0,100,9);
	NyScale = new NiceScale(0,100,9);
	GraphInit = true;
	UpdateGraphData();
	Chart.defaults.fontSize = 14;
	Chart.defaults.fontColor = 'black';
	window.myLine = new Chart(document.getElementById('graphcanvas').getContext('2d'),graphconfig);
}

function UpdateGraph(ps) {
	if (ps == GraphPerc && GraphInit) {
		UpdateGraphData();
		window.myLine.update();
	}
}

function UpdateGraphData() {
	if (!GraphInit) return;

	var ps = GraphPerc;
	var PD_LinkCurRat = Number(document.getElementById(ps+'currrat').value);
	var PD_LinkCurPerc = Number(document.getElementById(ps+'currperc').innerHTML.replace('%','').replace('-',''));
	var PD_LinkTgtPerc = Number(document.getElementById(ps+'targperc').value.replace('%','').replace('-',''));
	var PD_LinkTgtRat = Number(document.getElementById(ps+'targrat').innerHTML);
	var csps = ReplaceArmourType(ps);
	var PD_Poff = CalcStat(csps+'PBonus',PlayerLvl);
	var pr = PenRatings[ps];
	var PD_Pen = ((typeof pr === 'undefined') ? 0 : Penetrations[PenIndex][pr]);
	var PD_RcapTotal = Math.ceil(CalcStat(csps+'PRatPCapR',PlayerLvl)-PD_Pen-DblCalcDev);
	var PD_PcapTotal = Math.ceil(CalcStat(csps+'PRatPCap',PlayerLvl)+PD_Poff-DblCalcDev);

	graphconfig.options.title.text = document.getElementById('perc-name').innerHTML+document.getElementById('graphcontainer').getAttribute('data-lblcapinfo').replace('#capperc',PD_PcapTotal).replace('#caprat',PD_RcapTotal);
	
	var Rmax, Rstep;
	NxScale.setMinMaxPoints(0,((PD_LinkCurRat <= PD_RcapTotal) ? PD_RcapTotal*1.05 : PD_LinkCurRat*1.02));
	Rmax = NxScale.getNiceUpperBound();
	Rstep = Rmax/(GraphPoints-1);

	var Pmax;
	NyScale.setMinMaxPoints(0,PD_PcapTotal);
	Pmax = NyScale.getNiceUpperBound();
	
	if (PD_LinkCurRat > PD_LinkTgtRat) {
		Interval1 = Math.round(PD_LinkTgtRat/Rstep+DblCalcDev);
		Fix1.r = PD_LinkTgtRat;
		Fix1.p = PD_LinkTgtPerc;
		Interval2 = Math.round(PD_LinkCurRat/Rstep+DblCalcDev);
		Fix2.r = PD_LinkCurRat;
		Fix2.p = PD_LinkCurPerc;
		Interval3 = GraphPoints-1;
		GraphType = 1;
	} else if (PD_LinkCurRat < PD_LinkTgtRat) {
		Interval1 = Math.round(PD_LinkCurRat/Rstep+DblCalcDev);
		Fix1.r = PD_LinkCurRat;
		Fix1.p = PD_LinkCurPerc;
		Interval2 = Math.round(PD_LinkTgtRat/Rstep+DblCalcDev);
		Fix2.r = PD_LinkTgtRat;
		Fix2.p = PD_LinkTgtPerc;
		Interval3 = GraphPoints-1;
		GraphType = 2;
	} else {
		Interval1 = Math.round(PD_LinkCurRat/Rstep+DblCalcDev);
		Fix1.r = PD_LinkCurRat;
		Fix1.p = PD_LinkCurPerc;
		Interval2 = GraphPoints-1;
		GraphType = 3;
	}
	
	var	GDRating = [];
	var GDRemain = [];
	var GDUnder = [];
	var GDAbove = [];
	var GDCurrent = [];

	var r;
	var p;
	for (var i = 0; i < GraphPoints; i++) {
		r = i*Rstep;
		GDRating.push(r);
		p = PD_Poff+CalcStat(csps+'PRatP',PlayerLvl,r+PD_Pen);
		switch(GraphType) {
			case 1:
				GDCurrent.push(((Interval0 <= i && i <= Interval1) ? p : NaN));
				GDAbove.push(((Interval1 <= i && i <= Interval2) ? p : NaN));
				GDRemain.push(((Interval2 <= i && i <= Interval3) ? p : NaN));
				GDUnder.push(NaN);
				break;
			case 2:
				GDCurrent.push(((Interval0 <= i && i <= Interval1) ? p : NaN));
				GDUnder.push(((Interval1 <= i && i <= Interval2) ? p : NaN));
				GDRemain.push(((Interval2 <= i && i <= Interval3) ? p : NaN));
				GDAbove.push(NaN);
				break;
			case 3:
				GDCurrent.push(((Interval0 <= i && i <= Interval1) ? p : NaN));
				GDRemain.push(((Interval1 <= i && i <= Interval2) ? p : NaN));
				GDUnder.push(NaN);
				GDAbove.push(NaN);
		}
	}
	
	graphconfig.data.labels = GDRating;
	graphconfig.data.datasets[0].data = GDRemain;
	graphconfig.data.datasets[1].data = GDUnder;
	graphconfig.data.datasets[2].data = GDAbove;
	graphconfig.data.datasets[3].data = GDCurrent;
	graphconfig.options.scales.x.suggestedMax = Rmax;
	graphconfig.options.scales.x.ticks.maxTicksLimit = 999;
	graphconfig.options.scales.x.ticks.stepSize = NxScale.getTickSpacing()/((Rmax/NxScale.getTickSpacing() >= 8) ? 5 : 10);
	graphconfig.options.scales.y.suggestedMax = Pmax;
	graphconfig.options.scales.y.ticks.maxTicksLimit = 999;
	graphconfig.options.scales.y.ticks.stepSize = NyScale.getTickSpacing()/((Pmax/NyScale.getTickSpacing() >= 6) ? 5 : 10);
}

function NiceScale (_lowerBound, _upperBound, _maxTicks) {

  var lowerBound = _lowerBound;
  var upperBound = _upperBound;
  var maxTicks = _maxTicks || 10;
  var tickSpacing;
  var range;
  var niceLowerBound;
  var niceUpperBound;

  calculate();

  this.setMaxTicks = function (_maxTicks) {
    maxTicks = _maxTicks;
    calculate();
  };

  this.getNiceUpperBound = function() {
    return niceUpperBound;
  };

  this.getNiceLowerBound = function() {
    return niceLowerBound;
  };

  this.getTickSpacing = function() {
    return tickSpacing;
  };

  this.setMinMaxPoints = function (min, max) {
    lowerBound = min;
    upperBound = max;
    calculate();
  };

  function calculate () {
    range = niceNum(upperBound - lowerBound, false);
    tickSpacing = niceNum(range / (maxTicks - 1), true);
    niceLowerBound = Math.floor(lowerBound / tickSpacing) * tickSpacing;
    niceUpperBound = Math.ceil(upperBound / tickSpacing) * tickSpacing;
  };

  function niceNum (range, round) {
    var exponent = Math.floor(Math.log10(range));
    var fraction = range / Math.pow(10, exponent);
    var niceFraction;

    if (round) {
      if (fraction < 1.5) niceFraction = 1;
      else if (fraction < 3) niceFraction = 2;
      else if (fraction < 7) niceFraction = 5;
      else niceFraction = 10;
    } else {
      if (fraction <= 1) niceFraction = 1;
      else if (fraction <= 2) niceFraction = 2;
      else if (fraction <= 5) niceFraction = 5;
      else niceFraction = 10;
    }

    return niceFraction * Math.pow(10, exponent);
  }
}

function ShowNotes() {
	document.getElementById('notes').hidden = false;
	document.getElementById('notes-text').scrollTop = 0;
}

function CloseNotes() {
	document.getElementById('notes').hidden = true;
}
