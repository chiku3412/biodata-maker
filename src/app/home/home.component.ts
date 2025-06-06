import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { PreviewDataComponent } from './preview-data/preview-data.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LightgalleryModule } from 'lightgallery/angular';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgShare from "lightgallery/plugins/share";
import lgRotate from "lightgallery/plugins/rotate";
import lgFullscreen from "lightgallery/plugins/fullscreen";

export const MY_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'dddd, MMMM D YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule, MatInputModule, MatFormFieldModule, MatExpansionModule, MatSelectModule, MatDatepickerModule, ReactiveFormsModule, MatMomentDateModule, PreviewDataComponent, LightgalleryModule],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
  ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit {
  bioDataForm!: FormGroup;
  designs: string[] = [
    'assets/images/layouts/1.jpg',
    'assets/images/layouts/2.jpg',
    'assets/images/layouts/3.jpg',
    'assets/images/layouts/4.jpg',
    'assets/images/layouts/5.jpg',
    'assets/images/layouts/6.jpg'
  ];
  selectedImage: string | null = null;
  url: any;

  constructor(
    private fb : FormBuilder,
    private dialog : MatDialog,
  ) {}

  /* Select Resume background image */
  selectDesign(image: string) {
    this.selectedImage = image;
  }

  settings = {
    counter: false,
    plugins: [lgZoom, lgThumbnail, lgShare, lgRotate, lgFullscreen,],
  };
  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };

  /* Form Group */
  initBioDataForm() {
    this.bioDataForm = this.fb.group({
      fullName: [''],
      gender: [''],
      dob: [''],
      placeOfBirth: [''],
      maritalStatus: [''],
      religion: [''],
      motherTongue: [''],
      caste: [''],
      subCaste: [''],
      education: [''],
      occupation: [''],
      organizationName: [''],
      annualIncome: [''],
      fatherName: [''],
      fatherOccupation: [''],
      motherName: [''],
      motherOccupation: [''],
      totalBrother: [''],
      totalSister: [''],
      marriedBrother: [''],
      marriedSister: [''],
      contactNo: [''],
      fatherContactNo: [''],
      motherContactNo: [''],
      address: [''],
      email: [''],
    })
  }

  /* Upload Photo */
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => { 
        this.url = event?.target?.result;
      }
    }
  }

  /* Get form data */
  get formData() {
    return this.bioDataForm.value;
  }

  /* Preview resume data */
  previewResume() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 900) {
      window.open('/preview?mode=mobile', '_blank');
    } else {
      this.dialog.open(PreviewDataComponent, {
        width: '800px',
        height: '3508px',
        panelClass: 'dialog',
        data: { bioDataForm: this.bioDataForm, showAction: true, url: this.url, selectedImage: this.selectedImage }
      });
    }
  }

  contactUs() {
    this.dialog.open(ContactUsComponent, {
      width: '700px',
      panelClass: 'dialog',
    })
  }

  ngOnInit(): void {
    this.initBioDataForm();
  }
}
