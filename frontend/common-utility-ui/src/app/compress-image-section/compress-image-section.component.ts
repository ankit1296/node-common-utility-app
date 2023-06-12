import { Component, OnInit } from '@angular/core';
import { UtilityServiceService } from '../utility-service.service';

@Component({
  selector: 'compress-image-section',
  templateUrl: './compress-image-section.component.html',
  styleUrls: ['./compress-image-section.component.scss']
})
export class CompressImageSectionComponent implements OnInit {

  constructor(private utility:UtilityServiceService) { }

  ngOnInit(): void {
  }

  selectFile(): void {
    const fileChooser = document.querySelector('#choose-file') as HTMLInputElement;
    if(fileChooser) {
      fileChooser.click();
    }
  }

  getFile(event:any): void {
   if(event) {
    console.log(event.target.files[0]);
    this.utility.compressImage(event.target.files[0]);
   }
  }

}
