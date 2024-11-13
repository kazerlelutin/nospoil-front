
export interface Method<P, R> {
  data: R | null;
  loading: boolean;
  error: string | null;
  action: (payload: P) => Promise<R>;
}

export interface CrudActions<T> {
  getList: Method<void, T[]>;
  getItem: Method<number | string, T>;
  create: Method<Partial<T>, T>;
  update: Method<{ id: number | string; data: Partial<T> }, T>;
  delete: Method<number | string, void>;
}
