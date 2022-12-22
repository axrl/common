import { NgModule } from '@angular/core';
import { AsyncPipe, NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule, MAT_PAGINATOR_DEFAULT_OPTIONS } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RuDateMediumPipe, TranslatePipe, ControlErrorMessagePipe, LANGUAGE_PERSON_SETTINGS_START_VALUE, LanguagePersonSettingsService } from '@axrl/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { OneTableExpandedRowContentProjectDirective, CmkTableKeyboardListenerDirective } from './directives';
import { OneTableComponent } from './one-table.component';
import { ColumnPipe } from './pipes';
import { PERSON_SETTINGS_START_VALUE } from './one-table.service';

@NgModule({
  declarations:
    [
      OneTableComponent,
      CmkTableKeyboardListenerDirective,
      OneTableExpandedRowContentProjectDirective,
      ColumnPipe
    ],
  providers: [
    {
      provide: LANGUAGE_PERSON_SETTINGS_START_VALUE,
      useExisting: PERSON_SETTINGS_START_VALUE
    },
    {
      provide: LanguagePersonSettingsService,
      useClass: LanguagePersonSettingsService
    },
    {
      provide: MAT_PAGINATOR_DEFAULT_OPTIONS,
      useValue: {
        pageSizeOptions: [5, 10, 20, 50, 100]
      }
    }],
  imports: [
    NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, AsyncPipe,
    ControlErrorMessagePipe,
    NgTemplateOutlet,
    RuDateMediumPipe, TranslatePipe,
    RouterLink,
    DragDropModule,
    ClipboardModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  exports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    DragDropModule,
    ClipboardModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    OneTableExpandedRowContentProjectDirective,
    OneTableComponent,
  ]
})
export class OneTableModule { }
