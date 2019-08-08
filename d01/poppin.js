const bottleCosts = 2;
const capCosts = 4;
const popCosts = 2;
const bottle = "bottle";
const cap = "cap";

const quotient = (num, divisor) => Math.floor(num / divisor);

const totalBottles = function() {
  if (process.argv[2] === undefined) {
    return "Missing parameter";
  }

  let totalReturn = {};
  let initialPop = quotient(process.argv[2], popCosts);
  totalReturn.pops = initialPop;
  totalReturn.bottles = initialPop;
  totalReturn.caps = initialPop;
  totalReturn.earnedByBottles = 0;
  totalReturn.earnedByCaps = 0;

  totalReturn = refund(totalReturn, 0);

  totalReturn.total = totalReturn.pops + totalReturn.earnedByBottles + totalReturn.earnedByCaps;

  console.log(totalReturn);
  return totalReturn;
};

const refund = function(investment, count) {
  if (count > 10) {
    return investment;
  }

  if (quotient(investment.bottles, bottleCosts) > 0 || quotient(investment.caps, capCosts) > 0) {
    investment = addNewBottle(investment, bottle, quotient(investment.bottles, bottleCosts));
    investment = addNewBottle(investment, cap, quotient(investment.caps, capCosts));
    // console.log(investment);

    investment = refund(investment, ++count);
  }
  return investment;
};

const addNewBottle = function(investment, refundType, number) {
  investment.bottles += number;
  investment.caps += number;

  if (refundType === bottle) {
    // console.log(`${investment.earnedByBottles} now adding ${number}${refundType}s`);
    investment.earnedByBottles += number;
    investment.bottles -= bottleCosts * number;
  } else {
    // console.log(`${investment.earnedByCaps} now adding ${number}${refundType}s`);
    investment.earnedByCaps += number;
    investment.caps -= capCosts * number;
  }
  return investment;
};

let result = totalBottles();

console.log(`TOTAL BOTTLES: ${result.total}\nREMAINING BOTTLES: ${result.bottles}\nREMAINING CAPS: ${result.caps}\nTOTAL EARNED: \n  BOTTLES: ${result.earnedByBottles}\n  CAPS: ${result.earnedByCaps}`);