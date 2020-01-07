/*import {Component, ElementRef, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../service/user.service';
import {forkJoin} from 'rxjs';

export interface IMedia {
  id?: number;
  original_file_name?: string;
  content_type?: string;
  size?: number;
}

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MediaComponent),
      multi: true
    }
  ]
})
export class MediaComponent implements OnInit, ControlValueAccessor {
  @Input()
  accept = '';
  resourceUrl = '/api/media';
  initializing = true;
  medias: IMedia[];
  uploader: FileUploader;
  onChange = (medias: number[]) => {
    // empty default
  }

  constructor(private userService: UserService, private http: HttpClient, elm: ElementRef) {
  }

  ngOnInit() {
    /*this.uploader = new FileUploader({
      url: this.resourceUrl,
      authToken: 'Bearer ' + localStorage.getItem(this.userService.accessTokenLocalStorageKey),
      autoUpload: true,
    });*/ /*
    this.uploader.onBeforeUploadItem = (item: FileItem) => {
      if (!this.medias) {
        this.medias = [];
      }
      this.medias.push({
        content_type: item.file.type,
        original_file_name: item.file.name,
        size: item.file.size
      });
    };
    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      const uploadedMedia = JSON.parse(response) as IMedia;
      this.medias.find(media => !media.id && media.original_file_name === uploadedMedia.original_file_name).id = uploadedMedia.id;
    };
    this.uploader.onCompleteAll = () => {
      this.onChange(this.medias.map((m) => {
        return m.id;
      }));
    };
  }

  deleteMedia(index: number): void {
    this.medias.splice(index, 1);
    this.onChange(this.medias.map((m) => {
      return m.id;
    }));
  }

  downloadMedia(media: IMedia): void {
    this.http.get(`${this.resourceUrl}/${media.id}`, {responseType: 'blob'}).subscribe((blob: Blob) => {
      const fileURL = URL.createObjectURL(blob);
      const a = document.createElement('a') as HTMLAnchorElement;
      a.href = fileURL;
      a.download = media.original_file_name;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
      }, 100);
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // not implemented
  }

  setDisabledState(isDisabled: boolean): void {
    // not implemented
  }

  writeValue(mediaIds: any): void {
    if (!mediaIds || !mediaIds.length) {
      this.initializing = false;
    }
    forkJoin(mediaIds.map((id) => {
      return this.http.get(`${this.resourceUrl}/${id}/get`);
    })).subscribe((medias) => {
      this.medias = medias;
      this.initializing = false;
    });
  }
}*/
