import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTracking1684587116917 implements MigrationInterface {
    name = 'CreateTracking1684587116917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "trackingCode" character varying`);
        await queryRunner.query(`ALTER TABLE "order" ADD "trackingUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "trackingUrl"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "trackingCode"`);
    }

}
