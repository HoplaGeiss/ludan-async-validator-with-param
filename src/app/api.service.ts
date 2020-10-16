import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Cat } from './cat.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  getCats(): Observable<Cat[]> {
    return of([
      { id: '1', name: 'Popsi', age: 2 },
      { id: '2', name: 'Luna', age: 1 },
      { id: '3', name: 'Minette', age: 3 },
      { id: '4', name: 'Molo', age: 3 },
      { id: '5', name: 'Bern', age: 8 }
    ]).pipe(delay(300));
  }
}
