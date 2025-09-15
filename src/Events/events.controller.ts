// src/Events/events.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query} from '@nestjs/common';

//TODO : DTO import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';
import { Event } from './Event';

@Controller('events') //endpoint for events
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async EventfindAll(@Query('country') country: string): Promise<Event[]> {
    return this.eventsService.EventfindAll(country);
  }

  @Get(':id')
  async EventfindOne(@Param('id') id: string): Promise<Event> {
    return this.eventsService.EventfindOne(id);
  }
}
