import { S3Service } from './s3.service';
import { Controller, Delete, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { DOCUMENTATION, END_POINTS } from '../../utils/constants';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseObject } from '../../utils/objects';
import { PresignedUrlDto } from './dto/presigned-url.dto';

@ApiBearerAuth()
@ApiTags(DOCUMENTATION.TAGS.FILE)
@Controller(END_POINTS.FILE.BASE)
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Get(END_POINTS.FILE.UPLOAD)
  @ApiOperation({
    summary: 'Get a pre-signed URL to upload a file',
  })
  async getPreSignedUrl(@Query() presignedUrlDto: PresignedUrlDto) {
    const res = await this.s3Service.generatePreSignedUrl(presignedUrlDto);
    return ResponseObject.create('Pre-signed URL generated', res);
  }

  @Get(END_POINTS.FILE.DOWNLOAD)
  async downloadFile(
    @Param('key') key: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const file = await this.s3Service.downloadFile(key);
    res.setHeader('Content-Disposition', `attachment; filename=${file.key}`);
    res.setHeader('Content-Type', file.contentType);
    return res.send(file.buffer);
  }

  @Delete(END_POINTS.FILE.DELETE)
  async deleteFile(@Param('key') key: string) {
    return this.s3Service.deleteFile(key);
  }
}
