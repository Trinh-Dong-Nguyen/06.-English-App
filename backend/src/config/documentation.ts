import { DocumentBuilder } from '@nestjs/swagger';
import { DOCUMENTATION } from '../utils/constants';

const { TITLE, DESCRIPTION, VERSION, PREFIX } = DOCUMENTATION;
const documentation = new DocumentBuilder()
  .setTitle(TITLE)
  .setDescription(DESCRIPTION)
  .setVersion(VERSION)
  .addServer(PREFIX)
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'Authorization',
  })
  .build();

export default documentation;
