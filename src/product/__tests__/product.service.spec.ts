import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductService } from '../product.service';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/produc.entity';
import { productMock } from '../__mocks__/prodcut.mock';


describe('ProductService', () => {
  let service: ProductService;
  let productRepository: Repository<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([productMock]),
            save: jest.fn().mockResolvedValue(productMock),
          }
        }
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  it('should return all products', async () => {
    const products = await service.getAllProducts();

    expect(products).toEqual([productMock]);
  });

  it('should return error if products empyt', async () => {
    jest.spyOn(productRepository, 'find').mockResolvedValue([]);

    expect(service.getAllProducts()).rejects.toThrow();
  });

  it('should return error in exception', async () => {
    jest.spyOn(productRepository, 'find').mockRejectedValue(new Error());

    expect(service.getAllProducts()).rejects.toThrow();
  });
});