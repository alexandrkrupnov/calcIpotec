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
var overPayments = 0;

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
    for (i = 1; i <= countPeriod; i++)
    {
        monthPaymentPercent[i] = ammountCredit * percentCreditMonth;
        let w = parseFloat((monthPaymentPercent[i]).toFixed(2));
        overPayments = Number(overPayments) + w;
        overPayments = overPayments.toFixed(2);
        monthPaymentPercent[i] = w;
        monthPaymentCredit[i] = aPayment - monthPaymentPercent[i];
        w = parseFloat((monthPaymentCredit[i]).toFixed(2));
        
        monthPaymentCredit[i] = w;
        balance[i] = ammountCredit - monthPaymentCredit[i];
        w = parseFloat((balance[i]).toFixed(2));
        balance[i] = w;
        ammountCredit = ammountCredit - monthPaymentCredit[i];
        if (i === countPeriod)
        {
            if (balance[i] !== 0)
            {
                aPayment = Number(aPayment) + Number(balance[i]);
                monthPaymentCredit[i] = Number(monthPaymentCredit[i]) + Number(balance[i]);
                balance[i] = balance[i] - balance[i];
                
            }
        }
        buildTable(i, parentTable, table);
        
    }
    let inputRes = document.getElementById('resultregion');
    let addel = document.createElement('p');
    addel.innerHTML = 'Переплата по кредиту составит ' + overPayments + ' рублей';
    inputRes.appendChild(addel);
    //alert('переплата = ' + overPayments);
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

