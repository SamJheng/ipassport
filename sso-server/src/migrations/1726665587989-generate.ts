import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1726665587989 implements MigrationInterface {
    name = 'Generate1726665587989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "UQ_c3032565d23946a124aed0f3534"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "UQ_c3032565d23946a124aed0f3534" UNIQUE ("age")`);
    }

}
