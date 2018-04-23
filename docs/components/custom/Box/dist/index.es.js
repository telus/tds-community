import React from 'react';
import PropTypes from 'prop-types';

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();















var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};













var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var safeRest = (function (_ref) {
  var style = _ref.style,
      className = _ref.className,
      props = objectWithoutProperties(_ref, ["style", "className"]);
  return props;
});

var joinClassNames = function joinClassNames() {
  for (var _len = arguments.length, classes = Array(_len), _key = 0; _key < _len; _key++) {
    classes[_key] = arguments[_key];
  }

  return classes.filter(function (className) {
    return className;
  }).join(' ');
};

var capitalize = function capitalize(string) {
  return "" + string.charAt(0).toUpperCase() + string.slice(1);
};

var styles = { "inline": "TDS_Box-modules__inline___jTHcz", "stack": "TDS_Box-modules__stack___33m4D", "verticalPadding-1": "TDS_Box-modules__verticalPadding-1___3lZ5x", "horizontalPadding-1": "TDS_Box-modules__horizontalPadding-1___TpXtI", "bottomMargin-1": "TDS_Box-modules__bottomMargin-1___C3864", "betweenBottomMargin-1": "TDS_Box-modules__betweenBottomMargin-1___43ZDj", "betweenRightMargin-1": "TDS_Box-modules__betweenRightMargin-1___XT_b2", "verticalPadding-2": "TDS_Box-modules__verticalPadding-2___1Uh2T", "horizontalPadding-2": "TDS_Box-modules__horizontalPadding-2___3hmwJ", "bottomMargin-2": "TDS_Box-modules__bottomMargin-2___uBAk1", "betweenBottomMargin-2": "TDS_Box-modules__betweenBottomMargin-2___31zX_", "betweenRightMargin-2": "TDS_Box-modules__betweenRightMargin-2___20pzC", "verticalPadding-3": "TDS_Box-modules__verticalPadding-3___Fsv37", "horizontalPadding-3": "TDS_Box-modules__horizontalPadding-3___2uoUp", "bottomMargin-3": "TDS_Box-modules__bottomMargin-3___3UFRC", "betweenBottomMargin-3": "TDS_Box-modules__betweenBottomMargin-3___1jBrz", "betweenRightMargin-3": "TDS_Box-modules__betweenRightMargin-3___1dOvx", "verticalPadding-4": "TDS_Box-modules__verticalPadding-4___QMNNa", "horizontalPadding-4": "TDS_Box-modules__horizontalPadding-4___3W1-P", "bottomMargin-4": "TDS_Box-modules__bottomMargin-4___lamOh", "betweenBottomMargin-4": "TDS_Box-modules__betweenBottomMargin-4___2tJ2n", "betweenRightMargin-4": "TDS_Box-modules__betweenRightMargin-4___1wiQH", "verticalPadding-5": "TDS_Box-modules__verticalPadding-5___m0Okg", "horizontalPadding-5": "TDS_Box-modules__horizontalPadding-5___Ilh-g", "bottomMargin-5": "TDS_Box-modules__bottomMargin-5___3UZQB", "betweenBottomMargin-5": "TDS_Box-modules__betweenBottomMargin-5___2hC_V", "betweenRightMargin-5": "TDS_Box-modules__betweenRightMargin-5___6YoBS", "verticalPadding-6": "TDS_Box-modules__verticalPadding-6___1Cian", "horizontalPadding-6": "TDS_Box-modules__horizontalPadding-6___222_5", "bottomMargin-6": "TDS_Box-modules__bottomMargin-6___5wp8U", "betweenBottomMargin-6": "TDS_Box-modules__betweenBottomMargin-6___21DHk", "betweenRightMargin-6": "TDS_Box-modules__betweenRightMargin-6___1qyQb", "verticalPadding-7": "TDS_Box-modules__verticalPadding-7___2fkPH", "horizontalPadding-7": "TDS_Box-modules__horizontalPadding-7___r4QbM", "bottomMargin-7": "TDS_Box-modules__bottomMargin-7___348WB", "betweenBottomMargin-7": "TDS_Box-modules__betweenBottomMargin-7___3oFkv", "betweenRightMargin-7": "TDS_Box-modules__betweenRightMargin-7___dehxJ", "verticalPadding-8": "TDS_Box-modules__verticalPadding-8___nPriZ", "horizontalPadding-8": "TDS_Box-modules__horizontalPadding-8___1sn72", "bottomMargin-8": "TDS_Box-modules__bottomMargin-8___UCxrg", "betweenBottomMargin-8": "TDS_Box-modules__betweenBottomMargin-8___cMp1C", "betweenRightMargin-8": "TDS_Box-modules__betweenRightMargin-8___3DrvI" };

var getClassName = function getClassName(spacing, location, scale) {
  if (!scale) {
    return undefined;
  }
  return styles['' + location + capitalize(spacing) + '-' + scale];
};

var getBetweenClasses = function getBetweenClasses(scale, inline) {
  if (!scale) {
    return undefined;
  }

  var direction = inline ? 'Right' : 'Bottom';
  return joinClassNames(styles['between' + direction + 'Margin-' + scale], inline ? styles.inline : styles.stack);
};

/**
 * Apply spacing within or around components.
 *
 * @version ./package.json
 */
var Box = function Box(_ref) {
  var tag = _ref.tag,
      vertical = _ref.vertical,
      horizontal = _ref.horizontal,
      inset = _ref.inset,
      below = _ref.below,
      between = _ref.between,
      inline = _ref.inline,
      dangerouslyAddClassName = _ref.dangerouslyAddClassName,
      children = _ref.children,
      rest = objectWithoutProperties(_ref, ['tag', 'vertical', 'horizontal', 'inset', 'below', 'between', 'inline', 'dangerouslyAddClassName', 'children']);

  var xSize = inset || horizontal;
  var ySize = inset || vertical;

  var classes = joinClassNames(getClassName('padding', 'horizontal', xSize), getClassName('padding', 'vertical', ySize), getClassName('margin', 'bottom', below), getBetweenClasses(between, inline), dangerouslyAddClassName);

  return React.createElement(tag, _extends({}, safeRest(rest), { className: classes }), children);
};

Box.propTypes = {
  /**
   * Specify an HTML element to render, such as `section`.
   */
  tag: PropTypes.string,
  /**
   * Indent content from the container's top and bottom edge by applying padding.
   */
  vertical: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8]),
  /**
   * Indent content from the container's left and right edge by applying padding.
   */
  horizontal: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8]),
  /**
   * Indent content from all of the container's edges by applying padding.
   */
  inset: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8]),
  /**
   * @ignore
   *
   * We are keeping this hidden for now as we are not sold on the necessity. We use it internally still to apply
   * spacing to Markdown components, but would like to use between instead if the library allows it.
   *
   * Sets a `margin-bottom`.
   */
  below: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8]),
  /**
   * Create either a block or an inline stack, applying margin in between every direct child. Margin will not be
   * applied to the last component in the stack.
   *
   * By default, `between` will arrange the Box's children as a flex column. Combine with `inline` to arrange them
   * as a flex row.
   */
  between: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8]),
  /**
   * Arrange children in a row. Combine with `between` to apply margins in between the row's elements.
   */
  inline: PropTypes.bool,
  /**
   * Append custom classes to `className`. Use sparingly, and do not attempt to override Box style properties as that
   * may cause unexpected behaviour.
   *
   * You would typically use this feature to apply flex alignment properties in combination with `between`.
   */
  dangerouslyAddClassName: PropTypes.string,
  /**
   * The content. Can be text, any HTML element, or any component.
   */
  children: PropTypes.node.isRequired
};

Box.defaultProps = {
  inline: false,
  tag: 'div',
  vertical: undefined,
  horizontal: undefined,
  inset: undefined,
  below: undefined,
  between: undefined,
  dangerouslyAddClassName: undefined
};

export default Box;
//# sourceMappingURL=index.es.js.map
