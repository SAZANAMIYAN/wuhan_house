// calculator.js
document.getElementById('calculateButton').addEventListener('click', function(event) {
    event.preventDefault();

    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const loanTerm = parseInt(document.getElementById('loanTerm').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100;

    if (isNaN(loanAmount) || isNaN(loanTerm) || isNaN(interestRate)) {
        alert('请输入有效的数字');
        return;
    }

    const monthlyInterestRate = interestRate / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment = (loanAmount * monthlyInterestRate) / 
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    document.getElementById('monthlyPayment').innerText = monthlyPayment.toFixed(2);
    document.getElementById('totalPayment').innerText = totalPayment.toFixed(2);
    document.getElementById('totalInterest').innerText = totalInterest.toFixed(2);
    document.getElementById('result').style.display = 'block';
});
