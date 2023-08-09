import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1683733750436 implements MigrationInterface {
    name = 'CreateUser1683733750436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "paymentMethod" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "paymentMethod"`);
    }

}
