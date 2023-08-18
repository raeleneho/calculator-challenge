
export const getInterestRatePerPeriod= (interestRatePerAnnum: number, numberOfMonthsPerPeriod: number) => {
    const interestRatePerMonth = (interestRatePerAnnum/100) / 12;
    
    return interestRatePerMonth * numberOfMonthsPerPeriod 
}
//comment again
export const compoundInterest = (initialAmount: number, interestRatePerAnnum: number, investmentTermMonths: number, numMonthsPerPayPeriod: number):number => {  
   const interestRatePerPeriod = getInterestRatePerPeriod(interestRatePerAnnum, numMonthsPerPayPeriod);
   
    const totalNumberOfFullPeriods = Math.floor(investmentTermMonths / numMonthsPerPayPeriod);

    const newPrinciple = initialAmount * Math.pow(1 + interestRatePerPeriod, totalNumberOfFullPeriods);

    const leftOverMonths = investmentTermMonths % numMonthsPerPayPeriod;

    const maturityAmount = simpleInterest(newPrinciple, interestRatePerAnnum, leftOverMonths)    

    return maturityAmount;
}


export const simpleInterest = (initialAmount: number, interestRate: number, investmentTermMonths: number): number => {  
const maturityAmount = initialAmount * (1 + (interestRate/100) * investmentTermMonths / 12);
return Number(maturityAmount.toFixed(2));
}
