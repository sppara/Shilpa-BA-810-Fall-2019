import {
  inject
} from 'aurelia-framework';
import {
  DataServices
} from './data-services';

@inject(DataServices)
export class Widget {
  constructor(data) {
    this.data = data;
    this.WIDGET_SERVICE = 'widgets';
  }

  newWidget() {
    this.selectedWidget = {};
    this.selectedWidget.Boo = "";
    this.selectedWidget.Hoo = new Date();
    // this.selectedWidget.userId = id;
  }
  async saveWidget() {
    let serverResponse;
    if (this.selectedWidget) {
      if (this.selectedWidget._id) {
        let url = this.WIDGET_SERVICE + "/" + this.selectedWidget._id;
        serverResponse = await this.data.put(this.selectedWidget, url);
      } else {
        serverResponse = await this.data.post(this.selectedWidget, this.WIDGET_SERVICE);
      }
      return serverResponse;
    }
  }
  async getWidgets() {
    let url = this.WIDGET_SERVICE;
    let response = await this.data.get(url);
    if (!response.error) {
      this.widgetsArray = response;
    } else {
      this.widgetsArray = [];
    }
  }

  async deleteWidget(widgetId) {
    console.log(widgetId)
    let url = this.WIDGET_SERVICE + '/' + widgetId;
    let response = await this.data.delete(url);
    if (!response.error) {
      this.widgetsArray = response;
    } else {
      this.widgetsArray = [];
    }
  }

}
