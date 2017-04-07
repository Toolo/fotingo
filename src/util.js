import R from 'ramda';
import createDebugger from 'debug';
import app from '../package.json';
import reporter from './reporter';

export const debug = R.curryN(2, (module, msg) => createDebugger(`${app.name}:${module}`)(msg));

export const debugCurried = R.curryN(3, (module, msg, args) => {
  debug(module, msg);
  return args;
});

export const error = R.ifElse(
  R.is(Error),
  R.compose(reporter.error, R.last, R.reject(R.isNil), R.props(['message', 'stack'])),
  R.compose(
    reporter.error,
    R.ifElse(R.is(String), R.identity, R.partialRight(JSON.stringify, [null, 2])),
  ),
);

export const errorCurried = R.curryN(2, (msg, args) => {
  error(msg);
  return args;
});

export const debugCurriedP = R.curryN(3, (module, msg, args) => {
  debug(module, msg);
  return Promise.resolve(args);
});

export const wrapInPromise = val => Promise.resolve(val);

export const promisify = func =>
  (...args) =>
    new Promise((resolve, reject) =>
      R.apply(func, [
        ...R.reject(R.isNil, args),
        R.ifElse(
          R.compose(R.not, R.isNil, R.nthArg(0)),
          reject,
          R.unapply(R.compose(R.apply(resolve), R.tail)),
        ),
      ]));
