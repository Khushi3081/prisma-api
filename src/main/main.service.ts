import { Injectable } from '@nestjs/common';
import { CreateMainDto } from './dto/create-main.dto';
import { UpdateMainDto } from './dto/update-main.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MainService {
  constructor(private prisma: PrismaService) {}
  create(createMainDto: CreateMainDto) {
    return 'This action adds a new main';
  }

    async findAll() {
      let data = await this.prisma.product.findMany();
      return { data };
    }

}
