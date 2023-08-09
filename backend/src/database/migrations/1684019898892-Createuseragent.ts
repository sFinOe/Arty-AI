import { MigrationInterface, QueryRunner } from "typeorm";

export class Createuseragent1684019898892 implements MigrationInterface {
    name = 'Createuseragent1684019898892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_agent" ("id" SERIAL NOT NULL, "ipAddress" character varying, "useragent" character varying, "device" character varying, CONSTRAINT "PK_7851758f9943f896d2c1d3194e3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_agent"`);
    }

}
