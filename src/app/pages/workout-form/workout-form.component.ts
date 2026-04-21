import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../../services/workout.service';
import { Workout } from '../../models/workout.model';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './workout-form.component.html'
})
export class WorkoutFormComponent implements OnInit {
  workout: Workout = { title: '', exercise_type: '', duration: 0, calories: 0, date: '', notes: '' };
  isEdit = false;
  workoutId!: number;
  errorMsg = '';

  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.isEdit = true;
    this.workoutId = +id;
    this.workoutService.getWorkouts().subscribe({
      next: (data) => {
        const found = data.find(w => w.id === this.workoutId);
        if (found) {
          this.workout = {
            id: found.id,
            title: found.title,
            exercise_type: found.exercise_type,
            duration: found.duration,
            calories: found.calories,
            date: found.date,
            notes: found.notes
          };
        }
      },
      error: () => { this.errorMsg = 'Failed to load workout'; }
    });
  }
}

  onSubmit(): void {
    if (this.isEdit) {
      this.workoutService.updateWorkout(this.workoutId, this.workout).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: () => { this.errorMsg = 'Update failed'; }
      });
    } else {
      this.workoutService.createWorkout(this.workout).subscribe({
        next: () => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/dashboard']);
          });
        },
        error: () => { this.errorMsg = 'Create failed'; }
      });
    }
  }
}