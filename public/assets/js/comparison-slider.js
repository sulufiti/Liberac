// Transfer Funds Slider elements
var transferSlider = document.querySelector('#transfer-slider')
var transferReadout = document.querySelector('#transfer-value')

// Pricing display elements
var liberacPricing = document.querySelector('#liberac_pricing')
var competitorPricing = document.querySelector('#competitor_pricing')
var selectedCompetitor = document.querySelector('#competitor_options')

// Helper bits

transferSlider.onchange = function() {
  transferReadout.innerHTML = '$' + transferSlider.value
  liberacPricing.value = getLiberacPrice(transferSlider.value)

  switch(selectedCompetitor.value) {
    case 'clickex':
      competitorPricing.value = getClickexPrice(transferSlider.value)
      break
    case 'westernunion':
      competitorPricing.value = getWesternUnionPrice(transferSlider.value)
      break
    default:
      console.log('No competitor selected?!')
  }
}

function getLiberacPrice(value) {
  return '$' + (parseInt(value) + 10)
}

function getClickexPrice(value) {
  return '$' + (parseInt(value) + 30)
}

function getWesternUnionPrice(value) {
  return '$' + (parseInt(value) + 999)
}

