import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, delay, map, retryWhen, take, tap } from 'rxjs'
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseApiUrl = 'http://localhost:3333'

  constructor(private http: HttpClient) {}

  RegisterProspect(file: any, data: any): Observable<any> {
    const formData = new FormData()

    formData.append('file', file, file.name)
    formData.append('name', data.name.value)
    formData.append('email', data.email.value)
    formData.append('phone', data.phone.value)

    return this.http
      .post(`${this.baseApiUrl}/prospect/register`, formData)
      .pipe(map((obj: any) => obj))
      .pipe(retryWhen((errors) => errors.pipe(delay(1000), take(3))))
  }

  readProspects(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/prospects`)
  }

  deleteProspects(id: string): Observable<any> {
    return this.http
      .delete(`${this.baseApiUrl}/prospects/delete/${id}`)
      .pipe(map((obj: any) => obj))
      .pipe(retryWhen((errors) => errors.pipe(delay(1000), take(3))))
  }

  /* RegisterAddresses(data: any): Observable<any> {
    const formData = new FormData()

    formData.append('name', data.name.value)
    formData.append('email', data.email.value)
    formData.append('phone', data.phone.value)

    return this.http
      .post(`${this.baseApiUrl}/address/register`, formData)
      .pipe(map((obj: any) => obj))
      .pipe(retryWhen((errors) => errors.pipe(delay(1000), take(3))))
  } */

  readAdreeses(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/addresses`)
  }

  deleteAddresses(id: string): Observable<any> {
    return this.http
      .delete(`${this.baseApiUrl}/addresses/delete/${id}`)
      .pipe(map((obj: any) => obj))
      .pipe(retryWhen((errors) => errors.pipe(delay(1000), take(3))))
  }

  getCountries(): Observable<any> {
    debugger
    return this.http
      .get('https://servicodados.ibge.gov.br/api/v1/paises')

  }
}
