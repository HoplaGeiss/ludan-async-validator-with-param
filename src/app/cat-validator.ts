import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, first, map, switchMap } from 'rxjs/operators';

import { ApiService } from './api.service';
import { Cat } from './cat.model';

@Injectable({ providedIn: 'root' })
export class CatValidator {
  constructor(private apiService: ApiService) {}
  validate(catIds: string[]): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.valueChanges) return of(null);
      return control.valueChanges.pipe(
        map((value) => value.trim()),
        filter((value) => value !== ''),
        debounceTime(100),
        distinctUntilChanged(),
        switchMap((value: string) => this.valueIsUnique(value, catIds)),
        map((unique: boolean) => (unique ? null : { duplicateError: true })),
        first()
      );
    };
  }

  private valueIsUnique(value: string, catIds: string[]): Observable<boolean> {
    return this.apiService.getCats().pipe(
      map((cats: Cat[]) => {
        return !cats
          .filter((cat: Cat) => !catIds.includes(cat.id))
          .find((cat: Cat) => cat.name === value);
      })
    );
  }
}
