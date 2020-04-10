import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { VirtualAssistantFacade } from '@app/more/virtual-assistant/facade';

@Component({
  selector: 'virtual-assistant',
  templateUrl: './virtual-assistant.page.html',
  styleUrls: ['./virtual-assistant.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VirtualAssistantPage implements OnInit {
  inputMessage = '';
  @ViewChild('scrollElement', { static: false }) content: IonContent;

  constructor(public virtualAssistantFacade: VirtualAssistantFacade) {}

  ngOnInit() {
    this.virtualAssistantFacade.initialize();
  }

  ionViewDidEnter() {
    this.virtualAssistantFacade.scrollContent = this.content;
    this.virtualAssistantFacade.scrollToBottom();
  }

  sendMessage() {
    if (!this.inputMessage.trim()) {
      return false;
    }
    this.virtualAssistantFacade.sendMessage(this.inputMessage);
    this.inputMessage = '';
  }

  onFocus() {}

  typeAhead() {}

  submitSuggestedEntry(suggestedEntry: string) {
    this.virtualAssistantFacade.submitSuggestedEntry(suggestedEntry);
  }

  sendFaqMsg(relativeResult: any) {
    this.virtualAssistantFacade.sendFaqMsg(relativeResult);
  }
}
