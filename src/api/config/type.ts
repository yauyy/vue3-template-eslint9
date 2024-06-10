export interface Params<T> {
  params?: T;
}

export interface ApiResult<T = any> {
  ErrCode: number;
  ErrMsg: string;
  Result?: T;
  Results?: T[];
}
