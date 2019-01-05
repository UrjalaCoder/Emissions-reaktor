var perCapita = false;
const MAX = 6;

// Remove button handler -->
// Removes item from list
function removeItem(target) {
    let countryName = target.dataset.country || "undefined";
    let list = $("#dataSetList");
    let searchString = `button[data-country="${countryName}"]`;
    list.find(searchString).remove();
    delete shownData[countryName];
    updateGraph();
}



// Add item to list
function addCountryToList(countryName, color) {
    console.log(color);
    let dataList = $("#dataSetList");
    let whiteSpaceCountry = countryName.split(" ").join("_");
    // let removeButton = `<button data-country="${countryName}" class="btn btn-danger removeButton" onclick="removeItem(this)">Remove</button>`;
    // let colorDiv = `<div data-country=${whiteSpaceCountry} class="colorRectangle"></div>`;
    // let colorDivElement = $(colorDiv);
    // colorDivElement.css("background-color", color.toString());
    // let finalElement = `<li class="countryItem" data-country="${whiteSpaceCountry}">${countryName} ${removeButton}</li>`;

    let stylingClasses = "list-group-item list-group-item-action countryItem";
    let countryItem = `<button
                            type="button"
                            data-country="${whiteSpaceCountry}"
                            onclick="removeItem(this)"
                            class="${stylingClasses}"
                        >
                            ${countryName}
                        </button>`;

    let finalElement = $(countryItem);
    finalElement.css("background-color", COLORS[color].toString());

    dataList.append($(finalElement));
}

// Add button handler -->
function handleAddButton(button) {
    let spinnerValue = $("#dropDown").val();
    if(!spinnerValue || spinnerValue === "") {
        return;
    }

    let keyName = spinnerValue.split(" ").join("_");
    if(keyName in shownData) {
        return;
    }

    if(Object.keys(shownData).length >= MAX) {
        return;
    }

    getData(keyName, function(data) {
        if(!graph) {
            createGraph();
        }

        // Generate color -->
        let colorIndex = Math.floor(Math.random() * COLORS.length);
        let alreadyUsed = Object.keys(shownData).map((element) => {
            if(shownData[element]['colorIndex']) {
                return shownData[element]['colorIndex'];
            }
        });
        console.log(alreadyUsed);
        while(colorIndex.indexOf(alreadyUsed) !== -1) {
            colorIndex = Math.floor(Math.random() * COLORS.length);
        }

        console.log(colorIndex);
        shownData[keyName] = data;
        shownData[keyName]['colorIndex'] = colorIndex;
        addCountryToList(keyName.split("_").join(" "), shownData[keyName]['colorIndex']);
        updateGraph();
    });
}

function handlePerCapita(button) {
    perCapita = !perCapita;
    updateGraph();
    $(button).toggleClass("active");
}
