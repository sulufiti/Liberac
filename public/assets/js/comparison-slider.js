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

  updateCompetitorPrice(selectedCompetitor.value)
}

selectedCompetitor.onchange = function() {
  updateCompetitorPrice(selectedCompetitor.value)
}

function getLiberacPrice(value) {
  return '$' + (parseInt(value) + 10)
}

function getKlickexPrice(value) {
  return '$' + (parseInt(value) + 30)
}

function getSMPPrice(value) {
  return '$' + (parseInt(value) + 50)
}

function getWesternUnionPrice(value) {
  return '$' + (parseInt(value) + 999)
}

function updateCompetitorPrice(competitor) {
  switch(competitor) {
    case 'klickex':
      competitorPricing.value = getKlickexPrice(transferSlider.value)
      break
    case 'westernunion':
      competitorPricing.value = getWesternUnionPrice(transferSlider.value)
      break
    case 'sendmoneypacific':
      competitorPricing.value = getSMPPrice(transferSlider.value)
    default:
      console.log('No competitor selected?!')
  }
}

