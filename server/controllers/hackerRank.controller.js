import request from 'request';
let fs = require('fs');

const API_KEY = process.env.HR_API_KEY;
const LANG_CODE = { 'fsharp': 33, 'javascript': 20, 'whitespace': 41, 'python': 5, 'lolcode': 38, 'mysql': 10, 'fortran': 54, 'tcl': 40, 'oracle': 11, 'pascal': 25, 'haskell': 12, 'cobol': 36, 'octave': 46, 'csharp': 9, 'go': 21, 'php': 7, 'ruby': 8, 'java8': 43, 'bash': 14, 'visualbasic': 37, 'groovy': 31, 'c': 1, 'erlang': 16, 'java': 3, 'd': 22, 'scala': 15, 'tsql': 42, 'ocaml': 23, 'perl': 6, 'lua': 18, 'xquery': 48, 'r': 24, 'swift': 51, 'sbcl': 26, 'smalltalk': 39, 'racket': 49, 'cpp': 2, 'db2': 44, 'objectivec': 32, 'clojure': 13, 'python3': 30, 'rust': 50 };

/**
 * Evaluate source code using HackerRank's API
 * @param source - (String) The source code to be evaluated
 * @param lang - (String) The programming language the user wants to use
 * @param inputs = (String List) List of inputs to test against
 * @param callback - (Function) Callback function
 * @returns Response from HackerRank API
 */
export function hackerrankCall(source, lang, inputs, callback) {
    const options = {
        url: 'http://api.hackerrank.com/checker/submission.json',
        form: {
            source,
            lang: LANG_CODE[lang],
            testcases: JSON.stringify(inputs),
            api_key: API_KEY,
            format: 'json',
        },
    };
    return request.post(options, (error, response) => callback(error, response));
}
