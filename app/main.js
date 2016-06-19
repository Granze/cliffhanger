'use strict';

var climbingGrades = [['5.5', '4', '12', '13', 'IV', 'HVD/S 3c'], ['5.6', '4+', '13', '14', 'IV+/V-', 'MS 4a'], ['5.7', '5a', '14/15', '15', 'V-/V', 'S/HS 4b'], ['5.8', '5b', '15/16', '16', 'V+/VI-', 'HS/VS 4b'], ['5.9', '5c', '17', '17/18', 'VI-/VI', 'HVS 4c'], ['5.10a', '6a', '18', '19', 'VI/VI+', 'HVS 5a'], ['5.10b', '6a+', '19', '20', 'VII-', 'E1 5a'], ['5.10c', '6b', '20', '21', 'VII-/VII', 'E1 5b'], ['5.10d', '6b+', '20/21', '22', 'VII/VII+', 'E2 5b'], ['5.11a', '6c', '21', '22/23', 'VII+', 'E2 5c'], ['5.11b', '6c/6c+', '22', '23/24', 'VIII-', 'E3 5c'], ['5.11c', '6c+', '22/23', '24', 'VIII', 'E3 6a'], ['5.11d', '7a', '23', '25', 'VIII/VIII+', 'E4 6a'], ['5.12a', '7a+', '24', '26', 'VIII+', 'E4 6b'], ['5.12b', '7b', '25', '27', 'IX-', 'E5 6b'], ['5.12c', '7b+', '26', '28', 'IX-/IX', 'E5/E6 6b'], ['5.12d', '7c', '27', '29', 'IX/IX+', 'E6 6b'], ['5.13a', '7c+', '28', '30', 'IX+', 'E6 6c'], ['5.13b', '8a', '29', '31', 'X-', 'E7 6c'], ['5.13c', '8a+', '30', '32', 'X-/X', 'E7 7a'], ['5.13d', '8b', '31', '33', 'X/X+', 'E8 7a'], ['5.14a', '8b+', '32', '34', 'X+', 'E8 7b'], ['5.14b', '8c', '33', '35', 'XI-', 'E9 7b'], ['5.14c', '8c+', '34', '36', 'XI', 'E10 7b'], ['5.14d', '9a', '35', '37', 'XI+', 'E10 7c'], ['5.15a', '9a+', '36', '38', 'XI+/XII-', 'E11 7c'], ['5.15b', '9b', '37', '39', 'XII-/XII', 'E11 8a'], ['5.15c', '9b+', '38', '40', 'XII', 'E11 8b'], ['5.15d', '9c', '39', '41', 'XII+', 'E11 8c']];
var boulderingGrades = [['V1', '4'], ['V2', '5'], ['V3', '6a/b'], ['V4', '6c'], ['V5', '7a'], ['V6', '7a+'], ['V7', '7b'], ['V8', '7b+'], ['V9', '7c'], ['V10', '7c+'], ['V11', '8a'], ['V12', '8a+'], ['V13', '8b'], ['V14', '8b+'], ['V15', '8c'], ['V16', '8c+']];
var climbingLabels = ['USA (YDS)', 'France', 'Australia', 'South Africa', 'Germany (UIAA)', 'United Kingdom'];
var boulderLabels = ['USA (V-scale)', 'France'];

var inputGrade = document.getElementById('origin');
var output = document.getElementById('converted');
var outputSystem = document.getElementById('output-system');
var inputSystem = document.getElementById('input-system');
var grades = climbingGrades;
var labels = climbingLabels;
var selectedGrade = 0;
var selectedInputSystem = 0;
var selectedOutputSystem = 1;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js', { scope: '/' });
}

var convert = function convert() {
  var i = arguments.length <= 0 || arguments[0] === undefined ? selectedGrade : arguments[0];

  output.innerHTML = grades[i][selectedOutputSystem];
};

var fillGrades = function fillGrades() {
  var optTemplate = grades.map(function (grade, index) {
    return '<option value="' + index + '">' + grade[selectedInputSystem] + '</option>';
  });

  inputGrade.innerHTML = optTemplate.join('');
  inputGrade.selectedIndex = selectedGrade;
  convert();
};

var fillLabels = function fillLabels() {
  var optTemplate = labels.map(function (label, index) {
    return '<option value="' + index + '">' + label + '</option>';
  });

  inputSystem.innerHTML = optTemplate.join('');
  inputSystem.selectedIndex = selectedInputSystem;
  outputSystem.innerHTML = optTemplate.join('');
  outputSystem.selectedIndex = selectedOutputSystem;
  convert();
};

var activateButtons = function activateButtons() {
  document.querySelectorAll('#grade-type button').forEach(function (button) {
    button.classList.toggle('active');
  });
};

var reset = function reset() {
  selectedInputSystem = 0;
  selectedOutputSystem = 1;
  selectedGrade = 0;
};

var init = function init() {
  inputSystem.selectedIndex = selectedInputSystem;
  outputSystem.selectedIndex = selectedOutputSystem;
  fillGrades();
  fillLabels();
};

document.getElementById('select').addEventListener('change', function (e) {
  var nodeId = e.target.attributes.id.nodeValue;

  if (nodeId === 'input-system') {
    selectedInputSystem = e.target.value;
    fillGrades();
  } else if (nodeId === 'output-system') {
    selectedOutputSystem = e.target.value;
    convert();
  } else {
    selectedGrade = e.target.value;
    convert();
  }
});

document.getElementById('grade-type').addEventListener('click', function (e) {
  var nodeId = e.target.attributes.id.nodeValue;
  activateButtons();

  if (nodeId === 'climbing-grades') {
    labels = climbingLabels;
    grades = climbingGrades;
  } else {
    labels = boulderLabels;
    grades = boulderingGrades;
  }
  reset();
  init();
});

init();
