import { Test, TestingModule } from '@nestjs/testing';
import { CriminalsController } from './criminals.controller';
import { CriminalsService } from './criminals.service';

describe('CriminalsController', () => {
  let controller: CriminalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CriminalsController],
      providers: [CriminalsService],
    }).compile();

    controller = module.get<CriminalsController>(CriminalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
