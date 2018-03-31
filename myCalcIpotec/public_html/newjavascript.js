/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function changePercentRange() {
    let percent = document.getElementById('percentRange').value;
    document.getElementById('percentText').value = percent;
    
}

function changePercentText() {
    let percent = document.getElementById('percentText').value;
    document.getElementById('percentRange').value = percent;
}

function calcPayment() {
    let aPayment, ammountCredit, percentCredit, countPeriod;
    let price = Number(document.getElementById('price').value);
    let initialPayment = Number(document.getElementById('initialPayment').value);
    let typePeriod = document.getElementById('typePeriod').value;
    
    ammountCredit = price - initialPayment;
    percentCredit = Number(document.getElementById('percentText').value)/100;
        
    let percentCreditMounth = percentCredit/12;
    countPeriod = Number(document.getElementById('period').value);
 
    if(typePeriod ==="лет")
        countPeriod = countPeriod * 12;
    let numerator = percentCreditMounth*Math.pow(1+percentCreditMounth,countPeriod);
    let denominator = Math.pow(1+percentCreditMounth,countPeriod)-1;
    let fraction = numerator/denominator;

    aPayment = (ammountCredit*fraction);
    let x = aPayment.toFixed(2);
    document.getElementById('result').value = x;
}

