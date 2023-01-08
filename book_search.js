/*
* Searches for matches in scanned text.
* @param {string} searchTerm - The word or term we're searching for.
* @param {JSON} scannedTextObj - A JSON object representing the scanned text.
* @returns {JSON} - Search results.
*/
function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and
     * return the appropriate object here. */
    var results = []
    scannedTextObj.forEach(function(book) {
        book.Content.forEach(function(content) {
            var words = [];
            content.Text.split(" ").forEach(function(dirtyWord) {
                var word = "";
                for (var i = 0; i < dirtyWord.length; i++) {
                    var ch = dirtyWord.charAt(i);
                    if (ch.match(/[a-z'-]/i))
                        word += ch;
                }
                if (word.length > 0)
                    words.push(word);
            });
            if (words.includes(searchTerm))
                results.push({
                    "ISBN": book.ISBN,
                    "Page": content.Page,
                    "Line": content.Line
                });
        });
    });
    var result = {
        "SearchTerm": searchTerm,
        "Results": results
    };
    return result;
}
/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum. The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            }
        ]
    }
]
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}
/*
_ _ _ _ ___ _____ _____ _____ ____ _____ ____
| | | | \ | |_ _|_ _| |_ _| ____/ ___|_ _/ ___|
| | | | \| || | | | | | | _| \___ \ | | \___ \
| |_| | |\ || | | | | | | |___ ___) || | ___) |
\___/|_| \_|___| |_| |_| |_____|____/ |_| |____/
*/
/* We have provided two unit tests. They're really just `if` statements that
* output to the console. We've provided two tests as examples, and
* they should pass with a correct implementation of `findSearchTermInBooks`.
*/
/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}
/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/*
* Please add your unit tests below.
*/

// My function to perform tests
function test(testName, searchTerm, scannedTextObj, expectedOutput) {
    var actualOutput = findSearchTermInBooks(searchTerm, scannedTextObj);
    var success = JSON.stringify(actualOutput) === JSON.stringify(expectedOutput);
    if (success) {
        console.log("PASS: " + testName)
    } else {
        console.log("FAIL: " + testName);
        console.log("Expected:", JSON.stringify(expectedOutput));
        console.log("Received:", JSON.stringify(actualOutput));
    }
}

// My scanned text object
var scannedTextObj = [
    {
        "Title": "Test Book 1",
        "ISBN": "6666666666666",
        "Content": [
            {
                "Page": 1,
                "Line": 1,
                "Text": "Hello, world! The output of the program is"
            },
            {
                "Page": 2,
                "Line": 3,
                "Text": "This object is well-defined"
            }
        ]
    },
    {
        "Title": "Test Book 2",
        "ISBN": "7777777777777",
        "Content": [
            {
                "Page": 2,
                "Line": 6,
                "Text": "Today the weather is cold."
            },
            {
                "Page": 3,
                "Line": 18,
                "Text": "Tomorrow the weather will be sunny and the"
            }
        ]
    },
];
test("positive1", "Hello", scannedTextObj, {
    "SearchTerm": "Hello",
    "Results": [
        {
            "ISBN": "6666666666666",
            "Page": 1,
            "Line": 1
        }
    ]
});
test("positive2", "world", scannedTextObj, {
    "SearchTerm": "world",
    "Results": [
        {
            "ISBN": "6666666666666",
            "Page": 1,
            "Line": 1
        }
    ]
});
test("positive3", "the", scannedTextObj, {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "6666666666666",
            "Page": 1,
            "Line": 1
        },
        {
            "ISBN": "7777777777777",
            "Page": 2,
            "Line": 6
        },
        {
            "ISBN": "7777777777777",
            "Page": 3,
            "Line": 18
        }
    ]
});
test("negative1", "Hell", scannedTextObj, {
    "SearchTerm": "Hell",
    "Results": []
});
test("negative2", "well", scannedTextObj, {
    "SearchTerm": "well",
    "Results": []
});
test("negative3", "out", scannedTextObj, {
    "SearchTerm": "out",
    "Results": []
});
test("case-sensitive1-1", "Today", scannedTextObj, {
    "SearchTerm": "Today",
    "Results": [
        {
            "ISBN": "7777777777777",
            "Page": 2,
            "Line": 6
        }
    ]
});
test("case-sensitive1-2", "today", scannedTextObj, {
    "SearchTerm": "today",
    "Results": []
});
test("case-sensitive2-1", "Sunny", scannedTextObj, {
    "SearchTerm": "Sunny",
    "Results": []
});
test("case-sensitive1-1", "sunny", scannedTextObj, {
    "SearchTerm": "sunny",
    "Results": [
        {
            "ISBN": "7777777777777",
            "Page": 3,
            "Line": 18
        }
    ]
});
