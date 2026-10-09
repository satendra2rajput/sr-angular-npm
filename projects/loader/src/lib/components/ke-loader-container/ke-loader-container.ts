import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'ke-loader-container',
  imports: [],
  templateUrl: './ke-loader-container.html',
  styleUrl: './ke-loader-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeLoaderContainer {
  private readonly loaderService = inject(LoaderService);

  readonly visible = this.loaderService.visible;
  readonly options = this.loaderService.options;
}
