'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

const _createClass = function () {
  function defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
      const descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

const _react = require('react');

const _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

const styles = {
  chatbubble: {
    backgroundColor: "#03b4f4",
    borderRadius: 20,
    clear: 'both',
    marginTop: 1,
    marginRight: 'auto',
    marginBottom: 1,
    marginLeft: 'auto',
    maxWidth: 325,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 14,
    paddingRight: 14,
    width: '-webkit-fit-content'
  },
  chatbubbleOrientationNormal: {
    float: 'right'
  },
  recipientChatbubble: {
    backgroundColor: '#ccc'
  },
  recipientChatbubbleOrientationNormal: {
    float: 'left'
  },
  p: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '300',
    margin: 0
  }
};

const ChatBubble = function (_Component) {
  _inherits(ChatBubble, _Component);

  function ChatBubble(props) {
    _classCallCheck(this, ChatBubble);

    const _this = _possibleConstructorReturn(this, (ChatBubble.__proto__ || Object.getPrototypeOf(ChatBubble)).call(this));

    _this.state = {
      message: undefined,
      bubbleStyles: {
        text: {},
        chatbubble: {},
        userBubble: {}
      }
    };
    return _this;
  }

  _createClass(ChatBubble, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        message: this.props.message,
        bubbleStyles: this.props.bubbleStyles ? {
            text: this.props.bubbleStyles.text ? this.props.bubbleStyles.text : {},
            chatbubble: this.props.bubbleStyles.chatbubble ? this.props.bubbleStyles.chatbubble : {},
            userBubble: this.props.bubbleStyles.userBubble ? this.props.bubbleStyles.userBubble : {}
          } : {text: {}, chatbubble: {}}
      });
    }
  }, {
    key: '_parse_for_styles',
    value: function _parse_for_styles(message) {
      if (typeof message === "string") {
        const bolded_start = message.search(/__(\w+\s?)+__/);
        const bolded_end = message.slice(bolded_start + 2).search(/__/);
        const bolded = message.slice(bolded_start + 2, bolded_start + bolded_end + 2);
        // Render text
        if (bolded_start !== -1 && bolded_end !== -1) {
          return _react2.default.createElement(
            'span',
            null,
            this._parse_for_styles(message.slice(0, bolded_start)),
            _react2.default.createElement(
              'strong',
              null,
              bolded
            ),
            this._parse_for_styles(message.slice(bolded_start + bolded_end + 4))
          );
        } else {
          return _react2.default.createElement(
            'span',
            null,
            message
          );
        }
      }
      return message;
    }
  }, {
    key: '_parse_for_links',
    value: function _parse_for_links(message) {
      let i, j, str, last;
      if (message.search(/<a href=/) !== -1 && (i = message.search(/<a href=/)) && (j = message.search(/a>/))) {
        last = message.slice(j + 5, -1);
        return _react2.default.createElement(
          'p',
          null,
          message.slice(0, i),
          _react2.default.createElement(
            'a',
            {
              target: '_blank',
              href: message.slice(i + 9, message.search(/'>|">/))
            },
            message.slice(message.search(/'>|">/) + 2, j - 2)
          ),
          message.slice(j + 2)
        );
      } else {
        return _react2.default.createElement(
          'p',
          null,
          message
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.message.id) {
        return _react2.default.createElement(
          'div',
          {style: Object.assign({}, styles.chatbubble, styles.recipientChatbubble, this.props.bubblesCentered ? {} : styles.recipientChatbubbleOrientationNormal, this.state.bubbleStyles.chatbubble)},
          _react2.default.createElement(
            'p',
            {style: Object.assign({}, styles.p, this.state.bubbleStyles.text)},
            this.props.message.message
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          {style: Object.assign({}, styles.chatbubble, this.props.bubblesCentered ? {} : styles.chatbubbleOrientationNormal, this.state.bubbleStyles.chatbubble, this.state.bubbleStyles.userBubble)},
          _react2.default.createElement(
            'p',
            {style: Object.assign({}, styles.p, this.state.bubbleStyles.text)},
            this.props.message.message
          )
        );
      }
    }
  }]);

  return ChatBubble;
}(_react.Component);

exports.default = ChatBubble;
