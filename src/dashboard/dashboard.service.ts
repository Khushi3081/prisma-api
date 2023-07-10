import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  create(createDashboardDto: CreateDashboardDto) {
    return 'This action adds a new dashboard';
  }

  async search(pName: string) {

    let result = await this.prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: pName,
            },
          },
          {
            price: {
              contains: pName,
            },
          },
        ],
      },
    });

    return result;
  }
  async findAll() {
    let data = await this.prisma.product.findMany();
    return { data };
  }
}
