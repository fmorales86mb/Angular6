import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // La propiedad messageService debe ser pública porque vamos a vincularla en una plantilla.
  // Angular sólo permite vincular con las propiedades públicas de los componentes.
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
