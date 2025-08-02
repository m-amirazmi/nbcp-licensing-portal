import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './pages/login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('web');
  protected readonly description = signal(
    'This is the web app for the project.',
  );
}
