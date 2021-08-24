import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Card } from '../card';

export const adapter = createEntityAdapter<Card>({
  selectId: (sensor: Card) => sensor._id,
  sortComparer: false
});

export interface CardsState extends EntityState<Card> {
  selectedId: string | null;
  action: string;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialstate: CardsState = adapter.getInitialState({
  selectedId: null,
  action: null,
  loading: false,
  loaded: false,
  error: null
});

export const featureKey = 'cards';
