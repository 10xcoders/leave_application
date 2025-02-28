import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeaveApplication, LeaveService } from '../../services/leave.service';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CardModule,
    TableModule,
    TagModule,
    ButtonModule,
    DialogModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  availableLeave: number = 0;
  approvedLeave: number = 0;
  pendingLeave: number = 0;
  leaveTypes: string[] = [];
  recentApplications: LeaveApplication[] = [];
  displayDialog: boolean = false;
  selectedApplication: any = null;

  constructor(private leaveService: LeaveService) {}

  ngOnInit() {
    this.loadDashboardData();
    this.leaveService.getRecentApplications().subscribe((applications) => {
      this.recentApplications = applications;
    });
  }

  loadDashboardData() {
    // In a real application, these would be API calls
    this.availableLeave = this.leaveService.getAvailableLeave();
    this.approvedLeave = this.leaveService.getApprovedLeave();
    this.pendingLeave = this.leaveService.getPendingLeave();
    this.leaveTypes = this.leaveService.getLeaveTypes();
  }

  showDialog(application: any) {
    this.selectedApplication = application;
    this.displayDialog = true;
  }

  updateStatus(status: 'approved' | 'rejected') {
    if (this.selectedApplication) {
      this.selectedApplication.status = status;
      // Here you would typically call a service to update the status in the backend
      console.log(
        `Application ${this.selectedApplication.employee_id} ${status}`
      );
      this.displayDialog = false;
    }
  }
}
