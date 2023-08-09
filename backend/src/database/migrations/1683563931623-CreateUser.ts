import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1683563931623 implements MigrationInterface {
    name = 'CreateUser1683563931623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipping" ADD "country" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "billing" ADD "country" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "billing" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "shipping" DROP COLUMN "country"`);
    }

}
