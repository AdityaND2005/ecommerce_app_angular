import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    FloatLabelModule,
    ToastModule
  ],
  templateUrl: './profile-update.component.html',
  styleUrl: './profile-update.component.scss'
})
export class ProfileUpdateComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);

  profileForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(2)]],
    lastname: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    city: ['', Validators.required],
    street: ['', Validators.required],
    zipcode: ['', Validators.required]
  });

  userId!: number;

  ngOnInit(): void {
    this.userId = Number(this.authService.getUserId());
    this.loadUserData();
  }

  get f() {
    return this.profileForm.controls;
  }

  loadUserData() {
    this.userService.loadUserData(this.userId).subscribe({
      next: (user: any) => {
        this.profileForm.patchValue({
          firstname: user.name.firstname,
          lastname: user.name.lastname,
          email: user.email,
          phone: user.phone,
          city: user.address.city,
          street: user.address.street,
          zipcode: user.address.zipcode
        });
      }
    })
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const formValues = this.profileForm.value;

    const updatePayload = {
      email: formValues.email,
      name: {
        firstname: formValues.firstname,
        lastname: formValues.lastname
      },
      phone: formValues.phone,
      address: {
        city: formValues.city,
        street: formValues.street,
        zipcode: formValues.zipcode,
        number: 3,
        geolocation: { lat: '0', long: '0' }
      }
    };

    this.userService.updateUserData(updatePayload, this.userId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Profile Updated',
          detail: 'Your changes have been saved successfully.',
          key: "profile-update"
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Update Failed',
          detail: 'There was an issue saving your profile.',
          key: "profile-update"
        });
      }
    });
  }
}
