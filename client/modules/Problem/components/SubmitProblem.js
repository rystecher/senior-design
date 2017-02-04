import callApi from '../../../util/apiCaller';

var LANG_CODE = {'fsharp': 33, 'javascript': 20, 'whitespace': 41, 'python': 5, 'lolcode': 38, 'mysql': 10, 'fortran': 54, 'tcl': 40, 'oracle': 11, 'pascal': 25, 'haskell': 12, 'cobol': 36, 'octave': 46, 'csharp': 9, 'go': 21, 'php': 7, 'ruby': 8, 'java8': 43, 'bash': 14, 'visualbasic': 37, 'groovy': 31, 'c': 1, 'erlang': 16, 'java': 3, 'd': 22, 'scala': 15, 'tsql': 42, 'ocaml': 23, 'perl': 6, 'lua': 18, 'xquery': 48, 'r': 24, 'swift': 51, 'sbcl': 26, 'smalltalk': 39, 'racket': 49, 'cpp': 2, 'db2': 44, 'objectivec': 32, 'clojure': 13, 'python3': 30, 'rust': 50};

/**
 * Sends user source code to HackerRank to be compiled
 * @param source - (String) User's source code
 * @param lang - (String) User's language choice
 */
export function handleSubmit(source, lang) {
  source = "print 1";       // TODO: Replace with text editor's content
  lang = LANG_CODE.python;  // TODO: Replace with user's drop down selection

  callApi('problem', 'post', {
        source: source,
        lang: lang
  }).then(res =>
    console.log(res.body)
  );
}
