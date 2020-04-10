import { Directive, Input, OnInit, ElementRef } from '@angular/core';
import { SettingsService } from '@app/core/services/settings.service';
import { Menu } from '@app/core/models/app-settings';
@Directive({
  selector: '[appSuppress]'
})
export class SuppressDirective implements OnInit {
  @Input() appSuppress: string;
  menus: Menu[];
  constructor(readonly element: ElementRef, private settingsService: SettingsService) {
    this.menus = this.settingsService.getSettings().systemSettings.menus;
  }
  ngOnInit() {
    this.findMenuItem(this.menus, this.appSuppress);
  }

  findMenuItem(menus: Menu[], appMenu: string): void {
    menus.forEach((menu: Menu) => {
      if (menu.name === appMenu) {
        this.suppressMenu(menu);
      } else {
        if (menu.childMenus.length > 0) {
          this.findMenuItem(menu.childMenus, appMenu);
        }
      }
    });
  }

  suppressMenu(menu: Menu) {
    if (menu.visible) {
      if (!menu.enable) {
        this.element.nativeElement.disabled = true;
      }
    } else {
      this.element.nativeElement.remove();
    }
  }
}
