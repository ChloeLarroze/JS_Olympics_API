import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import type { Athlete } from "./Athlete";
import {AthleteService} from "./athlete.service";

@Controller('/Athlete')
export class AthleteController {
    constructor(private readonly athleteService: AthleteService) {}

    /*

   @Post()
   createAthlete(@Body() athlete: Athlete): {
       this.athleteService.addAthlete(athlete);
       return this.athleteService.addAthlete(athlete.code);
   }

   @Get()
   getBooks(@Query('name') name: string): Athlete[] {
       if (author) {
           return this.bookService.getBooksOf(author);
       }
       return this.bookService.getAllBooks();
   }

   @Get(':isbn')
   getBook(@Param('isbn') isbn: string): Book {
       return this.bookService.getBook(isbn);
   }

   @Delete(':isbn')
   deleteBook(@Param('isbn') isbn: string): void {
       this.bookService.remove(isbn);
   }

   @Post('search')
   @HttpCode(200)
   searchBooks(@Body() { term }: { term: string }): Book[] {
       return this.bookService.search(term);
   }
   */
}
