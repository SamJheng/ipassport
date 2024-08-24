import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1724504646910 implements MigrationInterface {
    name = 'Generate1724504646910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "social_external_providers" ALTER COLUMN "locale" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "social_external_providers" ALTER COLUMN "locale" SET NOT NULL`);
    }

}
