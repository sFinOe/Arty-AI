import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrder1684770807852 implements MigrationInterface {
    name = 'UpdateOrder1684770807852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "shipmentMethodName" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "shipmentMethodName"`);
    }

}
