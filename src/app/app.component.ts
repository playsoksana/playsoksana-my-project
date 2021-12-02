import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import axios from 'axios';
axios.defaults.baseURL = 'https://boiling-refuge-66454.herokuapp.com/images';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'my-project';
  currentId: string = '';
  storeImage = Array();
  currentElement = Object();

  //  ============= Async ==================
  async ngOnInit() {
    await this.getListPhoto();
  }

  async getListPhoto() {
    try {
      const { data } = await axios('');
      this.storeImage = data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async getElement() {
    this.currentElement = [];
    try {
      const arr = (await axios('')).data;
      const urlLargeImage = (await axios(`${this.currentId}`)).data;
      const element = arr?.filter(
        (e: any) => e.id.toString() == this.currentId
      )[0];
      this.currentElement = { ...element, url: urlLargeImage.url };
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async addComment(comments: string) {
    try {
      const { data } = await axios.post(`${this.currentId}/comments`, {
        comments,
      });
      console.log('Success:', JSON.stringify(data));
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // ================Modal======================

  modalRef?: BsModalRef | null;
  modalRef2?: BsModalRef;
  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      id: 1,
      class: 'modal-lg',
    });
  }
  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, {
      id: 2,
      class: 'second',
    });
  }
  closeFirstModal() {
    if (!this.modalRef) {
      return;
    }

    this.modalRef.hide();
    this.modalRef = null;
  }
  closeModal(modalId?: number) {
    this.modalService.hide(modalId);
  }
  // ============Image===================

  getImage(event: any) {
    this.currentId = event.target.id;
    if (this.currentId) {
      this.getElement();
    }
  }

  // ========Form============
  onSubmit(event: any) {
    const comment = event.currentTarget.text.value;
    this.modalService.hide();
    this.addComment(comment);
  }
}
