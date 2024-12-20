import { HttpException, Injectable } from '@nestjs/common';
import { CreateGrammarDto } from './dto/create-grammar.dto';
import { UpdateGrammarDto } from './dto/update-grammar.dto';
import { DataSource } from 'typeorm';
import { Grammar } from './entities/grammar.entity';

@Injectable()
export class GrammarService {
  constructor(private readonly dataSource: DataSource) {}
  async create(createGrammarDto: CreateGrammarDto) {
    try {
      const grammar = this.dataSource
        .getRepository(Grammar)
        .insert(createGrammarDto);
      return grammar;
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, 500);
    }
  }

  findAll() {
    try {
      const grammars = this.dataSource.getRepository(Grammar).find();
      return grammars;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: string) {
    try {
      const grammar = this.dataSource
        .getRepository(Grammar)
        .findOne({ where: { id } });
      return grammar;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 500);
    }
  }

  async update(updateGrammarDto: UpdateGrammarDto) {
    try {
      const updatedGrammar = await this.dataSource
        .getRepository(Grammar)
        .save(updateGrammarDto);
      return updatedGrammar;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 500);
    }
  }

  remove(id: string) {
    return `This action removes a #${id} grammar`;
  }
}
