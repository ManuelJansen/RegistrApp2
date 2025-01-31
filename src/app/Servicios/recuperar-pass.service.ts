import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class RecuperarPassService {

  private serviceID = 'service_4ttr08h';
  private templateID = 'template_f3ecp69';
  private userID = 'kRaB75fyF4C_PSGAO';

  constructor() {
    emailjs.init(this.userID);
  };

  sendEmail(formData: any): Promise<EmailJSResponseStatus>{
    return emailjs.send(this.serviceID, this.templateID, formData);
  };
}
