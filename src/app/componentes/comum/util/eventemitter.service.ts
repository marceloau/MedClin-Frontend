import { Injectable } from '@angular/core';

import { EventEmitter } from '@angular/core';
@Injectable({
  providedIn: "root"
})
export class EventEmitterService {

  perfilEmmiter: EventEmitter<boolean> = new EventEmitter<boolean>();

    private static emitters: {
        [nomeEvento: string]: EventEmitter<any>
    } = {}

    static get (nomeEvento:string): EventEmitter<any> {
        if (!this.emitters[nomeEvento])
            this.emitters[nomeEvento] = new EventEmitter<any>();
        return this.emitters[nomeEvento];
    }

}
