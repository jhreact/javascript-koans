var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      productsICanEat = _(products).filter(function(x) {
        return (! x.containsNuts) && _(x.ingredients).all(function(ing) {
          return ing !== "mushrooms"
        });
      });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    /* try chaining range() and reduce() */
    var sum = _.range(1000).reduce(function(total, x) {
      return (total ? total : 0) + ((x % 3 === 0 || x % 5 === 0) ? x : 0);
    });
    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    _(products).chain()
      .map(function(prod) { return prod.ingredients })
      .flatten()
      .reduce(function(counts, ing) {
        counts[ing] = (counts[ing] || 0) + 1;
        return counts;
      }, ingredientCount);
    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  /*
   */
  it("should find the largest prime factor of a composite number", function () {
    // For this,
    // * find all the primes less than composite number
    // * Then, iterate through primes, highest to lowest
    //   * if composite % prime === 0, and composite / prime = prime
    var isPrime = function(possiblePrime) {
      if (possiblePrime === 1 || possiblePrime === 2) {
        console.log("PossiblePrime is one or two");
        return true;
      } else if (possiblePrime % 2 === 0) {
        return false;
      }
      for (var i=3; i < possiblePrime; i+= 2) {
        if (possiblePrime % i === 0) {
          return false;
        }
      }
      return true;
    };
    expect(isPrime(1)).toBe(true);
    expect(isPrime(4)).toBe(false);
    expect(isPrime(5)).toBe(true);

    // durrr...use range
    var primesLessThanNum = function(composite) {
      return _.range(2,composite).filter(function(x) { return isPrime(x); });
    };
    expect(primesLessThanNum(6)).toEqual([2, 3, 5]);
    expect(primesLessThanNum(9)).toEqual([2, 3, 5, 7]);

    var largestPrimeFactor = function(composite) {
      return _(primesLessThanNum(composite)).chain()
        .filter(function(x) { return composite % x === 0})
        .max()
        .value();
    }
    expect(largestPrimeFactor(9)).toBe(3);
    expect(largestPrimeFactor(25)).toBe(5);
    expect(largestPrimeFactor(247)).toBe(19);
  });


  /*
  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

  });*/

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    var isDivisibleByOneThroughTwenty = function(num) {
      for (var i=1; i <=20; i++) {
        if (num % i !== 0) {
          return false;
        }
      }
      return true;
    };
    var twentyFactorial = 1*2*3*4*5*6*7*8*9*10*11*12*12*13*14*15*16*17*18*19*20;
    expect(isDivisibleByOneThroughTwenty(10)).toBe(false);
    expect(isDivisibleByOneThroughTwenty(twentyFactorial)).toBe(true);

    var divRange20 = function () {
      var testNum = 1;
      while (! isDivisibleByOneThroughTwenty(testNum)) {
        //console.log(testNum);
        testNum++;
      }
      return testNum;
    };
    expect(divRange20()).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var squareDiffs = function(nums) {
      var sumOfSquares = function(nums) {
        var total = 0;
        for (var i=0; i < nums.length; i++) {
          total += nums[i] * nums[i];
          // console.log("Sum of squares total: " + total);
        };
        return total;
      }
      expect(sumOfSquares([3,4])).toBe(25);
      expect(sumOfSquares([3,4,5])).toBe(50);

      var squareOfSums = function(nums) {
        var total = 0;
        for (var i=0; i < nums.length; i++) {
          total += nums[i];
          // console.log("Square of sums total: " + total);
        };
        return total * total;
      }
      expect(squareOfSums([3,4])).toBe(49);
      expect(squareOfSums([3,4,5])).toBe(144);

      return squareOfSums(nums) - sumOfSquares(nums);
    };


    expect(squareDiffs([3,4])).toBe(24);
  });

  it("should find the 10001st prime", function () {
    var tenThousandAndOnethPrime = function() {
      var primes = [2];

    }
    expect(tenThousandAndOnethPrime()).toBe(104743);
  });
});
