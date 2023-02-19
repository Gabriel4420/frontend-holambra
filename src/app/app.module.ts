import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { FileUploadComponent } from './file-upload/file-upload.component'
import { ReactiveFormsModule } from '@angular/forms';
import { AddressComponent } from './address/address.component';
import { HeaderComponent } from './header/header.component'

@NgModule({
  declarations: [AppComponent, FileUploadComponent, AddressComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
