import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WorkoutService } from '../../services/workout.service';
import { Workout } from '../../models/workout.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  workouts: Workout[] = [];
  errorMsg = '';

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.loadWorkouts();
  }

  loadWorkouts(): void {
    this.workoutService.getWorkouts().subscribe({
      next: (data) => { this.workouts = data; },
      error: () => { this.errorMsg = 'Failed to load workouts. Please login again.'; }
    });
  }

  deleteWorkout(id: number): void {
  this.workoutService.deleteWorkout(id).subscribe({
    next: () => { this.loadWorkouts(); },
    error: () => { this.errorMsg = 'Failed to delete'; }
  });
}

  getTotalDuration(): number {
    return this.workouts.reduce((sum, w) => sum + w.duration, 0);
  }

  getTotalCalories(): number {
    return this.workouts.reduce((sum, w) => sum + w.calories, 0);
  }
}