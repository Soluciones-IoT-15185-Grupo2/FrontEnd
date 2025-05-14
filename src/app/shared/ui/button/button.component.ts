import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  standalone: false,
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() classes = 'px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700';
  @Input() disabled = false;
}
