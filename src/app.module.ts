import { Module } from '@nestjs/common';
import { EventsModule } from './Events/events.module';
import { MedaillesModule } from './Medailles/medailles.module';
import { AthleteModule } from './Athlete/athlete.module';


@Module({
  imports: [EventsModule, MedaillesModule, AthleteModule],
})
export class AppModule {}
