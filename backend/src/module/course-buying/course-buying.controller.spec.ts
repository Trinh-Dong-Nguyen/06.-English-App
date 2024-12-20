import { Test, TestingModule } from '@nestjs/testing';
import { CourseBuyingController } from './course-buying.controller';
import { CourseBuyingService } from './course-buying.service';

describe('CourseBuyingController', () => {
  let controller: CourseBuyingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseBuyingController],
      providers: [CourseBuyingService],
    }).compile();

    controller = module.get<CourseBuyingController>(CourseBuyingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
