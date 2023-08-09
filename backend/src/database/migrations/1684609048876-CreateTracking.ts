import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTracking1684609048876 implements MigrationInterface {
    name = 'CreateTracking1684609048876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "gelatoOrderId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "gelatoOrderId"`);
    }

}
