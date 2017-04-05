// Funds transfer slider elements
var transferSlider = document.querySelector('#transfer-slider')
var transferReadout = document.querySelector('#transfer-value')

// Pricing display elements
var liberacPricing = document.querySelector('#liberac_pricing')
var competitorPricing = document.querySelector('#competitor_pricing')
var selectedCompetitor = document.querySelector('#competitor_options')

// Update the pricing displays when clicking the scale
transferSlider.onchange = function() {
  transferReadout.innerHTML = '$' + transferSlider.value
  updatePrice('liberac')
  updatePrice(selectedCompetitor.value)
}

// Update the pricing when flicking between competitors
selectedCompetitor.onchange = function() {
  updatePrice(selectedCompetitor.value)
}

// Contains the different pricing "algorithms" from other competitors + liberac
function getPrice(company, value) {
  switch(company) {
    case 'liberac':
      return '$' + (value + 100)
      break
    case 'klickex':
      return '$' + (value + 200)
      break
    case 'westernunion':
      return '$' + (value + 300)
      break
    case 'moneygram':
      return '$' + (value + 400)
      break
    case 'pacificezy':
      return '$' + (value + 500)
      break
    case 'anz':
      return '$' + (value + 600)
      break
    default:
      console.error('No competitor selected!')
      break
  }
}

// Updates the pricing display values with Liberac + competitors charges
function updatePrice(company) {
  switch(company) {
    case 'liberac':
      liberacPricing.value = getPrice(company, parseInt(transferSlider.value))
    case 'klickex':
    case 'westernunion':
    case 'moneygram':
    case 'pacificezy':
    case 'anz':
      competitorPricing.value = getPrice(company, parseInt(transferSlider.value))
      break
    default:
      console.error('No competitor to update?')
      break
  }
}

