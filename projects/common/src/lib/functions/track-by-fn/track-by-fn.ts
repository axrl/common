/**
 * @deprecated Use TrackByPropertyDirective / TrackByIdDirective / TrackByIndexDirective.
 */
export function trackByFn<T>(index: number, item: T): number {
    return index;
}
