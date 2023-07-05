export interface ActionProps<T> {
  set: (setter: (state: T) => void) => void;
  get: () => T;
}