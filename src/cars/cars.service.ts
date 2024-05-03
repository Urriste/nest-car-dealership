import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid'
import { CreateCarDto, UpdateCarDto } from './dto/index';
@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla',
        },
        {
            id: uuid(),
            brand: 'Fiat',
            model: '147',
        },

        {
            id: uuid(),
            brand: 'Honda',
            model: 'HRV',
        }
    ];


    public findAll() {
        return this.cars;
    }

    public findOneById(id: string) {
        const car = this.cars.find((car) => car.id == id);

        if (!car) throw new NotFoundException(`El auto con el ID '${id}' no existe`);

        return car;
    }

    create(createCarDto: CreateCarDto) {

        let newCar: Car = {
            id: uuid(),
            ...createCarDto
        }

        this.cars.push(newCar);

        return newCar;

    }

    update(id: string, updateCarDto: UpdateCarDto) {

        let carDB = this.findOneById(id);

        this.cars = this.cars.map(car => {
            if (car.id === id) {
                carDB = { ...carDB, ...updateCarDto, id }
                return carDB;
            }
            return car;
        })

        return carDB;
    }

    delete(id: string) {

        let carDB = this.findOneById(id);

        this.cars = this.cars.filter((car) => {
            return car.id !== carDB.id;
        })
    }

}
