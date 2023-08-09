import { Module } from "@nestjs/common";
import { ImageStylerService } from './image-styler.service';

@Module({
    providers: [ImageStylerService]
})
export class ImageStylerModule { }
