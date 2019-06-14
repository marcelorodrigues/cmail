import { NgModule } from '@angular/core';
import { CmailFormGroupComponent } from './cmail-form-group.component';
import { CmailFormFieldDirective } from './cmail-form-field.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [CmailFormGroupComponent, CmailFormFieldDirective],
    imports: [CommonModule],
    exports: [CmailFormGroupComponent, CmailFormFieldDirective]
})
export class CmailFormModule{}