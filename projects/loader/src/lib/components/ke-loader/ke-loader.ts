import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KeLoaderContainer } from '../ke-loader-container/ke-loader-container';

@Component({
  selector: 'ke-loader',
  imports: [KeLoaderContainer],
  templateUrl: './ke-loader.html',
  styleUrl: './ke-loader.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeLoader {}
