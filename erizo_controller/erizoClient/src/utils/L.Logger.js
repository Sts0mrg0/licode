/*global document, console*/
'use strict';
var L = L || {};

/*
 * API to write logs based on traditional logging mechanisms: debug, trace, info, warning, error
 */
L.Logger = (function (L) {
    var DEBUG = 0,
        TRACE = 1,
        INFO = 2,
        WARNING = 3,
        ERROR = 4,
        NONE = 5,
        enableLogPanel,
        setLogLevel,
        setOutputFunction,
        setLogPrefix,
        outputFunction,
        logPrefix = '',
        log,
        debug,
        trace,
        info,
        warning,
        error;

    // By calling this method we will not use console.log to print the logs anymore.
    // Instead we will use a <textarea/> element to write down future logs
    enableLogPanel = function () {
        L.Logger.panel = document.createElement('textarea');
        L.Logger.panel.setAttribute('id', 'licode-logs');
        L.Logger.panel.setAttribute('style', 'width: 100%; height: 100%; display: none');
        L.Logger.panel.setAttribute('rows', 20);
        L.Logger.panel.setAttribute('cols', 20);
        L.Logger.panel.setAttribute('readOnly', true);
        document.body.appendChild(L.Logger.panel);
    };

    // It sets the new log level. We can set it to NONE if we do not want to print logs
    setLogLevel = function (level) {
        if (level > L.Logger.NONE) {
            level = L.Logger.NONE;
        } else if (level < L.Logger.DEBUG) {
            level = L.Logger.DEBUG;
        }
        L.Logger.logLevel = level;
    };

    outputFunction = function (args) {
      console.log.apply(console, args);
    };

    setOutputFunction = function (newOutputFunction) {
      outputFunction = newOutputFunction;
    };

    setLogPrefix = function (newLogPrefix) {
      logPrefix = newLogPrefix;
    };

    // Generic function to print logs for a given level:
    //  L.Logger.[DEBUG, TRACE, INFO, WARNING, ERROR]
    log = function (level) {
        var out = logPrefix;
        if (level < L.Logger.logLevel) {
            return;
        }
        if (level === L.Logger.DEBUG) {
            out = out + 'DEBUG';
        } else if (level === L.Logger.TRACE) {
            out = out + 'TRACE';
        } else if (level === L.Logger.INFO) {
            out = out + 'INFO';
        } else if (level === L.Logger.WARNING) {
            out = out + 'WARNING';
        } else if (level === L.Logger.ERROR) {
            out = out + 'ERROR';
        }
        out = out + ': ';
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args[i] = arguments[i];
        }
        var tempArgs = args.slice(1);
        args = [out].concat(tempArgs);
        if (L.Logger.panel !== undefined) {
            var tmp = '';
            for (var idx = 0; idx < args.length; idx++) {
                tmp = tmp + args[idx];
            }
            L.Logger.panel.value = L.Logger.panel.value + '\n' + tmp;
        } else {
            outputFunction.apply(L.Logger, [args]);
        }
    };

    // It prints debug logs
    debug = function () {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args[i] = arguments[i];
        }
        L.Logger.log.apply(L.Logger,[L.Logger.DEBUG].concat(args));
    };

    // It prints trace logs
    trace = function () {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args[i] = arguments[i];
        }
        L.Logger.log.apply(L.Logger,[L.Logger.TRACE].concat(args));
    };

    // It prints info logs
    info = function () {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args[i] = arguments[i];
        }
        L.Logger.log.apply(L.Logger,[L.Logger.INFO].concat(args));
    };

    // It prints warning logs
    warning = function () {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args[i] = arguments[i];
        }
        L.Logger.log.apply(L.Logger,[L.Logger.WARNING].concat(args));
    };

    // It prints error logs
    error = function () {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args[i] = arguments[i];
        }
        L.Logger.log.apply(L.Logger,[L.Logger.ERROR].concat(args));
    };

    return {
        DEBUG: DEBUG,
        TRACE: TRACE,
        INFO: INFO,
        WARNING: WARNING,
        ERROR: ERROR,
        NONE: NONE,
        enableLogPanel: enableLogPanel,
        setLogLevel: setLogLevel,
        setOutputFunction: setOutputFunction,
        setLogPrefix: setLogPrefix,
        log: log,
        debug: debug,
        trace: trace,
        info: info,
        warning: warning,
        error: error
    };
}(L));
