import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SessionStorageService {
	private storage: Storage;
	constructor() {
		this.storage = window.sessionStorage;
	}

	public set(key: any, data: any) {
		this.storage.setItem(key, JSON.stringify(data));
	}

	public get(key: string) {
		return JSON.parse(this.storage.getItem(key));
	}
}
