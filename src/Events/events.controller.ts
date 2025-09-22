import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './Events';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async EventfindAll(@Query('country') country?: string): Promise<Event[]> {
    return this.eventsService.EventfindAll(country);
  }

  //postman request eg : http://localhost:3000/events/Women's Individual-archery
  @Get(':id')
  async EventfindOne(@Param('id') id: string): Promise<Event> {
    return this.eventsService.EventfindOne(id);
  }

  @Post()
  async createEvent(@Body() event: Event): Promise<Event> {
    return this.eventsService.createEvent(event);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: string): Promise<void> {
    return this.eventsService.deleteEvent(id);
  }

  //put a certain event as a favorite
  // postman eg : http://localhost:3000/events/favorite/Women's Individual-archery
  @Post('favorite/:id')
  async favoriteEvent(@Param('id') id: string): Promise<Event> {
    return this.eventsService.favoriteEvent(id);
  }

  //debug
  @Get('debug/list-ids')
  async listAllIds(): Promise<string[]> {
    return this.eventsService.getAllIds(); //we'll need to add this method to the service
}
}
