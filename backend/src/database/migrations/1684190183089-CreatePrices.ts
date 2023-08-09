import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePrices1684190183089 implements MigrationInterface {
    name = 'CreatePrices1684190183089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "price" ("id" SERIAL NOT NULL, "product_13x18" integer DEFAULT '20', "product_15x20" integer DEFAULT '20', "product_20x25" integer DEFAULT '20', "product_21x29" integer DEFAULT '20', "product_25x25" integer DEFAULT '20', "product_27x35" integer DEFAULT '20', "product_30x30" integer DEFAULT '20', "product_40x50" integer DEFAULT '20', "product_60x90" integer DEFAULT '20', "product_29x42" integer DEFAULT '20', "product_42x59" integer DEFAULT '20', "product_59x84" integer DEFAULT '20', "expressShipping" integer DEFAULT '15', CONSTRAINT "PK_d163e55e8cce6908b2e0f27cea4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "price"`);
    }

}
