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
    "higher_fee_percentage": 0.052,
    "lower_fee_percentage": 0.042
  },
  "klickex": {
    "fixed": 3.00,
    "exchange_rate": 1.74,
    "higher_fee_percentage": 0.0588,
    "lower_fee_percentage": 0.0477
  },
  "westernunion": {
    "fixed": 14.00,
    "exchange_rate": 1.70,
    "higher_fee_percentage": 0.1340,
    "lower_fee_percentage": 0.0920
  },
  "moneygram": {
    "fixed": 10.00,
    "exchange_rate": 1.74,
    "higher_fee_percentage": 0.0936,
    "lower_fee_percentage": 0.0636
  },
  "pacificezy": {
    "fixed": 8.00,
    "exchange_rate": 1.75,
    "higher_fee_percentage": 0.0781,
    "lower_fee_percentage": 0.0541
  },
  "anz": {
    "fixed": 28.00,
    "exchange_rate": 1.71,
    "higher_fee_percentage": 0.2025,
    "lower_fee_percentage": 0.1185
  }
}

function calculateFees(company, value) {
  console.log(company)
  if (value < 199) {
    let lower_fee = fees[company].lower_fee_percentage
    return new Intl.NumberFormat('latn', { style: 'currency', currency: 'NZD' }).format(value * lower_fee) 
  } else if (value === 200) {
    let lower_fee = fees[company].lower_fee_percentage
    return new Intl.NumberFormat('latn', { style: 'currency', currency: 'NZD' }).format(value * lower_fee)  
  } else if (value > 200 && value < 499) {
    let middle_fee = (fees[company].higher_fee_percentage + fees[company].lower_fee_percentage) / 2
    return new Intl.NumberFormat('latn', { style: 'currency', currency: 'NZD' }).format(value * middle_fee)
  } else if (value === 500) {
    let higher_fee = fees[company].higher_fee_percentage
    return new Intl.NumberFormat('latn', { style: 'currency', currency: 'NZD' }).format(value * higher_fee)
  } else if (value > 500) {
    let higher_fee = fees[company].higher_fee_percentage
    return new Intl.NumberFormat('latn', { style: 'currency', currency: 'NZD' }).format(value * higher_fee)
  }
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

