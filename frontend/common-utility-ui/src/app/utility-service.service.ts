import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityServiceService {
  constructor(private http: HttpClient) {}

  compressImage(file: any): void {
    const formData: FormData = new FormData();
    const type = file.type && file.type.substring(6);
    formData.append('file', file);
    this.http
      .post('http://localhost:5000/compress', formData, {
        responseType: 'blob',
      })
      .subscribe(
        (data) => {
          console.log(data);
          const anchor = document.createElement('a');
          anchor.download = `${new Date().getTime().toString()}.${type}`;
          anchor.href = (window.webkitURL || window.URL).createObjectURL(data);
          anchor.click();
        },
        (err) => {
          console.error(err);
        }
      );
  }
}
