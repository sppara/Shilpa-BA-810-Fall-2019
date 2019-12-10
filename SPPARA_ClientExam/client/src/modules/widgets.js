import {
  inject
} from 'aurelia-framework';

import {
  Widget
} from '../resources/data/widget-object';

@inject(Widget)
export class Widgets {
  constructor(widget) {
    this.widget = widget;
  }

  newWidget() {
    this.widget.newWidget();
    this.showForm = true;
  }

  editWidget(widget) {
    this.widget.selectedWidget = widget;
    this.showForm = true;
  }
  async saveWidget() {
    console.log('saving widget')
    await this.widget.saveWidget()
    this.getWidgets()
    this.showForm = false
  }
  async attached() {
    await this.getWidgets();
  }

  async getWidgets() {
    await this.widget.getWidgets();
    this.showForm = false;
  }

  async deleteWidget(wigdet) {
    await this.widget.deleteWidget(wigdet._id)
    this.getWidgets();
  }

  Cancel() {
    this.showForm = false;
  }

}
