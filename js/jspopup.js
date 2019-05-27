window.addEventListener('load', (event)=>{
  createWidget();
});

function createWidget() {
  fetch('https://api.exchangeratesapi.io/latest')
  .then(response => {
    return response.json();
  })
  .then(result => {
    result.rates.EUR = 1;
    let selectContainer = document.createElement('div');
    selectContainer.classList.add('select-container');
    selectContainer.addEventListener('change', event => {
      if(event.target.id == 'firstInput') {
        if(firstSelect.value == 'EUR') {
          secondInput.value = eurToOtherCurr(firstInput.value, result.rates[secondSelect.value]).toFixed(2);
        } else if (secondSelect.value == 'EUR') {
          secondInput.value = otherCurrToEur(firstInput.value, result.rates[firstSelect.value]).toFixed(2);
        } else {
          secondInput.value = otherCurrToOtherCurr(firstInput.value, result.rates[firstSelect.value], result.rates[secondSelect.value]).toFixed(2);
        }

        if(secondInput.value == 0) {
          secondInput.value = '';
        }
      } else {
        if(secondSelect.value == 'EUR') {
          firstInput.value = eurToOtherCurr(secondInput.value, result.rates[firstSelect.value]).toFixed(2);
        } else if (firstSelect.value == 'EUR') {
          firstInput.value = otherCurrToEur(secondInput.value, result.rates[secondSelect.value]).toFixed(2);
        } else {
          firstInput.value = otherCurrToOtherCurr(secondInput.value, result.rates[secondSelect.value], result.rates[firstSelect.value]).toFixed(2);
        }

        if(firstInput.value == 0) {
          firstInput.value = '';
        }
      }
    });

    let firstSelect = createSelect(Object.keys(result.rates).sort(), 'EUR');
    firstSelect.id = 'firstSelect';
    selectContainer.appendChild(firstSelect);

    let secondSelect = createSelect(Object.keys(result.rates).sort(), 'USD');
    secondSelect.id = 'secondSelect';
    selectContainer.appendChild(secondSelect);
    document.querySelector('#widget').appendChild(selectContainer);

    let inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container');

    inputContainer.addEventListener('input', event => {
      if(event.target.id == 'firstInput') {
        if(firstSelect.value == 'EUR') {
          secondInput.value = eurToOtherCurr(firstInput.value, result.rates[secondSelect.value]).toFixed(2);
        } else if (secondSelect.value == 'EUR') {
          secondInput.value = otherCurrToEur(firstInput.value, result.rates[firstSelect.value]).toFixed(2);
        } else {
          secondInput.value = otherCurrToOtherCurr(firstInput.value, result.rates[firstSelect.value], result.rates[secondSelect.value]).toFixed(2);
        }

        if(secondInput.value == 0) {
          secondInput.value = '';
        }
      } else {
        if(secondSelect.value == 'EUR') {
          firstInput.value = eurToOtherCurr(secondInput.value, result.rates[firstSelect.value]).toFixed(2);
        } else if (firstSelect.value == 'EUR') {
          firstInput.value = otherCurrToEur(secondInput.value, result.rates[secondSelect.value]).toFixed(2);
        } else {
          firstInput.value = otherCurrToOtherCurr(secondInput.value, result.rates[secondSelect.value], result.rates[firstSelect.value]).toFixed(2);
        }

        if(firstInput.value == 0) {
          firstInput.value = '';
        }
      }
    });

    let firstInput = createInput();
    firstInput.id = 'firstInput';
    firstInput.placeholder = 0;
    firstInput.step = '0.0001';
    inputContainer.appendChild(firstInput);

    let secondInput = createInput();
    secondInput.id = 'secondInput';
    secondInput.placeholder = 0;
    secondInput.step = '0.0001';
    inputContainer.appendChild(secondInput);

    document.querySelector('#widget').appendChild(inputContainer);

    let switchButton = createSwitch();
    switchButton.addEventListener('click', event => {
      let switchFirstSelect = firstSelect.value;
      let switchSecondSelect = secondSelect.value;
      let switchFirstInput = firstInput.value;
      let switchSecondInput = secondInput.value;

      firstSelect.value = switchSecondSelect;
      secondSelect.value = switchFirstSelect;
      firstInput.value = switchSecondInput;
      secondInput.value = switchFirstInput;
    })
    document.querySelector('#widget').appendChild(switchButton);
  })
  .catch(err => console.log(err));
}

function createSelect(countriesArray, selectedCountry) {
  let select = document.createElement('select');
  countriesArray.forEach(country => {
    let option = document.createElement('option');
    option.value = country;
    option.textContent = country;
    if(country == selectedCountry) {
      option.selected = true;
    }
    select.appendChild(option);
  });
  return select;
}

function createInput() {
  let input = document.createElement('input');
  input.type = 'number';
  return input;
}

function createSwitch() {
  let button = document.createElement('button');
  button.type = 'button';
  button.id = 'switch';
  button.classList.add('switch');
  button.textContent = '↕️';
  return button;
}

function eurToOtherCurr(userInput, rate) {
  return userInput * rate;
}

function otherCurrToEur(userInput, rate) {
  return userInput / rate;
}

function otherCurrToOtherCurr(userInput, fromRate, toRate) {
  return userInput / fromRate * toRate;
}
