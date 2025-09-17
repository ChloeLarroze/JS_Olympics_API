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
}
