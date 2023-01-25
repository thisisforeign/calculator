# calculator
TOP calculator
------------------------
Issues with styling:
- Styling the buttons in symmetry with the purple buttons
- Was suprised(?) that the button numbers start from 789 456 etc and not 123 456 etc. Overthought how I should have moved the buttons
- The shape of the buttons

Issues with script.js:
- Wanted to implement it like casio calculators with the equation on the top left and the results on the bottom right but was easier to implement akin to modern calculators
- Displaying the chosen numbers
- Previous num display shifted to the middle of the screen instead of staying at the top when current num display was empty
- Saving both numbers to be used in the equation
- Had error that occured when using delete function after calculating due to type error so add .toString()
- Encountered an error that occured when pressing the "Enter" key as the currDisplayNum would show the old currNum but has the new currNum stored. Fixed using e.preventDefault()
- Decimal equations had too many floating point numbers. Tried using https://www.reddit.com/r/learnjavascript/comments/3q0jyy/dealing_with_decimals/ and other methods but they were all workarounds when calculators require more precision so used this library instead https://github.com/royNiladri/js-big-decimal#readme 