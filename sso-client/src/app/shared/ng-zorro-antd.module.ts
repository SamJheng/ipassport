import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSpinModule } from 'ng-zorro-antd/spin';
// import { MatButtonToggleModule } from '@angular/material/button-toggle';
// put all zorro modules
const modules = [
  NzTableModule,
  NzModalModule,
  NzSelectModule,
  NzInputModule,
  NzDropDownModule,
  NzSelectModule,
  NzRadioModule,
  NzIconModule,
  NzFormModule,
  NzInputNumberModule,
  NzButtonModule,
  NzSwitchModule,
  NzAutocompleteModule,
  NzGridModule,
  NzLayoutModule,
  NzCheckboxModule,
  NzPopconfirmModule,
  NzCollapseModule,
  NzDatePickerModule,
  NzMessageModule,
  NzDividerModule,
  NzCardModule,
  NzTreeModule,
  NzUploadModule,
  NzCarouselModule,
  NzTimePickerModule,
  NzCalendarModule,
  NzTabsModule,
  NzBadgeModule,
  NzPaginationModule,
  NzToolTipModule,
  NzProgressModule,
  NzAlertModule,
  NzListModule,
  NzTreeSelectModule,
  NzStepsModule,
  NzDrawerModule,
  NzTimelineModule,
  NzNotificationModule,
  NzTypographyModule,
  NzTagModule,
  NzResultModule,
  NzSpinModule,
  // MatButtonToggleModule,
];
@NgModule({
  declarations: [],
  exports: [modules],
  imports: [CommonModule, modules],
})
export class ZorroModule {}
