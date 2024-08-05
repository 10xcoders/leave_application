import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LeaveService } from '../../services/leave.service';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-leave-application',
  standalone: true,
  imports: [
    FormsModule,
    CardModule,
    DropdownModule,
    CalendarModule,
    InputTextareaModule,
    ButtonModule,
    ToastModule,
  ],
  templateUrl: './leave-application.component.html',
  providers: [MessageService],
})
export class LeaveApplicationComponent {
  leaveTypes: string[] = [];
  startDate: Date | null = null;
  endDate: Date | null = null;
  selectedType: string | null = null;
  reason: string = '';

  constructor(
    private leaveService: LeaveService,
    private messageService: MessageService
  ) {
    this.leaveTypes = this.leaveService.getLeaveTypes();
  }

  onSubmit() {
    if (
      !this.startDate ||
      !this.endDate ||
      !this.selectedType ||
      !this.reason
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all fields',
      });
      return;
    }

    this.leaveService
      .submitLeaveApplication({
        employee_id: 1,
        start_date: this.startDate,
        end_date: this.endDate,
        leave_type: this.selectedType,
        reason: this.reason,
        status: 'pending',
      })
      .subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Leave application submitted',
          });
          this.startDate = null;
          this.endDate = null;
          this.selectedType = null;
          this.reason = '';
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to submit application',
          });
        }
      );
  }
}
