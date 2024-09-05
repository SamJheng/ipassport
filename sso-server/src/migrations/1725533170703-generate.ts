import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1725533170703 implements MigrationInterface {
    name = 'Generate1725533170703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_e1cd83e9776ae7428a1f3712b2c" UNIQUE ("name"), CONSTRAINT "PK_34485d72b65089b149171964889" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "roleTypeId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isDelete" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_3629fc7e58c4599e99af93ccc36" FOREIGN KEY ("roleTypeId") REFERENCES "role_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_3629fc7e58c4599e99af93ccc36"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isDelete"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "roleTypeId"`);
        await queryRunner.query(`DROP TABLE "role_type"`);
    }

}
