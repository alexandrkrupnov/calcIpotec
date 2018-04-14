/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var aPayment, ammountCredit, percentCredit, countPeriod;
var percentCreditMonth;
var monthPaymentPercent = [];
var monthPaymentCredit = [];
var balance = [];

function changePercentRange() {
    let percent = document.getElementById('percentRange').value;
    document.getElementById('percentText').value = percent;
    
}

function changePercentText() {
    let percent = document.getElementById('percentText').value;
    document.getElementById('percentRange').value = percent;
}

function calcPayment() {
    
    let price = Number(document.getElementById('price').value);
    let initialPayment = Number(document.getElementById('initialPayment').value);
    let typePeriod = document.getElementById('typePeriod').value;
    
    ammountCredit = price - initialPayment;
    percentCredit = Number(document.getElementById('percentText').value)/100;
        
    percentCreditMonth = percentCredit/12;
    percentCreditMonth = parseFloat(percentCreditMonth.toFixed(4));
    countPeriod = Number(document.getElementById('period').value);
 
    if(typePeriod ==="лет")
        countPeriod = countPeriod * 12;
    let numerator = percentCreditMonth*Math.pow(1+percentCreditMonth,countPeriod);
    let denominator = Math.pow(1+percentCreditMonth,countPeriod)-1;
    let fraction = numerator/denominator;

    aPayment = (ammountCredit*fraction);
    aPayment = aPayment.toFixed(2);
    document.getElementById('result').value = aPayment;
    //console.log('aPayment = ' + aPayment);
    //console.log('percentCreditMonth = ' + percentCreditMonth);
    monthlyPayment();
}

function monthlyPayment() {
    let i;  
    let table = document.createElement('table');
    table.className = 'mytable';
    //add head table
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    td1.innerHTML = 'Номер платежа';
    let td2 = document.createElement('td');
    td2.innerHTML = 'Платеж по процентам';
    let td3 = document.createElement('td');
    td3.innerHTML = 'Платеж по основному долгу';
    let td4 = document.createElement('td');
    td4.innerHTML = 'Остаток';
    td1.className = 'captiontd';
    td2.className = 'captiontd';
    td3.className = 'captiontd';
    td4.className = 'captiontd';
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    table.appendChild(tr);
    //end of head table
    let parentTable = document.getElementById('resulttable');
    
    for (i = 0; i < countPeriod; i++)
    {
        monthPaymentPercent[i] = ammountCredit * percentCreditMonth;
        monthPaymentCredit[i] = aPayment - monthPaymentPercent[i];
        balance[i] = ammountCredit - monthPaymentCredit[i];
        ammountCredit = ammountCredit - monthPaymentCredit[i];
        console.log('month = ' + i);
        console.log('monthPaymentPercent = ' + monthPaymentPercent[i]);
        console.log('monthPaymentCredit = ' + monthPaymentCredit[i]);
        console.log('balance = ' + balance[i]);
        console.log('-/\-/\-/\-');
        buildTable(i, parentTable, table);
    }
}



function buildTable(i, parentTable, table) {
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    td1.innerHTML = i;
    let td2 = document.createElement('td');
    td2.innerHTML = monthPaymentPercent[i];
    let td3 = document.createElement('td');
    td3.innerHTML = monthPaymentCredit[i];
    let td4 = document.createElement('td');
    td4.innerHTML = balance[i];
    td1.className = 'mytd';
    td2.className = 'mytd';
    td3.className = 'mytd';
    td4.className = 'mytd';
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    table.appendChild(tr);
    parentTable.appendChild(table);
}

