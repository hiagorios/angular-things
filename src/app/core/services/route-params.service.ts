import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Event as RouterEvent, NavigationEnd, Params, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
// Original source by Ben Nadel
// https://www.bennadel.com/blog/3468-collecting-route-params-across-all-router-segments-in-angular-6-0-7.htm
export class RouterParamsService {

  public paramsSource = new ReplaySubject<Params>(1);
  public paramsSnapshot: Params;

  constructor(private router: Router) {

    this.paramsSnapshot = {};

    // We will collection the params after every Router navigation event. However,
    // we're going to defer param aggregation until after the NavigationEnd event.
    // This should leave the Router in a predictable and steady state.
    // --
    // NOTE: Since the router events are already going to be triggering change-
    // detection, we probably don't have to take any precautions about whether or
    // not we subscribe to these events inside the Angular Zone.
    this.router.events.pipe(filter((event: RouterEvent): boolean => {
      return (event instanceof NavigationEnd);
    })).subscribe((event: NavigationEnd): void => {
      const snapshot = this.router.routerState.snapshot.root;
      const nextParams = this.collectParams(snapshot);
      // A Router navigation event can occur for a variety of reasons, such
      // as a change to the search-params. As such, we need to inspect the
      // params to see if the structure actually changed with this
      // navigation event. If not, we don't want to emit an event.
      // if (this.paramsAreDifferent(this.paramsSnapshot, nextParams)) {
      //   this.paramsSource.next(this.paramsSnapshot = nextParams);
      // }
      // I changed because i want to update even if only the url changed
      this.paramsSource.next(this.paramsSnapshot = nextParams);
    });
  }

  // ---
  // PRIVATE METHODS.
  // ---

  // I collect the params from the given router snapshot tree.
  // --
  // CAUTION: All params are merged into a single object. This means that like-named
  // params in different tree nodes will collide and overwrite each other.
  private collectParams(root: ActivatedRouteSnapshot): Params {
    const params: Params = {};

    (function mergeParamsFromSnapshot(snapshot: ActivatedRouteSnapshot) {
      Object.assign(params, snapshot.params);
      snapshot.children.forEach(mergeParamsFromSnapshot);
    })(root);

    return (params);
  }

  // I determine if the given param collections have a different [shallow] structure.
  private paramsAreDifferent(currentParams: Params, nextParams: Params): boolean {
    const currentKeys = Object.keys(currentParams);
    const nextKeys = Object.keys(nextParams);
    // If the collection of keys in each set of params is different, then we know
    // that we have two unique collections.
    if (currentKeys.length !== nextKeys.length) {
      return (true);
    }

    // If the collections of keys have the same length then we have to start
    // comparing the individual KEYS and VALUES in each collection.
    for (let i = 0, length = currentKeys.length; i < length; i++) {
      let key = currentKeys[i];
      // Compare BOTH the KEY and the VALUE. While this looks like it is comparing
      // the VALUE alone, it is implicitly comparing the KEY as well. If a key is
      // defined in one collection but not in the other collection, one of the
      // values will be read as "undefined". This "undefined" value implies that
      // either the KEY or the VALUE was different.
      if (currentParams[key] !== nextParams[key]) {
        return (true);
      }
    }
    // If we made it this far, there was nothing to indicate that the two param
    // collections are different.
    return (false);
  }
}
