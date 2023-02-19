import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FileUploadComponent } from './file-upload/file-upload.component'
import { AddressComponent } from './address/address.component'

const routes: Routes = [
  {
    path: 'prospect',
    component: FileUploadComponent,
  },
  {
    path: 'address',
    component: AddressComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
