/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * further hidden under the option "More Tools." In Firefox, they are
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    var result = {
        "SearchTerm": "",
        "Results": []
    };

    if(searchTerm != null && searchTerm != ""){
        if(scannedTextObj.length == 0){
            result['SearchTerm'] = searchTerm
        }
        for(const books in scannedTextObj){
            let isbn = scannedTextObj[books]['ISBN']
            let content = scannedTextObj[books]['Content']

            if(content.length == 0){
                result['SearchTerm'] = searchTerm
            }

            for(const [index, element] of content.entries()){
                let page = element['Page']
                let line = element['Line']
                let text = element['Text']

                if (text.includes(searchTerm)){
                    result['SearchTerm'] = searchTerm
                    result['Results'].push({
                        "ISBN": isbn,
                        "Page": page,
                        "Line": line
                    })
                }

                else if(text.slice(-1) == '-'){
                    lastWord = text.split(" ").pop()
                    beginningOfTerm = lastWord.slice(0,-1)
                    endOfTerm = content[index+1]['Text'].split(" ")[0]

                    fullTerm = beginningOfTerm + endOfTerm

                    if(fullTerm === searchTerm){
                        result['SearchTerm'] = searchTerm
                        result['Results'].push({
                            "ISBN": isbn,
                            "Page": page,
                            "Line": line
                        })
                    }
                }
            }
        }
    }
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
                "Text": "now simply went on by her own momentum.  The dark-"
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
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

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

//Null Search Term Output Using Example Input From Lines 79-101
const nullSearchTermOutput = {
    "SearchTerm": "",
    "Results": []
}

//Null Search Term Test
const nullSearchTermTestResult = findSearchTermInBooks(null, twentyLeaguesIn);
if (JSON.stringify(nullSearchTermOutput) === JSON.stringify(nullSearchTermTestResult)) {
    console.log("PASS: Null Search Term Test");
} else {
    console.log("FAIL: Null Search Term Test");
    console.log("Expected:", nullSearchTermOutput);
    console.log("Received:", nullSearchTermTestResult);
}

//Empty Object Input
const emptyObjectInput = []

//Empty Object Output
const emptyObjectOutput = {
    "SearchTerm": "memory",
    "Results": []
}

//Empty Object Test
const emptyObjectTestResult = findSearchTermInBooks("memory", emptyObjectInput);
if(JSON.stringify(emptyObjectOutput) === JSON.stringify(emptyObjectTestResult)) {
    console.log("PASS: Empty Object Test");
} else {
    console.log("FAIL: Empty Object Test");
    console.log("Expected:", emptyObjectOutput);
    console.log("Received:", emptyObjectTestResult);
}

//Empty Content Input
const emptyContentInput = [
    {
        "Title": "Harry Potter and the Sorcerer's Stone",
        "ISBN": "9780590353427",
        "Content": []
    }
]

//Empty Content Output
const emptyContentOutput = {
    "SearchTerm": "photograph",
    "Results": []
}

//Empty Content Test
const emptyContentTestResult = findSearchTermInBooks("photograph", emptyContentInput);
if(JSON.stringify(emptyContentOutput) === JSON.stringify(emptyContentTestResult)) {
    console.log("PASS: Empty Content Test");
} else {
    console.log("FAIL: Empty Content Test");
    console.log("Expected:", emptyContentOutput);
    console.log("Received:", emptyContentTestResult);
}

//Case-sensitive Output Using Example Input From Lines 79-101
const caseSensitiveOutput = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}

//Case-sensitive Test
const caseSensitiveTestResult = findSearchTermInBooks("The", twentyLeaguesIn);
if (JSON.stringify(caseSensitiveOutput) === JSON.stringify(caseSensitiveTestResult)) {
    console.log("PASS: Case Sensitive Test");
} else {
    console.log("FAIL: Case Sensitive Test");
    console.log("Expected:", caseSensitiveOutput);
    console.log("Received:", caseSensitiveTestResult);
}

//Hyphen Output Using Example Input From Lines 79-101
const hyphenTest = {
    "SearchTerm": "darkness",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}

//Hyphen Test
const hyphenTestResult = findSearchTermInBooks("darkness", twentyLeaguesIn);
if(JSON.stringify(hyphenTest) === JSON.stringify(hyphenTestResult)) {
    console.log("PASS: Hyphen Test");
} else {
    console.log("FAIL: Hyphen Test");
    console.log("Expected:", hyphenTest);
    console.log("Received:", hyphenTestResult);
}

//Hyphen #2 Input
const harryPotterInput = [
    {
        "Title": "Harry Potter and the Sorcerer's Stone",
        "ISBN": "9780590353427",
        "Content": [
            {
                "Page": 1,
                "Line": 1,
                "Text": "Mr. and Mrs. Dursley, of number four, Privet Drive, were"
            },
            {
                "Page": 1,
                "Line": 2,
                "Text": "proud to say that they were perfectly normal, thank"
            },
            {
                "Page": 1,
                "Line": 3,
                "Text": "you very much. They were the last people you'd expect to be in-"
            },
            {
                "Page": 1,
                "Line": 4,
                "Text": "volved in anything strange or mysterious, because they just didn't"
            },
            {
                "Page": 1,
                "Line": 5,
                "Text": "hold with such nonsense."
            }
        ]
    }
]

//Hyphen #2 Output
const hyphenTest2 = {
    "SearchTerm": "involved",
    "Results": [
        {
            "ISBN": "9780590353427",
            "Page": 1,
            "Line": 3
        }
    ]
}

//Hyphen #2 Test
const hyphenTest2Result = findSearchTermInBooks("involved", harryPotterInput);
if(JSON.stringify(hyphenTest2) === JSON.stringify(hyphenTest2Result)) {
    console.log("PASS: Hyphen Test #2");
} else {
    console.log("FAIL: Hyphen Test #2");
    console.log("Expected:", hyphenTest2);
    console.log("Received:", hyphenTest2Result);
}

//Apostrophe Output Using Example Input From Lines 79-101
const apostropheTest = {
    "SearchTerm": "Canadian's",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

//Apostrophe Test
const apostropheTestResult = findSearchTermInBooks("Canadian's", twentyLeaguesIn);
if(JSON.stringify(apostropheTest) === JSON.stringify(apostropheTestResult)) {
    console.log("PASS: Apostrophe Test");
} else {
    console.log("FAIL: Apostrophe Test");
    console.log("Expected:", apostropheTest);
    console.log("Received:", apostropheTestResult);
}

//Multiple Book Input
const multipleBookInput = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
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
    },
    {
        "Title": "Harry Potter and the Sorcerer's Stone",
        "ISBN": "9780590353427",
        "Content": [
            {
                "Page": 1,
                "Line": 1,
                "Text": "Mr. and Mrs. Dursley, of number four, Privet Drive, were"
            },
            {
                "Page": 1,
                "Line": 2,
                "Text": "proud to say that they were perfectly normal, thank"
            },
            {
                "Page": 1,
                "Line": 3,
                "Text": "you very much. They were the last people you'd expect to be in-"
            },
            {
                "Page": 1,
                "Line": 4,
                "Text": "volved in anything strange or mysterious, because they just didn't"
            },
            {
                "Page": 1,
                "Line": 5,
                "Text": "hold with such nonsense."
            }
        ]
    }
]

//Multiple Book Output
const multipleBookOutput = {
    "SearchTerm": "and",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 10
        },
        {
            "ISBN": "9780590353427",
            "Page": 1,
            "Line": 1
        },
    ]
}

//Multiple Book Test
const multipleBookTestResult = findSearchTermInBooks("and", multipleBookInput);
if (JSON.stringify(multipleBookOutput) === JSON.stringify(multipleBookTestResult)) {
    console.log("PASS: Multiple Book Test");
} else {
    console.log("FAIL: Multiple Book Test");
    console.log("Expected:", multipleBookOutput);
    console.log("Received:", multipleBookTestResult);
}