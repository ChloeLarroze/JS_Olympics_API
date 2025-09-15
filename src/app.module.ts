import { Module } from '@nestjs/common';
import { EventsModule } from './Events/events.module';

@Module({
  imports: [EventsModule],
})
export class AppModule {}
