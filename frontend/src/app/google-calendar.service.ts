import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

declare const gapi: any; // Declare gapi

@Injectable({
  providedIn: 'root',
})
export class GoogleCalendarService {
  private CLIENT_ID = '655749927466-41vnoie7jij1ib1kadq5kc540i361jjc.apps.googleusercontent.com';
  private API_KEY = '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';
  private DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  private SCOPES = 'https://www.googleapis.com/auth/calendar';

  constructor() {
    this.loadClient();
  }

  private loadClient() {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: this.API_KEY,
        clientId: this.CLIENT_ID,
        discoveryDocs: this.DISCOVERY_DOCS,
        scope: this.SCOPES,
      });
    });
  }

  public async signIn() {
    return await gapi.auth2.getAuthInstance().signIn();
  }

  public async signOut() {
    return await gapi.auth2.getAuthInstance().signOut();
  }

  public listEvents(): Observable<any> {
    return new Observable((observer) => {
      gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      }).then((response: any) => {
        observer.next(response.result.items);
        observer.complete();
      });
    });
  }
}
