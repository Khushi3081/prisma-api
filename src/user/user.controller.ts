import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Render,
  Patch,
  Redirect,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import UpdateUserDto from './dto/update-user.dto';
import adminUserDataDto from './dto/admin-user.dto';
@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  @Render('admin-user')
  async root() {}

  @Get('search')
  async search(@Query('name') name: string) {
    return await this.UserService.search(name);
  }
  @Post()
  @Redirect('/user/user-list/:id')
  async addUser(@Body() postData: adminUserDataDto) {
    let data = await this.UserService.createUser(postData);
    return data;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const users = await this.UserService.findOne(+id);
    return { users };
  }

  @Get('user-list/:id')
  @Render('user-list')
  async list(@Param('id') id: number) {
    let data = await this.UserService.showlist(+id);
    return { data: data };
  }
  @Get('show/:id')
  @Render('update-user')
  async findOnes(@Param('id') id: number) {
    const role = await this.UserService.findRole();
    const data = await this.UserService.userfindOne(+id);
    return { data, role };
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() postData: UpdateUserDto) {
    return this.UserService.update(+id, postData);
  }

  @Patch('/delete/:id')
  remove(@Param('id') id: number) {
    return this.UserService.remove(+id);
  }
}
