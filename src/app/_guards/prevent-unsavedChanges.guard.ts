import { Injectable } from '@angular/core';
import { Router, CanDeactivate } from '@angular/router';
import { AuthService } from '../services/Auth.service';
import { AlertifyService } from '../services/alertify.service';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable({
    providedIn: 'root'
})
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {

    constructor(private _auth: AuthService) { }
    canDeactivate(component: MemberEditComponent) {
        if (component.userForm.dirty) {
            return confirm('Are you sure you want to leave ?');
        }
            return true;
    }

}
