import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityEntity } from './entities/city.entity';

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,
    ){}

    async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]>{
        const cities = await this.cityRepository.find({
            where: {
                stateId,
            },
        });

        return cities;
    }

}
