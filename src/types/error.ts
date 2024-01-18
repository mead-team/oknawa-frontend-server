type ErrorType<T> = {
  error: T | unknown;
};

export type ErrorNotify = ErrorType<object>['error'];
