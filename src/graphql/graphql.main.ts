import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppModule } from '../app.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { NestFactory } from '@nestjs/core';

