import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-leave-calendar',
  standalone: true,
  imports: [CommonModule, CardModule, CalendarModule],
  templateUrl: './leave-calendar.component.html',
  styleUrls: ['./leave-calendar.component.css'],
})
export class LeaveCalendarComponent implements OnInit {
  leaveDays: Date[] = [];

  constructor(private leaveService: LeaveService) {}

  ngOnInit() {
    this.leaveService.getLeaveEvents().subscribe((events) => {
      this.leaveDays = events.map((event) => new Date(event.start));
    });
  }

  isLeaveDay(date: any): boolean {
    return this.leaveDays.some(
      (leaveDay) =>
        leaveDay.getDate() === date.day &&
        leaveDay.getMonth() === date.month &&
        leaveDay.getFullYear() === date.year
    );
  }

  onDateSelect(date: Date) {
    console.log('Selected date:', date);
    // You can add logic here to show leave details for the selected date
  }
}
