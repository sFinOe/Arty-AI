import { MigrationInterface, QueryRunner } from "typeorm";

export class Createupdates1684533485837 implements MigrationInterface {
    name = 'Createupdates1684533485837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipping" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipping" ADD "phone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "itemReferenceId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "productUid" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "quantity" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "productUid"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "itemReferenceId"`);
        await queryRunner.query(`ALTER TABLE "shipping" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "shipping" DROP COLUMN "email"`);
    }

}
