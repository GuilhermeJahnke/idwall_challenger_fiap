import { Test, TestingModule } from '@nestjs/testing';
import { CriminalsService } from './criminals.service';

describe('CriminalsService', () => {
  let service: CriminalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CriminalsService],
    }).compile();

    service = module.get<CriminalsService>(CriminalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
