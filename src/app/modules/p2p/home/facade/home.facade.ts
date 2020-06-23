import { P2PService } from '@app/p2p/services/p2p.service';
import { Observable } from 'rxjs';
import { IContact } from '@app/p2p/models';
import { Injectable } from '@angular/core';
@Injectable()
export class HomeP2PFacade {
  constructor(private p2pService: P2PService) {}

  getAllContacts(): Observable<IContact[]> {
    return this.p2pService.getAllContacts();
  }
}
