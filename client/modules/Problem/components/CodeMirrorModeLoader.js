const { Promise } = global;

if(typeof require.ensure !== "function") {
    require.ensure = function(d, c) {
        c(require)
    };
}

export default () => {
  return new Promise(resolve => {
    require.ensure([], () => {
      require('codemirror/mode/javascript/javascript');
      require('codemirror/mode/css/css');
      // ... repeat the line above with all languages you want to support
      // CodeMirror supports 100+ languages \o/

      resolve();
    });
  });
};
