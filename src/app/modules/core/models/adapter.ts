/**
 *  Used for api responses to adapt from dto of service to model used in view.
 *
 * @export
 * @interface Adapter
 * @template T
 */
export interface Adapter<T, S> {
  adapt(item: T): S;
}
