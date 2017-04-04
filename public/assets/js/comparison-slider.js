var transferSlider = document.querySelector('#transfer-slider')
var transferReadout = document.querySelector('#transfer-value')

var liberacPricing = document.querySelector('#liberac_pricing')
var competitorPricing = document.querySelector('#competitor_pricing')

transferSlider.onchange = function() {
  transferReadout.innerHTML = '$' + transferSlider.value
  liberacPricing.value = getLiberacPrice(transferSlider.value)
  competitorPricing.value = getCompetitorPricing(transferSlider.value)
}

function getLiberacPrice(value) {
  value = parseInt(value)
  return '$' + (value + 10)
}

function getCompetitorPricing(value) {
  value = parseInt(value)
  return '$' + (value + 30)
}