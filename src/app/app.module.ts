import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { AboutComponent } from './about/about.component';
import { DashComponent } from './dash/dash.component';
import { DescComponent } from './desc/desc.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoveDirective } from './move.directive';
import { EllipsisDirective } from './ellipsis.directive';
import { CoreModule } from './core/core.module';
import { CoreComponent } from './coreLog/core/core.component';
import { SocketIoModule, SocketIoConfig} from 'ng-socket-io';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PricePipe } from './pipes/price.pipe';  // socketio module

const config: SocketIoConfig = { url: 'wss://streamer.cryptocompare.com', options: {} };

const appRoutes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'core', loadChildren: './core/core.module#CoreModule' },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dash', component: DashComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ErrorComponent,
    AboutComponent,
    DashComponent,
    DescComponent,
    MoveDirective,
    EllipsisDirective,
    CoreComponent,
    PricePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {
      enableTracing: true
    }),
    SocketIoModule.forRoot(config),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
