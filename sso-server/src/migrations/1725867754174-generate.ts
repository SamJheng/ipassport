import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1725867754174 implements MigrationInterface {
    name = 'Generate1725867754174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "gender" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "photo" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "photo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "gender" SET NOT NULL`);
    }

}
