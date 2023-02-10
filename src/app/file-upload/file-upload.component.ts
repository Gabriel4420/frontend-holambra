import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { ApiService } from '../api.service'
import { FormControl, FormGroup } from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  public getAllData: any

  private setAllData: any

  shortLink: string = ''
  loading: boolean = false
  file = null

  @Input() prospect = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
  })

  constructor(private api: ApiService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.api.readProspects().subscribe((data) => {
      this.setAllData = data
      this.getAllData = this.setAllData
    })
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url)
  }

  onChange(event: any) {
    this.file = event.target.files[0]
  }

  onSubmit() {
    this.loading = !this.loading
    this.api
      .RegisterProspect(this.file, this.prospect.controls)
      .subscribe((event: any) => {
        if (typeof event === 'object') {
          this.shortLink = event.link

          this.loading = false
        }
      })
  }

  deleteProspect(id: string) {
    this.api.deleteProspects(id).subscribe((data) => console.log(data))
  }
}
