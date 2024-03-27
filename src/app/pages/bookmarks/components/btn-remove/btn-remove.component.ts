import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-btn-remove',
  templateUrl: './btn-remove.component.html',
  styleUrl: './btn-remove.component.scss'
})
export class BtnRemoveComponent {
  @Output() removeFavorite = new EventEmitter()

  onRemoveFavorite() {
    this.removeFavorite.emit()
  }
}
