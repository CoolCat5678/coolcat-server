import { NotFoundException } from '@nestjs/common';

export abstract class BaseCrudService<T> {
    // 讀取單個資料
    async read(id: string): Promise<T> {
        const item = await this.findById(id);
        if (!item) {
            throw new NotFoundException(`${this.getEntityName()} with id ${id} not found`);
        }
        return item;
    }

    // 讀取所有資料
    async list(): Promise<T[]> {
        return await this.findAll();
    }

    // 創建資料
    async create(createDto: any): Promise<T> {
        return await this.createItem(createDto);
    }

    // 更新資料
    async update(id: string, updateDto: any): Promise<T> {
        const item = await this.findById(id);
        if (!item) {
            throw new NotFoundException(`${this.getEntityName()} with id ${id} not found`);
        }
        return await this.updateItem(id, updateDto);
    }

    // 刪除資料
    async remove(id: string): Promise<T> {
        const item = await this.findById(id);
        if (!item) {
            throw new NotFoundException(`${this.getEntityName()} with id ${id} not found`);
        }
        return await this.removeItem(id);
    }

    abstract getEntityName(): string;
    abstract findById(id: string): Promise<T | null>;
    abstract findAll(): Promise<T[]>;
    abstract createItem(createDto: any): Promise<T>;
    abstract updateItem(id: string, updateDto: any): Promise<T>;
    abstract removeItem(id: string): Promise<T>;
}
