export default defaultsDeep;

declare function defaultsDeep<A = {}, B = A>(target: A, current: B): A&B;
