import { NgModule } from '@angular/core';

import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PipesModule } from '../pipes/pipes.module';


@NgModule({
    declarations: [

        BreadcrumsComponent,
        HeaderComponent,
        NopagefoundComponent,
        SidebarComponent

    ],
    exports: [
        BreadcrumsComponent,
        HeaderComponent,
        NopagefoundComponent,
        SidebarComponent
    ],
    imports: [ RouterModule, CommonModule, PipesModule]
})
export class SharedModule {}