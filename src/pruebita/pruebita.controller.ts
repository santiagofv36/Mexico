import { Controller, Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';

@Controller('pruebita')
export class PruebitaController {

    @Get()
    @UseGuards()
    getHello(): string {
        return 'Hello World!';
    }

}
