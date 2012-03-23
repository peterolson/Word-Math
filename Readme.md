jQuery Word Math
===

Word Math is a jQuery plug-in that you can use to do math with English words.

How to Use It
---

To start using Word Math, you can use the `$.wordMath` function which accepts a string with words describing a number.

    var x = $.wordMath("ninety seven");
    x.add("fourteen");
    
You can chain any of the math functions to perform calculations on the number. The math functions are `add`, `subtract`, `multiply`, `divide`, `modulo`, `toPower`, `negate`, `absoluteValue`, `round`, `floor`, `ceiling`, `toSquareRoot`, `sine`, `cosine`, `tangent`, `arcSine`, `arcCosine`, and `arcTangent`.

    $.wordMath("fifty seven and eight tenths").multiply("seventeen").toPower("three")
    //one million three hundred forty nine thousand two hundred thirty two and six tenths and two hundredths and five thousands
    
Word Math will even interpret the words "pi" and "e"

    $.wordMath("pi million")
    //three million one hundred forty one thousand five hundred ninety two and six tenths and five hundredths and three thousandths and five ten thousandths and eight hundred thousandths and nine millionths and seven ten millionths and nine hundred millionths and three billionths 

You can convert a Word Math number to a Javascript number with the `value` property

    $.wordMath("three million four hundred and sixty seven thousand five hundred and forty two").value
    // 3467542
    
Finally, you can convert a Javascript number to words with the `$.wordMath.toString` function

    $.wordMath.toString(65401.90332)
    // sixty five thousand four hundred one and nine tenths and three thousandths and three ten thousandths and two hundred thousandths

Setting up Word Math
---

You need to already have jQuery loaded before you run Word Math. All you need to do is copy the [Word Math script](https://raw.github.com/peterolson/Word-Math/master/wordMath.jquery.min.js) and reference it in your page, like this:

    <script src="http://code.jquery.com/jquery.min.js"></script>
    <script src="js/wordMath.jquery.min.js"></script>
    
Word Math sans jQuery
---

If you are one of the few who prefers to use Word Math without dependency on jQuery (and thus without the namespacing advantages that jQuery provides), you may prefer the vanilla Javascript version of Word Math.

The usage for Word Math sans jQuery is identical to the usage of Word Math with jQuery, except that you do not need to prefix your calls with `$.`. In other words, instead of doing

    $.wordMath("fifteen").add("eighteen")
    
you would instead do

    wordMath("fifteen").add("eighteen")
    
