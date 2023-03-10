import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser'
import { ApiService } from '../api.service'

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  public getAllData: any

  private setAllData: any

  public getAllDataProspects: any

  private setAllDataProspects: any

  public getAllDataCountries: any

  private setAllDataCountries: any

  private mapAllDataCountries: any

  loading: boolean = false
  file = null

  @Input() address = new FormGroup({
    name: new FormControl(''),
    countries: new FormControl(''),
  })

  constructor(private api: ApiService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.api.readAdreeses().subscribe((data) => {
      this.setAllData = data
      this.getAllData = this.setAllData
    })

    this.api.readProspects().subscribe((data) => {
      this.setAllDataProspects = data
      this.getAllDataProspects = this.setAllDataProspects
    })

    this.api.getCountries().subscribe((data) => {

      this.setAllDataCountries = data.filter((item: any, index: any, arr:any) => arr.indexOf(item) === index)
      .map((item: any) => item.nome.abreviado).filter((item: any, index: any, arr:any) => arr.indexOf(item) === index)
      this.getAllDataCountries = this.setAllDataCountries

    })
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url)
  }

  onChange(event: any) {
    this.file = event.target.files[0]
  }

  /*  onSubmit() {
    this.loading = !this.loading
    this.api
      .RegisterAddresses(this.address.controls)
      .subscribe((event: any) => {
        if (typeof event === 'object') {
          this.loading = false
        }
      })
    setTimeout(() => {
      window.location.reload()
    }, 3000)
  } */

  onSubmit() {
    console.log(this.getAllDataCountries)
  }

  deleteAddress(id: string) {
    this.api.deleteAddresses(id).subscribe((data) => console.log(data))
    window.location.reload()
  }
}
