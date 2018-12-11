"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RateLimit = function () {
    function RateLimit(options) {
        (0, _classCallCheck3.default)(this, RateLimit);

        this.options = (0, _assign2.default)({}, options);
        this.store = options.store;

        return this._rateLimit.bind(this);
    }

    (0, _createClass3.default)(RateLimit, [{
        key: "keyGenerator",
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!this.options.keyGenerator) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt("return", this.options.keyGenerator(ctx));

                            case 2:
                                return _context.abrupt("return", this.options.prefixKey + ":" + ctx.request.ip);

                            case 3:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function keyGenerator(_x) {
                return _ref.apply(this, arguments);
            }

            return keyGenerator;
        }()
    }, {
        key: "skip",
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx) {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!this.options.skip) {
                                    _context2.next = 2;
                                    break;
                                }

                                return _context2.abrupt("return", this.options.skip(ctx));

                            case 2:
                                return _context2.abrupt("return", false);

                            case 3:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function skip(_x2) {
                return _ref2.apply(this, arguments);
            }

            return skip;
        }()
    }, {
        key: "handler",
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (this.options.handler) {
                                    this.options.handler(ctx);
                                } else {
                                    ctx.status = this.options.statusCode;
                                    ctx.body = { message: this.options.message };
                                }

                            case 1:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function handler(_x3, _x4) {
                return _ref3.apply(this, arguments);
            }

            return handler;
        }()
    }, {
        key: "_rateLimit",
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
                var skip, key, current, max;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.skip(ctx);

                            case 2:
                                skip = _context4.sent;

                                if (!skip) {
                                    _context4.next = 5;
                                    break;
                                }

                                return _context4.abrupt("return", next());

                            case 5:
                                _context4.next = 7;
                                return this.keyGenerator(ctx);

                            case 7:
                                key = _context4.sent;
                                _context4.next = 10;
                                return this.store.incr(key);

                            case 10:
                                current = _context4.sent;
                                max = this.options.max;

                                if (!(max && current > max)) {
                                    _context4.next = 14;
                                    break;
                                }

                                return _context4.abrupt("return", this.handler(ctx, next));

                            case 14:
                                return _context4.abrupt("return", next());

                            case 15:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function _rateLimit(_x5, _x6) {
                return _ref4.apply(this, arguments);
            }

            return _rateLimit;
        }()
    }]);
    return RateLimit;
}();

exports.default = RateLimit;