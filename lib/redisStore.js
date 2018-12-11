'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RedisStore = function () {
    function RedisStore(options) {
        (0, _classCallCheck3.default)(this, RedisStore);

        this.client = options.client;
        this.prefix = options.prefix || 'rl:';
        this.expiry = options.expiry || 60000;
    }

    (0, _createClass3.default)(RedisStore, [{
        key: 'incr',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(key) {
                var rdsKey, _ref2, _ref3, incrRes, ttlRes;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                rdsKey = this.prefix + key;
                                _context.next = 3;
                                return this.client.pipeline().incr(rdsKey).ttl(rdsKey).exec();

                            case 3:
                                _ref2 = _context.sent;
                                _ref3 = (0, _slicedToArray3.default)(_ref2, 2);
                                incrRes = _ref3[0];
                                ttlRes = _ref3[1];

                                if (!(incrRes[1] === 1 || ttlRes[1] === -1)) {
                                    _context.next = 10;
                                    break;
                                }

                                _context.next = 10;
                                return this.client.expire(rdsKey, this.expiry);

                            case 10:
                                return _context.abrupt('return', incrRes[1]);

                            case 11:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function incr(_x) {
                return _ref.apply(this, arguments);
            }

            return incr;
        }()
    }, {
        key: 'resetKey',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(key) {
                var rdsKey;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                rdsKey = this.prefix + key;
                                _context2.next = 3;
                                return this.client.del(rdsKey);

                            case 3:
                                return _context2.abrupt('return', _context2.sent);

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function resetKey(_x2) {
                return _ref4.apply(this, arguments);
            }

            return resetKey;
        }()
    }]);
    return RedisStore;
}();

exports.default = RedisStore;