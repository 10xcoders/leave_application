import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  constructor(private http: HttpClient) {}

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

  getLeaveTypes(): any[] {
    // This should be an API call in a real application
    return [
      { name: 'Annual Leave', balance: 15 },
      { name: 'Sick Leave', balance: 10 },
      { name: 'Personal Leave', balance: 3 },
    ];
  }

  getRecentApplications(): any[] {
    // This should be an API call in a real application
    return [
      { date: '2023-08-01', type: 'Annual Leave', status: 'Approved' },
      { date: '2023-08-15', type: 'Sick Leave', status: 'Pending' },
    ];
  }

  submitLeaveApplication(application: any): Observable<any> {
    // This should be a POST request to your API
    return of({ success: true });
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
