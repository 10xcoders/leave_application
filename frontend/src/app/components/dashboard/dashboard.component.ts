import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeaveService } from '../../services/leave.service';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

interface LeaveApplication {
  startDate: string;
  endDate: string;
  reason: string;
  status?: 'Approved' | 'Pending' | 'Rejected';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, CardModule, TableModule, TagModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  availableLeave: number = 0;
  approvedLeave: number = 0;
  pendingLeave: number = 0;
  leaveTypes: any[] = [];
  recentApplications: any[] = [];

  constructor(private leaveService: LeaveService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    // In a real application, these would be API calls
    this.availableLeave = this.leaveService.getAvailableLeave();
    this.approvedLeave = this.leaveService.getApprovedLeave();
    this.pendingLeave = this.leaveService.getPendingLeave();
    this.leaveTypes = this.leaveService.getLeaveTypes();
    this.recentApplications = this.leaveService.getRecentApplications();
  }
}
