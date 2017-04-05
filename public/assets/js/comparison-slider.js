// Funds transfer slider elements
var transferSlider = document.querySelector('#transfer-slider')
var transferReadout = document.querySelector('#transfer-value')

// Pricing display elements
var liberacFees = document.querySelector('#liberac_fees')
var liberacTotal = document.querySelector('#liberac_total')
var competitorFees = document.querySelector('#competitor_fees')
var competitorTotal = document.querySelector('#competitor_total')
var selectedCompetitor = document.querySelector('#competitor_options')

// Update the pricing displays when dragging the scale
transferSlider.onchange = function updateTransferSlider() {
  transferReadout.innerHTML = '$' + transferSlider.value
  updatePrice('liberac')
  updatePrice(selectedCompetitor.value)
}

// Update the pricing when flicking between competitors
selectedCompetitor.onchange = function updateCompetitor() {
  updatePrice(selectedCompetitor.value)
}

// Easiest to store all the fees as an object accessed in getPrice()
// Obviously, these aren't *live* amounts but it'll do for now

var fees = {
  "liberac": {
    "fixed": 2.00,
    "exchange_rate": 1.74,
    "fee_percentage": 0.03
  },
  "klickex": {
    "fixed": 3.00,
    "exchange_rate": 1.74,
    "fee_percentage": 0.0588
  },
  "westernunion": {
    "fixed": 14.00,
    "exchange_rate": 1.70,
    "fee_percentage": 0.1340
  },
  "moneygram": {
    "fixed": 10.00,
    "exchange_rate": 1.74,
    "fee_percentage": 0.0936
  },
  "pacificezy": {
    "fixed": 8.00,
    "exchange_rate": 1.75,
    "fee_percentage": 0.0781
  },
  "anz": {
    "fixed": 28.00,
    "exchange_rate": 1.71,
    "fee_percentage": 0.2025
  }
}

function calculateFees(company, value) {
  var full_fees = value * fees[company].fee_percentage
  var convertedCurrency = value * fees[company].exchange_rate
  var total = convertedCurrency - full_fees
  return new Intl.NumberFormat('latn', { style: 'currency', currency: 'WST' }).format(total)
}

// Updates the pricing display values with Liberac + competitors charges
function updatePrice(company) {
  switch(company) {
    case 'liberac':
      liberacFees.value = new Intl.NumberFormat('latn', { style: 'currency', currency: 'NZD' }).format(fees[company].fixed)
      liberacTotal.value = calculateFees(company, parseInt(transferSlider.value))
    case 'klickex':
    case 'westernunion':
    case 'moneygram':
    case 'pacificezy':
    case 'anz':
      competitorFees.value = new Intl.NumberFormat('latn', { style: 'currency', currency: 'NZD' }).format(fees[company].fixed)
      competitorTotal.value = calculateFees(company, parseInt(transferSlider.value))
      break
    default:
      console.error('No competitor to update?')
      break
  }
}

updatePrice('liberac')
updatePrice(selectedCompetitor.value)

