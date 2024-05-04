// src/controllers/genericController.ts

import { Request, Response } from "express";
import { Repository, DeepPartial, BaseEntity, FindOneOptions } from "typeorm";
import { AppDataSource } from "../database";

export abstract class GenericController<T extends BaseEntity> {
  protected repository: Repository<T>;

  constructor(entityType: new () => T) {
    this.repository = AppDataSource.getRepository(entityType);
  }

  async getAll(req: Request, res: Response) {
    try {
      // Accept a query parameter to specify relations, e.g., ?relations=category,owner
      const relations = req.query.relations
        ? (req.query.relations as string).split(",")
        : [];

      const entities = await this.repository.find({
        relations: relations,
      });
      res.json(entities);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error retrieving entities" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const options: FindOneOptions = { where: { id } };
      const entity = await this.repository.findOne(options);
      if (!entity) {
        return res.status(404).json({ error: "Entity not found" });
      }
      res.json(entity);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error retrieving entity" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const newEntity = this.repository.create(req.body as DeepPartial<T>);
      await this.repository.save(newEntity);
      res.status(201).json(newEntity);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating entity" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const options: FindOneOptions = { where: { id } };
      const entityToUpdate = await this.repository.findOne(options);
      if (!entityToUpdate) {
        return res.status(404).json({ error: "Entity not found" });
      }
      this.repository.merge(entityToUpdate, req.body);
      const updatedEntity = await this.repository.save(entityToUpdate);
      res.json(updatedEntity);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating entity" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const options: FindOneOptions = { where: { id } };
      const entityToDelete = await this.repository.findOne(options);
      if (!entityToDelete) {
        return res.status(404).json({ error: "Entity not found" });
      }
      await this.repository.remove(entityToDelete);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting entity" });
    }
  }
}
