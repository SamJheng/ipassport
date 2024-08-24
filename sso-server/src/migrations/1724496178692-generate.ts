import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1724496178692 implements MigrationInterface {
    name = 'Generate1724496178692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_a24972ebd73b106250713dcddd9"`);
        await queryRunner.query(`ALTER TABLE "profile" RENAME COLUMN "userId" TO "birthday"`);
        await queryRunner.query(`ALTER TABLE "profile" RENAME CONSTRAINT "UQ_a24972ebd73b106250713dcddd9" TO "UQ_a7ea1306bc7e94c827b6584e674"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "UQ_a7ea1306bc7e94c827b6584e674"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "birthday" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "birthday" uuid`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "UQ_a7ea1306bc7e94c827b6584e674" UNIQUE ("birthday")`);
        await queryRunner.query(`ALTER TABLE "profile" RENAME CONSTRAINT "UQ_a7ea1306bc7e94c827b6584e674" TO "UQ_a24972ebd73b106250713dcddd9"`);
        await queryRunner.query(`ALTER TABLE "profile" RENAME COLUMN "birthday" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_a24972ebd73b106250713dcddd9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
