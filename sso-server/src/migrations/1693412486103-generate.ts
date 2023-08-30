import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1693412486103 implements MigrationInterface {
    name = 'Generate1693412486103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "social_external_providers" DROP CONSTRAINT "FK_621f334bacb736f2151442b6331"`);
        await queryRunner.query(`ALTER TABLE "social_external_providers" ADD CONSTRAINT "FK_621f334bacb736f2151442b6331" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "social_external_providers" DROP CONSTRAINT "FK_621f334bacb736f2151442b6331"`);
        await queryRunner.query(`ALTER TABLE "social_external_providers" ADD CONSTRAINT "FK_621f334bacb736f2151442b6331" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
