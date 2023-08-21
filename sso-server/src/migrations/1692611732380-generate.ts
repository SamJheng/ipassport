import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1692611732380 implements MigrationInterface {
    name = 'Generate1692611732380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "object_access" ADD CONSTRAINT "UQ_ec5c3647891ce61df5456319b3b" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "object_access" DROP CONSTRAINT "UQ_ec5c3647891ce61df5456319b3b"`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "UQ_ae4578dcaed5adff96595e61660"`);
    }

}
