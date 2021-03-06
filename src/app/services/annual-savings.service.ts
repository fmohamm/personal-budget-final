import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AuthService }  from '../auth/auth.service';
import { AnnualSavings } from '../models/annual-savings';

@Injectable({
  providedIn: 'root'
})
export class AnnualSavingsService {

  private userID = this.authService.getUid();
  private dbPath = '/data/' + this.userID + '/annualSavings';

  annualSavingsRef: AngularFireList<AnnualSavings> = null;

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
    this.annualSavingsRef = this.db.list(this.dbPath);
  }

  public getAll(): AngularFireList<AnnualSavings> {
    return this.annualSavingsRef;
  }

  create(annualSavings: AnnualSavings) {
    return this.annualSavingsRef.push(annualSavings).then(res => {
      res.key;
    });
  }

  update(key: string, value: any): Promise<void> {
    return this.annualSavingsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.annualSavingsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.annualSavingsRef.remove();
  }
}
