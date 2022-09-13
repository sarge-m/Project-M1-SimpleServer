
module.exports = (htmlStr, loans)=>{ // fat arrow function or lambda
    let output = htmlStr.replace(/{%CUSTOMERNAME%}/g, loans.customerName);
    output = output.replace(/{%PHONENUMBER%}/g, loans.phoneNumber);
    output = output.replace(/{%ADDRESS%}/g, loans.address);
    output = output.replace(/{%LOANAMOUNT%}/g, loans.loanAmount);
    output = output.replace(/{%INTEREST%}/g, loans.interest);
    output = output.replace(/{%LOANTERMYEARS%}/g, loans.loanTermYears);
    output = output.replace(/{%LOANTYPE%}/g, loans.loanType);
    output = output.replace(/{%DESCRIPTION%}/g, loans.description);
    //P V = P M T i [ 1 − 1 ( 1 + i) n]

    loanInterestToDecimal = (loans.interest/100);
    output = output.replace(/{%TOTALLOANAMOUNT%}/g, (loans.loanAmount * loanInterestToDecimal * loans.loanTermYears));
    output = output.replace(/{%ACTUALAMOUNT%}/g, ((parseInt(loans.loanAmount * loanInterestToDecimal * loans.loanTermYears)) + parseInt(loans.loanAmount)));
    return output;
}