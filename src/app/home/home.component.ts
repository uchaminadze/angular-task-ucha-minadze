import {
  Component,
  OnInit,
  ElementRef,
  HostListener,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  userList: any[] = [];
  contextMenuStyle: any = {};
  isContextMenuOpen: boolean = false;
  currentUser: number | undefined;

  @ViewChild('usersTable') usersTable: ElementRef | undefined;

  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getUserList();
    this.closeContextMenu();
  }

  ngOnDestroy(): void {
    this.closeContextMenu();
  }

  getUserList() {
    this.httpClient
      .get('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (res: any) => (this.userList = res),
        error: (error: any) => console.error('Error: ' + error),
      });
  }

  openContextMenu(event: MouseEvent, id: any) {
    event.preventDefault();
    this.contextMenuStyle = {
      display: 'block',
      position: 'absolute',
      width: '8%',
      'min-width': '73px',
      'left.px': event.pageX + 30,
      'top.px': event.pageY - 20,
      'border-radius': '3px',
      border: '1px solid rgb(222,226,230)',
      'box-shadow': '3px 3px 2px rgba(0, 0, 0, 0.2)',
    };
    this.isContextMenuOpen = !this.isContextMenuOpen;
    this.currentUser = id;
    if (!this.isContextMenuOpen) {
      this.closeContextMenu();
    }
  }

  closeContextMenu() {
    this.contextMenuStyle = {
      display: 'none',
    };
    this.isContextMenuOpen = false;
  }

  onClickUserDetails() {
    this.router.navigate([`details/${this.currentUser}`]);
    this.closeContextMenu();
  }

  onClickDeleteUser() {
    this.userList = this.userList.filter(
      (user) => user.id !== this.currentUser
    );
    this.closeContextMenu();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInsideUsersTable = this.usersTable?.nativeElement?.contains(
      event.target
    );
    if (!clickedInsideUsersTable) {
      this.closeContextMenu();
    }
  }
}
