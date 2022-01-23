import {
  AppState
} from './../../store/app-reducer';
import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

export const GetAuthInfo = createSelector(
  createFeatureSelector('AuthState'),
  (state: AppState["Auth"]) => {
    return state;
  });
