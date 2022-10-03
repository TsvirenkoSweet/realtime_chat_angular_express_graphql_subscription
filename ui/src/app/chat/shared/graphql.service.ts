import { Injectable, NgZone } from '@angular/core';
import { GraphQLClient } from 'graphql-request'
import { createClient, SubscribePayload} from 'graphql-ws';
import {from, Observable} from 'rxjs';

const client = createClient({
  url: 'ws://localhost:3003/graphql',
});


@Injectable({providedIn: 'root'})
export class GraphQLService {

  private graphQLHttpEndpoint = 'http://localhost:3003/graphql'

  private graphQLClient = new GraphQLClient(this.graphQLHttpEndpoint)

  constructor(private ngZone: NgZone) {}

  fetch(document: string, variables?: any): Observable<any> {
    return from(this.graphQLClient.request(document, variables))
  }

  subscription(operation: SubscribePayload): Observable<any> {
    return new Observable((observer) =>
      client.subscribe(operation, {
        next: ({ data }) => this.ngZone.run(() => observer.next(data)),
        error: (err) => this.ngZone.run(() => observer.error(err)),
        complete: () => this.ngZone.run(() => observer.complete()),
      }),
    );
  }
}
