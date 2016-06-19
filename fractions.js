var NUMERATOR = 0;
var DENOMINATOR = 1;
var MAX_NUMERATOR = 48;
var MAX_DENOMINATOR = 12;

function newFractions() {
  var fraction = _generateFraction();
  console.log('Current Fraction', fraction);
  //dom.html(_displayFractions(fraction));

  return fraction;
}

function displayReducedFraction(dom, fraction) {
  dom.html('<h1>Reduced Fraction</h1>' + _displayFractions(fraction));
}

function _generateFraction() {
  var fraction = [];

  fraction.push(Math.floor(Math.random() * MAX_NUMERATOR) + 1);
  fraction.push(Math.floor(Math.random() * MAX_DENOMINATOR) + 1);

  return fraction;
}

function _displayFractions(fraction) {
  return '<div class="fraction"><div class="numerator">' + fraction[NUMERATOR] +
    '</div><div class="denominator">' + fraction[DENOMINATOR] + '</div></div>';
}

function _reduce(fraction) {
  // Divides evenly 1/n
  if (_isDivisible(fraction[DENOMINATOR], fraction[NUMERATOR])) {
    return [1, Math.floor(fraction[DENOMINATOR] / fraction[NUMERATOR])];
  }

  // Divides evenly n/1
  if (_isDivisible(fraction[NUMERATOR], fraction[DENOMINATOR])) {
    return [Math.floor(fraction[NUMERATOR] / fraction[DENOMINATOR]), 1];
  }

  fraction = _reducer(fraction, 2);
  fraction = _reducer(fraction, 3);
  fraction = _reducer(fraction, 5);
  fraction = _reducer(fraction, 7);
  fraction = _reducer(fraction, 11);
  fraction = _reducer(fraction, 13);
  return fraction;
}

function _reducer(fraction, num) {
  if (_isDivisible(fraction[NUMERATOR], num) && _isDivisible(fraction[DENOMINATOR], num)) {
    return _reducer([Math.floor(fraction[NUMERATOR] / num), Math.floor(fraction[DENOMINATOR] / num)], num);
  }

  return fraction;
}

function displayOriginalFraction(dom, fraction) {
  dom.html('<h1>Original Fraction</h1>' + _displayFractions(fraction));
}

function displayMixedFraction(dom, fraction) {
  var inner = '<h1>Mixed Fraction</h1>';

  if (fraction[0] > 0) {  
    inner += '<div class="mixed"><div class="whole">' + fraction[0] + '</div>';
  }

  if (fraction[NUMERATOR + 1] > 0) {
    inner += '<div class="fraction"><div class="numerator">' + fraction[NUMERATOR + 1] +
         '</div><div class="denominator">' + fraction[DENOMINATOR + 1] + '</div></div></div>';
  }
  dom.html(inner);
}

function _mixedFraction(fraction) {
  return [Math.floor(fraction[NUMERATOR] / fraction[DENOMINATOR]), 
          fraction[NUMERATOR] % fraction[DENOMINATOR],
          fraction[DENOMINATOR]];
}

function _isDivisible(num, divisor) {
  return num % divisor === 0;
}

function _clearDom(dom) {
  dom.html('');
}

$(document).ready(function() {
  console.log('Ready');

  var originalDom = $('#original');
  var simplifyDom = $('#simplify');
  var mixedDom = $('#mixed');
  var fraction = newFractions();
  displayOriginalFraction(originalDom, fraction);

  $('#more').on('click', function() {
    fraction = newFractions();
    displayOriginalFraction(originalDom, fraction);
    _clearDom(simplifyDom);
    _clearDom(mixedDom);
  });

  $('#solve').on('click', function() {
    var simplifiedFraction = _reduce(fraction);

    displayReducedFraction(simplifyDom, simplifiedFraction);
    displayMixedFraction(mixedDom, _mixedFraction(simplifiedFraction));

  });
});