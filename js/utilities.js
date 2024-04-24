function createTitle(titleText) {
    const titleEl = document.getElementsByClassName("showingOnScreen")[0];
    titleEl.innerHTML = titleText;
}

function formatNumber(number) {
    let numberStr = number.toString();
    
    if (numberStr.includes('.')) {
        let [integerPart, fractionalPart] = numberStr.split('.');
        fractionalPart = fractionalPart.length > 2 ? fractionalPart.slice(0, 2) : fractionalPart.padEnd(2, '0');
        numberStr = `${integerPart}.${fractionalPart}`;
    } else {
        // If there's no decimal part, add ".00"
        numberStr += ".00";
    }
    
    return numberStr;
}

export {createTitle, formatNumber}