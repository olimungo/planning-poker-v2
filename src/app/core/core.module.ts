import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdDialogModule } from '@angular/material';
import {
  CoreHeaderComponent, CoreSubHeaderComponent, CorePigComponent, CorePigsListComponent,
  CoreHeaderModalComponent, CorePigsListModalComponent
} from '.';
import { CoreService } from './core.service';
import { WorkflowOverviewComponent } from './components/workflow-overview/workflow-overview.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdDialogModule
  ],
  exports: [
    CoreHeaderComponent,
    CoreSubHeaderComponent,
    CorePigComponent,
    CorePigsListComponent
  ],
  declarations: [
    CoreHeaderComponent,
    CoreSubHeaderComponent,
    CorePigComponent,
    CorePigsListComponent,
    CoreHeaderModalComponent,
    CorePigsListModalComponent,
    WorkflowOverviewComponent
  ],
  entryComponents: [
    CoreHeaderModalComponent,
    CorePigsListModalComponent
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [ CoreService ]
    };
  }
}
