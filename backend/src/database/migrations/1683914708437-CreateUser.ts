import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1683914708437 implements MigrationInterface {
    name = 'CreateUser1683914708437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "confirmationNumber" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "confirmationNumber"`);
    }

}
