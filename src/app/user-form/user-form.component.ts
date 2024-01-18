import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  firstName: string = '';
  lastName: string = '';
  ohrId: string = '';
  submitted: boolean = false;
  decision: string = '';
  

  constructor(private http: HttpClient) {}

  onSubmit() {
    // Perform API call
    const apiUrl = 'http://localhost:8080/addEmployee';
    const requestData = {
      firstName: this.firstName,
      lastName: this.lastName,
      ohrId: this.ohrId
    };
    

    this.http.post(apiUrl, requestData).subscribe(
      (response: any) => {
        console.log(requestData);
       this.submitted = true;
       console.log(response);
      },
      (error) => {
        console.error('API error:', error);
      }
    );
  }

  file: File | null = null;

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
    }
  }

  onDecisionSubmit() {
    
    const apiUrl = 'http://localhost:8080/approval'; 
    const decisionData = {
      decision: this.decision
    };

    const formData: FormData = new FormData();
    formData.append('decision', this.decision);

     if (this.file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const fileBlob = new Blob([event.target.result], { type: 'application/pdf' });
        formData.append('pdfFile', fileBlob, this.file!.name);
        
        this.performApiCall(formData, apiUrl);
      };

      reader.readAsArrayBuffer(this.file);
    } else {
      this.performApiCall(formData, apiUrl);
    }
  }

  /*  this.http.post(apiUrl, formData).subscribe(
      (response: any) => {
        console.log(formData);
        console.log('API call successful');
        console.log(response);
       },
      (error) => {
        console.error('API error:', error);
      }
    );*/
    private performApiCall(formData: FormData, apiUrl: string): void {
      this.http.post(apiUrl, formData).subscribe(
        (response: any) =>  {
          console.log(formData);
          console.log('API call successful');
          console.log(response);
         },
         (error) => {
          console.error('API error:', error);
        }
      );
  }

}