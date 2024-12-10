import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  providers: [UserService],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchQuery = new BehaviorSubject<string>('');

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data;
    });

    this.searchQuery.subscribe((query) => {
      this.filteredUsers = this.users.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
    });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input) {
      this.searchQuery.next(input.value);
    }
  }
}
