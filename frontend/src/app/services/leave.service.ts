import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface LeaveApplication {
  id?: number;
  employee_id: number;
  start_date: Date;
  end_date: Date;
  reason: string;
  status?: string;
  leave_type: string;
}

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:3000';

  getAvailableLeave(): number {
    // This should be an API call in a real application
    return 20;
  }

  getApprovedLeave(): number {
    // This should be an API call in a real application
    return 5;
  }

  getPendingLeave(): number {
    // This should be an API call in a real application
    return 2;
  }

  getLeaveTypes(): string[] {
    // This should be an API call in a real application
    return ['Annual Leave', 'Sick Leave', 'Parental Leave'];
  }

  getRecentApplications(): Observable<LeaveApplication[]> {
    // This should be an API call in a real application
    return this.http.get<LeaveApplication[]>(
      `${this.baseUrl}/leave_applications`
    );
  }

  submitLeaveApplication(
    application: LeaveApplication
  ): Observable<LeaveApplication> {
    // This should be a POST request to your API
    console.log('Submitting leave application', application);
    return this.http.post<LeaveApplication>(
      `${this.baseUrl}/leave_applications`,
      application
    );
  }

  getLeaveEvents(): Observable<any[]> {
    // This should be an API call in a real application
    return of([
      {
        start: new Date(2023, 7, 1),
        end: new Date(2023, 7, 5),
        title: 'Annual Leave',
      },
      {
        start: new Date(2023, 7, 15),
        end: new Date(2023, 7, 15),
        title: 'Sick Leave',
      },
    ]);
  }
}
