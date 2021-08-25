import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Card, CardId } from './card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(public http: HttpClient) { }

  findAll(): Observable<Array<Card>> {
    return this.http.get<Array<Card>>(`${environment.api}/api/cards`);
  }

  findById(id: string): Observable<Card> {
    return this.http.get<Card>(`${environment.api}/api/cards/${id}`);
  }

  create(card: Omit<Card, CardId>): Observable<Card> {
    return this.http.post<Card>(`${environment.api}/api/cards`, card);
  }

  update(card: Card): Observable<Card> {
    const { _id, ...fieldsToUpdate } = card;
    return this.http.patch<Card>(`${environment.api}/api/cards/${_id}`, fieldsToUpdate);
  }

  partialUpdate(id: string, card: Partial<Card>): Observable<Card> {
    const { _id, ...fieldsToUpdate } = card;
    return this.http.patch<Card>(`${environment.api}/card/GetById/${id}`, fieldsToUpdate);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${environment.api}/api/cards/${id}`);
  }
}
